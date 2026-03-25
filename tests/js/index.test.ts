/* eslint-disable no-unused-expressions */
import { expect } from "chai";

import {
    Application,
    applicationMixin,
    Executable,
    executableMixin,
    Flavor,
    flavorMixin,
    Template,
    templateMixin,
} from "../../src/js";

describe("package exports (index)", () => {
    it("exports entity classes and mixins", () => {
        expect(Application).to.be.a("function");
        expect(Executable).to.be.a("function");
        expect(Flavor).to.be.a("function");
        expect(Template).to.be.a("function");
        expect(applicationMixin).to.be.a("function");
        expect(executableMixin).to.be.a("function");
        expect(flavorMixin).to.be.a("function");
        expect(templateMixin).to.be.a("function");
    });
});
