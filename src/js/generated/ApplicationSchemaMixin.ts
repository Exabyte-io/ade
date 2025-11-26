import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { ApplicationPropertiesSchema } from "@mat3ra/esse/dist/js/types";

export type ApplicationSchemaMixin = ApplicationPropertiesSchema;

export type ApplicationInMemoryEntity = InMemoryEntity & ApplicationSchemaMixin;

export function applicationSchemaMixin<T extends InMemoryEntity>(
    item: InMemoryEntity,
): asserts item is T & ApplicationSchemaMixin {
    // @ts-expect-error
    const properties: InMemoryEntity & ApplicationSchemaMixin = {
        get shortName() {
            return this.requiredProp<ApplicationPropertiesSchema["shortName"]>("shortName");
        },
        set shortName(value: ApplicationPropertiesSchema["shortName"]) {
            this.setProp("shortName", value);
        },
        get summary() {
            return this.requiredProp<ApplicationPropertiesSchema["summary"]>("summary");
        },
        set summary(value: ApplicationPropertiesSchema["summary"]) {
            this.setProp("summary", value);
        },
        get version() {
            return this.requiredProp<ApplicationPropertiesSchema["version"]>("version");
        },
        set version(value: ApplicationPropertiesSchema["version"]) {
            this.setProp("version", value);
        },
        get build() {
            return this.requiredProp<ApplicationPropertiesSchema["build"]>("build");
        },
        set build(value: ApplicationPropertiesSchema["build"]) {
            this.setProp("build", value);
        },
        get hasAdvancedComputeOptions() {
            return this.prop<ApplicationPropertiesSchema["hasAdvancedComputeOptions"]>(
                "hasAdvancedComputeOptions",
            );
        },
        set hasAdvancedComputeOptions(
            value: ApplicationPropertiesSchema["hasAdvancedComputeOptions"],
        ) {
            this.setProp("hasAdvancedComputeOptions", value);
        },
        get isLicensed() {
            return this.prop<ApplicationPropertiesSchema["isLicensed"]>("isLicensed");
        },
        set isLicensed(value: ApplicationPropertiesSchema["isLicensed"]) {
            this.setProp("isLicensed", value);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}
