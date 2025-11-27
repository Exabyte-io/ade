import { Name as ContextProviderNameEnum } from "@mat3ra/esse/dist/js/types";
import { expect } from "chai";

import ContextProvider from "../../src/js/context/ContextProvider";

describe("ContextProvider", () => {
    const minimal = { name: ContextProviderNameEnum.KGridFormDataManager };
    const data = { a: "test" };

    it("can be created", () => {
        const provider = new ContextProvider(minimal);
        // eslint-disable-next-line no-unused-expressions
        expect(provider).to.exist;
    });

    it("sets and gets data", () => {
        const provider = new ContextProvider(minimal);
        provider.setData(data);
        expect(() => provider.getData()).to.throw("Not implemented.");
        provider.setIsEdited(true);
        expect(JSON.stringify(provider.getData())).to.equal(JSON.stringify(data));
        expect(() => provider.defaultData).to.throw("Not implemented.");
    });

    it("should return extraDataKey", () => {
        const provider = new ContextProvider(minimal);
        expect(provider.extraDataKey).to.equal(`${provider.name}ExtraData`);
    });

    it("should return isEditedKey", () => {
        const provider = new ContextProvider(minimal);
        expect(provider.isEditedKey).to.include("Edited");
        expect(provider.isEditedKey).to.include("is");
    });

    it("should return isUnitContextProvider", () => {
        const provider = new ContextProvider({ ...minimal, entityName: "unit" });
        expect(provider.isUnitContextProvider).to.be.true;
        const nonUnitProvider = new ContextProvider({ ...minimal, entityName: "subworkflow" });
        expect(nonUnitProvider.isUnitContextProvider).to.be.false;
    });

    it("should return isSubworkflowContextProvider", () => {
        const provider = new ContextProvider({ ...minimal, entityName: "subworkflow" });
        expect(provider.isSubworkflowContextProvider).to.be.true;
        const nonSubworkflowProvider = new ContextProvider({ ...minimal, entityName: "unit" });
        expect(nonSubworkflowProvider.isSubworkflowContextProvider).to.be.false;
    });

    // transform, yieldData, yieldDataForRendering
});
