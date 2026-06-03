import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { TemplatePropertiesSchema } from "@mat3ra/esse/dist/js/types";

export type TemplateSchemaMixin = TemplatePropertiesSchema;

export type TemplateInMemoryEntity = InMemoryEntity & TemplateSchemaMixin;

export function templateSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & TemplateSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity<TemplateSchemaMixin> & TemplateSchemaMixin = {
        get executableName() {
            return this.requiredProp("executableName");
        },
        set executableName(value: TemplatePropertiesSchema["executableName"]) {
            this.setProp("executableName", value);
        },
        get applicationName() {
            return this.requiredProp("applicationName");
        },
        set applicationName(value: TemplatePropertiesSchema["applicationName"]) {
            this.setProp("applicationName", value);
        },
        get applicationVersion() {
            return this.requiredProp("applicationVersion");
        },
        set applicationVersion(value: TemplatePropertiesSchema["applicationVersion"]) {
            this.setProp("applicationVersion", value);
        },
        get contextProviders() {
            return this.requiredProp("contextProviders");
        },
        set contextProviders(value: TemplatePropertiesSchema["contextProviders"]) {
            this.setProp("contextProviders", value);
        },
        get content() {
            return this.requiredProp("content");
        },
        set content(value: TemplatePropertiesSchema["content"]) {
            this.setProp("content", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
