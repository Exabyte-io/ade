/* eslint-disable no-unused-expressions */
import { expect } from "chai";

import Application from "../../src/js/Application";

describe("Application", () => {
    const obj = { name: "espresso" };

    it("can be created", () => {
        const app = new Application(obj);
        expect(app.name).to.equal("espresso");
    });

    describe("applicationMixin properties", () => {
        let app: Application;

        beforeEach(() => {
            app = new Application(obj);
        });

        describe("hasAdvancedComputeOptions property", () => {
            it("should return true when set", () => {
                app.setProp("hasAdvancedComputeOptions", true);
                expect(app.hasAdvancedComputeOptions).to.be.true;
            });
        });

        describe("isLicensed property", () => {
            it("should return true when set", () => {
                app.setProp("isLicensed", true);
                expect(app.isLicensed).to.be.true;
            });
        });

        describe("isUsingMaterial property", () => {
            it("should return true for vasp application", () => {
                const vaspApp = new Application({ name: "vasp" });
                expect(vaspApp.isUsingMaterial).to.be.true;
            });

            it("should return true for nwchem application", () => {
                const nwchemApp = new Application({ name: "nwchem" });
                expect(nwchemApp.isUsingMaterial).to.be.true;
            });

            it("should return true for espresso application", () => {
                const espressoApp = new Application({ name: "espresso" });
                expect(espressoApp.isUsingMaterial).to.be.true;
            });

            it("should return false for other applications", () => {
                const otherApp = new Application({ name: "other_app" });
                expect(otherApp.isUsingMaterial).to.be.false;
            });
        });
    });

    describe("applicationStaticMixin properties", () => {
        it("should have defaultConfig with correct structure", () => {
            const config = Application.defaultConfig;
            expect(config).to.have.property("name", "espresso");
            expect(config).to.have.property("shortName", "qe");
            expect(config).to.have.property("version", "6.3");
            expect(config).to.have.property("summary", "Quantum ESPRESSO");
            expect(config).to.have.property("build", "GNU");
        });

        it("should return the complete defaultConfig object", () => {
            expect(Application.defaultConfig).to.deep.equal({
                name: "espresso",
                shortName: "qe",
                version: "6.3",
                summary: "Quantum ESPRESSO",
                build: "GNU",
            });
        });

        it("should have jsonSchema property", () => {
            const schema = Application.jsonSchema;
            expect(schema).to.exist;
            expect(schema).to.have.property("$id");
        });
    });
});
