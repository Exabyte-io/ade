/* eslint-disable no-unused-expressions */
import { expect } from "chai";

import { Executable } from "../../src/js";

describe("Executable", () => {
    it("defaults runtime item lists when omitted", () => {
        const executable = new Executable({
            name: "espresso",
            applicationName: "espresso",
        });
        expect(executable.monitors).to.deep.equal([]);
        expect(executable.results).to.deep.equal([]);
        expect(executable.postProcessors).to.deep.equal([]);
        expect(executable.preProcessors).to.deep.equal([]);
    });

    it("preserves explicit runtime item lists when provided", () => {
        const monitors = [{ name: "m1" }];
        const results = [{ name: "r1" }];
        const postProcessors = [{ name: "p1" }];
        const preProcessors = [{ name: "pre1" }];
        const executable = new Executable({
            name: "espresso",
            applicationName: "espresso",
            monitors,
            results,
            postProcessors,
            preProcessors,
        });
        expect(executable.monitors).to.equal(monitors);
        expect(executable.results).to.equal(results);
        expect(executable.postProcessors).to.equal(postProcessors);
        expect(executable.preProcessors).to.equal(preProcessors);
    });

    it("toJSON works as expected", () => {
        const executable = new Executable({
            name: "espresso",
            applicationName: "espresso",
        });
        const json = executable.toJSON();
        expect(json).to.have.property("name", "espresso");
        expect(json).to.have.property("isDefault");
        expect(json).to.have.property("schemaVersion");
    });

    describe("static jsonSchema", () => {
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
