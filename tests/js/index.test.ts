/* eslint-disable no-unused-expressions */
import { expect } from "chai";

import { Application, Executable, Flavor, Template } from "../../src/js";

describe("package exports (index)", () => {
    it("exports entity classes", () => {
        expect(Application).to.be.a("function");
        expect(Executable).to.be.a("function");
        expect(Flavor).to.be.a("function");
        expect(Template).to.be.a("function");
    });
});
