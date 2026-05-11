/* eslint-disable no-unused-expressions */
import { expect } from "chai";

import { Application } from "../../src/js";

describe("Application", () => {
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
});
