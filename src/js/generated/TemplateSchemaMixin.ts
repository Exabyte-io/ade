import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { TemplatePropertiesSchema } from "@mat3ra/esse/dist/js/types";

export type TemplateSchemaMixin = TemplatePropertiesSchema;

export type TemplateInMemoryEntity = InMemoryEntity & TemplateSchemaMixin;

export function templateSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & TemplateSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity & TemplateSchemaMixin = {
        get executableName() {
            return this.requiredProp<TemplatePropertiesSchema["executableName"]>("executableName");
        },
        set executableName(value: TemplatePropertiesSchema["executableName"]) {
            this.setProp("executableName", value);
        },
        get applicationName() {
            return this.requiredProp<TemplatePropertiesSchema["applicationName"]>(
                "applicationName",
            );
        },
        set applicationName(value: TemplatePropertiesSchema["applicationName"]) {
            this.setProp("applicationName", value);
        },
        get applicationVersion() {
            return this.requiredProp<TemplatePropertiesSchema["applicationVersion"]>(
                "applicationVersion",
            );
        },
        set applicationVersion(value: TemplatePropertiesSchema["applicationVersion"]) {
            this.setProp("applicationVersion", value);
        },
        get contextProviders() {
            return this.requiredProp<TemplatePropertiesSchema["contextProviders"]>(
                "contextProviders",
            );
        },
        set contextProviders(value: TemplatePropertiesSchema["contextProviders"]) {
            this.setProp("contextProviders", value);
        },
        get content() {
            return this.requiredProp<TemplatePropertiesSchema["content"]>("content");
        },
        set content(value: TemplatePropertiesSchema["content"]) {
            this.setProp("content", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
