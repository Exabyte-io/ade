/* eslint-disable no-unused-expressions */
import { expect } from "chai";

import { Application } from "../../src/js";

describe("Application", () => {
    it("constructs with default data when no argument is passed", () => {
        const app = new Application();
        expect(app).to.be.instanceOf(Application);
    });

    describe("instance properties", () => {
        describe("isUsingMaterial", () => {
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

    describe("static accessors", () => {
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
