/* eslint-disable no-unused-expressions */
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

    it("constructs with default data when no argument is passed", () => {
        const app = new Application();
        expect(app).to.be.instanceOf(Application);
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

            const appFromStandata = (name: string) =>
                new Application(registry.getApplications().find((a) => a.name === name));

            it("should return true for vasp application", () => {
                expect(appFromStandata("vasp").isUsingMaterial).to.be.true;
            });

            it("should return true for nwchem application", () => {
                expect(appFromStandata("nwchem").isUsingMaterial).to.be.true;
            });

            it("should return true for espresso application", () => {
                expect(appFromStandata("espresso").isUsingMaterial).to.be.true;
            });

            it("should return false for other applications", () => {
                const otherApp = new Application({ name: "other_app" });
                expect(otherApp.isUsingMaterial).to.be.false;
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
        const app = new Application(config);
        expect(app.calculateHash()).to.equal(fixture.hash);
    });
});
