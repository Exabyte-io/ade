import { ContextProviderSchema, Name as ContextProviderNameEnum } from "@mat3ra/esse/dist/js/types";
export interface ContextProviderInstance {
    constructor: typeof ContextProvider;
    config: ContextProviderSchema;
}
export interface ContextProviderStatic {
    getConstructorConfig: (config: ContextProviderSchema) => ContextProviderInstance;
    createConfigFromContext: (config: ContextProviderSchema) => ContextProviderSchema;
    getExtraDataKeyByName: (name: string) => string;
    getIsEditedKeyByName: (name: string) => string;
}
export default class ContextProvider implements ContextProviderSchema {
    config: ContextProviderSchema;
    name: ContextProviderNameEnum;
    domain?: string;
    entityName?: string;
    data?: object;
    extraData?: object;
    isEdited?: boolean;
    context?: object;
    [k: string]: unknown;
    constructor(config: ContextProviderSchema);
    static getConstructorConfig(config: ContextProviderSchema): ContextProviderInstance;
    static createConfigFromContext(config: ContextProviderSchema): ContextProviderSchema & ({
        data: never;
        extraData: any;
        isEdited: any;
    } | {
        data?: undefined;
        extraData?: undefined;
        isEdited?: undefined;
    });
    setIsEdited(isEdited: boolean): void;
    getData(): object | undefined;
    setData(data: object): void;
    get defaultData(): object;
    transformData(data: object): object;
    yieldData(...transformDataArgs: any): {
        [x: string]: boolean | object | undefined;
    };
    yieldDataForRendering(): {
        [x: string]: boolean | object | undefined;
    };
    get extraDataKey(): string;
    static getExtraDataKeyByName(name: string): string;
    get isEditedKey(): string;
    static getIsEditedKeyByName(name: string): string;
    get isUnitContextProvider(): boolean;
    get isSubworkflowContextProvider(): boolean;
}
