import { Name as ContextProviderName } from "@mat3ra/esse/dist/js/types";
import { expect } from "chai";

import JSONSchemaFormDataProvider from "../../src/js/context/JSONSchemaFormDataProvider";

describe("JSONSchemaFormDataProvider", () => {
    const baseConfig = {
        name: ContextProviderName.KGridFormDataManager,
    };

    it("respects isUsingJinjaVariables flag", () => {
        const providerTrue = new JSONSchemaFormDataProvider({
            ...baseConfig,
            isUsingJinjaVariables: true,
        });
        const providerFalse = new JSONSchemaFormDataProvider({
            ...baseConfig,
            isUsingJinjaVariables: false,
        });
        const providerUndefined = new JSONSchemaFormDataProvider(baseConfig);

        expect(providerTrue.isUsingJinjaVariables).to.equal(true);
        expect(providerFalse.isUsingJinjaVariables).to.equal(false);
        expect(providerUndefined.isUsingJinjaVariables).to.equal(false);
    });

    it("returns styled uiSchema from uiSchemaStyled", () => {
        const provider = new JSONSchemaFormDataProvider(baseConfig);

        // Monkey-patch abstract getters to avoid "Not implemented." errors
        Object.defineProperty(provider, "uiSchema", {
            get() {
                return {
                    field1: {
                        "ui:widget": "text",
                        classNames: "original-class",
                    },
                    field2: {
                        "ui:widget": "number",
                    },
                };
            },
        });

        Object.defineProperty(provider, "defaultFieldStyles", {
            get() {
                return {
                    "ui:options": {
                        label: true,
                    },
                };
            },
        });

        const styled = provider.uiSchemaStyled;

        expect(styled).to.have.property("field1");
        expect(styled).to.have.property("field2");

        expect(styled.field1["ui:widget"]).to.equal("text");
        expect(styled.field1["ui:options"]).to.deep.equal({ label: true });
        expect(styled.field1.classNames).to.equal("original-class");

        expect(styled.field2["ui:widget"]).to.equal("number");
        expect(styled.field2["ui:options"]).to.deep.equal({ label: true });
        expect(styled.field2.classNames).to.equal("");
    });
});
