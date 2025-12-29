/* eslint-disable no-unused-expressions */
import { expect } from "chai";

import Executable from "../../src/js/Executable";

describe("Executable", () => {
    it("toJSON works as expected", () => {
        const executable = new Executable({ name: "espresso" });
        const json = executable.toJSON();
        expect(json).to.have.property("name", "espresso");
        expect(json).to.have.property("isDefault");
        expect(json).to.have.property("schemaVersion");
    });

    describe("executableStaticMixin", () => {
        it("should have jsonSchema property", () => {
            expect(Executable.jsonSchema).to.exist;
        });

        it("should return correct schema structure", () => {
            const schema = Executable.jsonSchema;
            expect(schema).to.have.property("$schema");
            expect(schema).to.have.property("$id");
            expect(schema?.$id).to.include("software/executable");
        });
    });
});
