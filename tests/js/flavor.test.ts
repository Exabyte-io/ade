/* eslint-disable no-unused-expressions */
import { expect } from "chai";

import ApplicationRegistry from "../../src/js/ApplicationRegistry";
import Flavor from "../../src/js/Flavor";

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
