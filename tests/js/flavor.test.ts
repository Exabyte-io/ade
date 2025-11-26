/* eslint-disable no-unused-expressions */
import { expect } from "chai";

import ApplicationRegistry from "../../src/js/ApplicationRegistry";
import Flavor from "../../src/js/flavor";

describe("Flavor", () => {
    it("results are correct", () => {
        const pwscfFlavor = ApplicationRegistry.getAllFlavorsForApplication("espresso").find(
            (flavor) => {
                return flavor.name === "pw_scf";
            },
        );
        expect(pwscfFlavor?.results).to.deep.equal([
            "atomic_forces",
            "fermi_energy",
            "pressure",
            "stress_tensor",
            "total_energy",
            "total_energy_contributions",
            "total_force",
        ]);
    });

    describe("flavorMixin properties", () => {
        let flavor: Flavor;
        beforeEach(() => {
            flavor = new Flavor({ name: "test_flavor" });
        });

        it("should have default input as empty array", () => {
            expect(flavor.input).to.deep.equal([]);
        });

        it("should return input when set", () => {
            const input = [{ name: "param1" }, { name: "param2" }];
            flavor.setProp("input", input);
            expect(flavor.input).to.deep.equal(input);
        });

        it("should have executableId as empty string by default", () => {
            expect(flavor.executableId).to.equal("");
        });

        it("should return executableId when set", () => {
            flavor.setProp("executableId", "exec123");
            expect(flavor.executableId).to.equal("exec123");
        });

        it("should have executableName as empty string by default", () => {
            expect(flavor.executableName).to.equal("");
        });

        it("should return executableName when set", () => {
            flavor.setProp("executableName", "pw");
            expect(flavor.executableName).to.equal("pw");
        });

        it("should have applicationName as empty string by default", () => {
            expect(flavor.applicationName).to.equal("");
        });

        it("should return applicationName when set", () => {
            flavor.setProp("applicationName", "espresso");
            expect(flavor.applicationName).to.equal("espresso");
        });

        it("should have supportedApplicationVersions as undefined by default", () => {
            expect(flavor.supportedApplicationVersions).to.be.undefined;
        });

        it("should return supportedApplicationVersions when set", () => {
            flavor.setProp("supportedApplicationVersions", ["6.3", "7.0"]);
            expect(flavor.supportedApplicationVersions).to.deep.equal(["6.3", "7.0"]);
        });

        // Added with LLM to help with coverage
        // it("should handle getInputAsRenderedTemplates with different template types", () => {
        //     const mockTemplate = { getRenderedJSON: () => ({ rendered: true }) };
        //     const simpleTemplate = { name: "simple" };
        //     flavor.setProp("input", [mockTemplate, simpleTemplate]);

        //     const result = flavor.getInputAsRenderedTemplates({});
        //     expect(result).to.have.length(2);
        //     expect(result[0]).to.deep.equal({ rendered: true });
        //     expect(result[1]).to.deep.equal({ name: "simple" });
        // });
    });

    describe("flavorStaticMixin", () => {
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
