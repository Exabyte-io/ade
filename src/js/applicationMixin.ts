import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { DefaultableInMemoryEntity } from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import type { NamedInMemoryEntity } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { ApplicationSchemaBase } from "@mat3ra/esse/dist/js/types";
import { ApplicationStandata } from "@mat3ra/standata";

import Executable from "./executable";

type Base = InMemoryEntity & NamedInMemoryEntity & DefaultableInMemoryEntity;

export type BaseConstructor = Constructor<Base> & {
    constructCustomExecutable?: (config: object) => Executable;
};

export type ApplicationConstructor = Constructor<ApplicationMixin> & ApplicationStaticMixin;

export type ApplicationMixin = Pick<
    ApplicationSchemaBase,
    "summary" | "version" | "build" | "shortName" | "hasAdvancedComputeOptions" | "isLicensed"
> & {
    name: Required<ApplicationSchemaBase>["name"];
    isUsingMaterial: boolean;
};

export type DefaultApplicationConfig = Pick<
    ApplicationSchemaBase,
    "name" | "shortName" | "version" | "summary" | "build"
>;

export type ApplicationStaticMixin = {
    defaultConfig: DefaultApplicationConfig;
    jsonSchema: ApplicationSchemaBase;
};

export function applicationMixin(item: Base) {
    // @ts-expect-error
    const properties: ApplicationMixin & Base = {
        get summary() {
            return this.prop("summary");
        },

        get version() {
            return this.prop("version", "");
        },

        get build() {
            return this.prop("build");
        },

        get shortName() {
            return this.prop("shortName", this.name);
        },

        get hasAdvancedComputeOptions() {
            return this.prop("hasAdvancedComputeOptions", false);
        },

        get isLicensed() {
            return this.prop("isLicensed", false);
        },

        get isUsingMaterial() {
            const materialUsingApplications = [
                "deepmd",
                "espresso",
                "lammps",
                "nwchem",
                "python",
                "vasp",
            ];
            return materialUsingApplications.includes(this.name);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}

export function applicationStaticMixin<T extends BaseConstructor>(Application: T) {
    const properties: ApplicationStaticMixin = {
        get defaultConfig() {
            return new ApplicationStandata().getDefaultConfig();
        },
        get jsonSchema() {
            return JSONSchemasInterface.getSchemaById(
                "software/application",
            ) as ApplicationSchemaBase;
        },
    };

    Object.defineProperties(Application, Object.getOwnPropertyDescriptors(properties));
}
