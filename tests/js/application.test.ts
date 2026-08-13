/* eslint-disable no-unused-expressions */
import type { ApplicationSchema } from "@mat3ra/esse/dist/js/types";
import { ApplicationRegistry } from "@mat3ra/standata";
import StandataDriver from "@mat3ra/standata/dist/js/StandataDriver";
import { expect } from "chai";
import { readFileSync } from "fs";
import { resolve } from "path";

import { Application } from "../../src/js";

describe("Application", () => {
    before(() => {
        ApplicationRegistry.setDriver(new StandataDriver());
    });

    describe("static accessors", () => {
        it("should have jsonSchema property", () => {
            const schema = Application.jsonSchema;
            expect(schema).to.exist;
            expect(schema).to.have.property("$id");
        });
    });

    describe("applicationMixin properties", () => {
        describe("isUsingMaterial property", () => {
            let registry: ApplicationRegistry;

            before(() => {
                registry = new ApplicationRegistry();
            });

            const appFromStandata = (name: string) => {
                const app = registry.getApplications().find((a) => a.name === name);
                if (!app) {
                    throw new Error(`Application ${name} not found`);
                }
                return new Application(app);
            };

            it("should return true for vasp application", () => {
                expect(appFromStandata("vasp").isUsingMaterial).to.be.true;
            });

            it("should return true for nwchem application", () => {
                expect(appFromStandata("nwchem").isUsingMaterial).to.be.true;
            });

            it("should return true for espresso application", () => {
                expect(appFromStandata("espresso").isUsingMaterial).to.be.true;
            });

            it("should return undefined for other applications", () => {
                const otherApp = new Application({
                    name: "other_app",
                    shortName: "Other App",
                    summary: "Other App summary",
                    version: "1.0.0",
                    build: "1",
                });
                expect(otherApp.isUsingMaterial).to.be.undefined;
            });
        });
    });

    it("calculateHash matches fixture", () => {
        const fixture = JSON.parse(
            readFileSync(resolve(__dirname, "../fixtures/application_hash.json"), "utf-8"),
        );
        const { name, version, build } = fixture.standata;
        const standata = new ApplicationRegistry();
        const configs = standata.getApplications().filter((a) => a.name === name);
        const config = configs.find((a) => a.version === version && a.build === build);
        if (!config) {
            throw new Error(`Application ${name} ${version} ${build} not found`);
        }
        const app = new Application(config);
        expect(app.calculateHash()).to.equal(fixture.hash);
    });

    describe("generic schema wrapper", () => {
        type WiderApplicationSchema = ApplicationSchema & { webappOnly?: string };

        class WiderApplication extends Application<WiderApplicationSchema> {}

        it("allows subclasses to widen _json typing and storage", () => {
            const app = new WiderApplication({
                name: "wider_app",
                shortName: "Wider",
                summary: "Wider summary",
                version: "1.0.0",
                build: "1",
            });

            app._json.webappOnly = "webapp-value";
            expect(app._json.webappOnly).to.equal("webapp-value");

            // toJSON cleans against esse schema (strips unknown keys); _json retains them.
            // Web-app Core* override jsonSchema so widened fields survive toJSON.
            expect(app.toJSON().name).to.equal("wider_app");
            expect(app._json.webappOnly).to.equal("webapp-value");

            app._json.webappOnly = "updated";
            expect(app._json.webappOnly).to.equal("updated");
        });
    });
});
