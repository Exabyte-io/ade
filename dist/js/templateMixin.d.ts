import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { ContextProviderNameEnum, ContextProviderSchema, TemplateSchema } from "@mat3ra/esse/dist/js/types";
import ContextProvider from "./context/ContextProvider";
import ContextProviderRegistryContainer from "./context/ContextProviderRegistryContainer";
import { type TemplateSchemaMixin } from "./generated/TemplateSchemaMixin";
export type TemplateBase = InMemoryEntity;
export type TemplateMixin = TemplateSchemaMixin & {
    render: (externalContext?: Record<string, unknown>) => void;
    getRenderedJSON: (context?: Record<string, unknown>) => AnyObject;
    _cleanRenderingContext: (object: Record<string, unknown>) => Record<string, unknown>;
    getDataFromProvidersForRenderingContext: (context?: Record<string, unknown>) => Record<string, unknown>;
    setContent: (text: string) => void;
    setRendered: (text: string) => void;
    getContextProvidersAsClassInstances: (providerContext?: Record<string, unknown>) => ContextProvider[];
    getDataFromProvidersForPersistentContext: (providerContext?: Record<string, unknown>) => Record<string, unknown>;
    getRenderingContext: (externalContext?: Record<string, unknown>) => Record<string, unknown>;
};
export type ContextProviderConfigMapEntry = {
    providerCls: typeof ContextProvider;
    config: ContextProviderSchema;
};
export type ContextProviderConfigMap = Partial<Record<ContextProviderNameEnum, ContextProviderConfigMapEntry>>;
export type TemplateStaticMixin = {
    contextProviderRegistry: ContextProviderRegistryContainer | null;
    setContextProvidersConfig: (classConfigMap: ContextProviderConfigMap) => void;
    jsonSchema: TemplateSchema;
};
export declare function templateStaticMixin(item: Constructor<TemplateBase>): void;
export declare function templateMixin(Item: Constructor<TemplateBase>): void;
