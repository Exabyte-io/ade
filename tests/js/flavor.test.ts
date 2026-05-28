/* eslint-disable no-unused-expressions */
import { expect } from "chai";

import { Flavor } from "../../src/js";

describe("Flavor", () => {
    it("constructs with built-in defaults when no argument is passed", () => {
        const flavor = new Flavor();
        expect(flavor).to.be.instanceOf(Flavor);
        expect(flavor.monitors).to.deep.equal([]);
        expect(flavor.results).to.deep.equal([]);
        expect(flavor.executableName).to.equal("");
    });

    it("merges partial data over defaults", () => {
        const flavor = new Flavor({ name: "custom", executableName: "pw.x" });
        expect(flavor.name).to.equal("custom");
        expect(flavor.executableName).to.equal("pw.x");
    });

    describe("static jsonSchema", () => {
        it("should have jsonSchema property", () => {
            expect(Flavor.jsonSchema).to.exist;
        });

        it("should return correct schema structure", () => {
            const schema = Flavor.jsonSchema;
            expect(schema).to.have.property("$schema");
            expect(schema).to.have.property("$id");
            expect(schema?.$id).to.include("software/flavor");
        });
    });
});
