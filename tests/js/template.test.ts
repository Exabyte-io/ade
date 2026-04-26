/* eslint-disable no-unused-expressions */
import { expect } from "chai";

import { Template } from "../../src/js";

describe("Template", () => {
    it("constructs with default data when no argument is passed", () => {
        const template = new Template();
        expect(template).to.be.instanceOf(Template);
        expect(template.applicationName).to.equal("");
        expect(template.contextProviders).to.deep.equal([]);
    });

    it("toJSON works as expected", () => {
        const template = new Template({ name: "test_template", content: "test content" });
        const json = template.toJSON();

        expect(json).to.have.property("name", "test_template");
        expect(json).to.have.property("schemaVersion");
        expect(json).to.have.property("content", "test content");
        expect(json.content).to.be.a("string");
        expect(json.schemaVersion).to.be.a("string");
    });

    describe("static jsonSchema", () => {
        it("should have jsonSchema property", () => {
            expect(Template.jsonSchema).to.exist;
        });

        it("should return correct schema structure", () => {
            const schema = Template.jsonSchema;
            expect(schema).to.have.property("$schema");
            expect(schema).to.have.property("$id");
            expect(schema?.$id).to.include("software/template");
        });
    });
});
