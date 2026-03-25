/* eslint-disable no-unused-expressions */
import { ApplicationStandata } from "@mat3ra/standata";
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

    it("results are correct", () => {
        const standata = new ApplicationStandata();
        const { flavor } = standata.getExecutableAndFlavorByName("espresso", "pw.x", "pw_scf");

        expect(flavor.results).to.deep.equal([
            {
                name: "atomic_forces",
            },
            {
                name: "fermi_energy",
            },
            {
                name: "pressure",
            },
            {
                name: "stress_tensor",
            },
            {
                name: "total_energy",
            },
            {
                name: "total_energy_contributions",
            },
            {
                name: "total_force",
            },
        ]);
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
