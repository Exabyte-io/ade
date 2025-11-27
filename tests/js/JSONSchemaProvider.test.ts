import { Name as ContextProviderNameEnum } from "@mat3ra/esse/dist/js/types";
import { expect } from "chai";

import JSONSchemaDataProvider from "../../src/js/context/JSONSchemaDataProvider";
import JSONSchemaFormDataProvider from "../../src/js/context/JSONSchemaFormDataProvider";

describe("JSONSchemaDataProvider", () => {
    it("should set isUsingJinjaVariables", () => {
        const provider = new JSONSchemaDataProvider({
            name: ContextProviderNameEnum.KGridFormDataManager,
            isUsingJinjaVariables: true,
        });
        expect(provider.isUsingJinjaVariables).to.equal(true);
    });

    it("should throw error when accessing jsonSchema", () => {
        const provider = new JSONSchemaDataProvider({
            name: ContextProviderNameEnum.KGridFormDataManager,
        });
        expect(() => provider.jsonSchema).to.throw("Not implemented.");
    });
});

describe("JSONSchemaFormDataProvider", () => {
    it("can be created", () => {
        const provider = new JSONSchemaFormDataProvider({
            name: ContextProviderNameEnum.KGridFormDataManager,
        });
        expect(provider).to.exist;
    });

    it("should throw error when accessing uiSchema", () => {
        const provider = new JSONSchemaFormDataProvider({
            name: ContextProviderNameEnum.KGridFormDataManager,
        });
        expect(() => provider.uiSchema).to.throw("Not implemented.");
    });

    it("should return empty fields object", () => {
        const provider = new JSONSchemaFormDataProvider({
            name: ContextProviderNameEnum.KGridFormDataManager,
        });
        expect(provider.fields).to.deep.equal({});
    });

    it("should return empty defaultFieldStyles object", () => {
        const provider = new JSONSchemaFormDataProvider({
            name: ContextProviderNameEnum.KGridFormDataManager,
        });
        expect(provider.defaultFieldStyles).to.deep.equal({});
    });

    it("should return uiSchemaStyled", () => {
        class TestProvider extends JSONSchemaFormDataProvider {
            // eslint-disable-next-line class-methods-use-this
            get uiSchema() {
                return { field1: { classNames: "test" }, field2: {} };
            }
        }
        const provider = new TestProvider({
            name: ContextProviderNameEnum.KGridFormDataManager,
        });
        const styled = provider.uiSchemaStyled;
        expect(styled).to.have.property("field1");
        expect(styled.field1).to.have.property("classNames", "test");
    });
});
