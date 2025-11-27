import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { DefaultableInMemoryEntity } from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import type { NamedEntity } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { ApplicationSchemaBase } from "@mat3ra/esse/dist/js/types";
import { ApplicationStandata } from "@mat3ra/standata";

import Executable from "./executable";
import {
    type ApplicationSchemaMixin,
    applicationSchemaMixin,
} from "./generated/ApplicationSchemaMixin";

type Base = InMemoryEntity & NamedEntity & DefaultableInMemoryEntity;

export type BaseConstructor = Constructor<Base> & {
    constructCustomExecutable?: (config: object) => Executable;
};

export type ApplicationMixin = ApplicationSchemaMixin & {
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

function applicationPropertiesMixin<T extends InMemoryEntity>(
    item: T,
): asserts item is T & ApplicationMixin {
    // @ts-expect-error
    const properties: ApplicationMixin & Base = {
        get isUsingMaterial() {
            const materialUsingApplications = ["vasp", "nwchem", "espresso"];
            return materialUsingApplications.includes(this.name);
        },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));
}

function applicationStaticMixin<T extends BaseConstructor>(Application: T) {
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

export function applicationMixin(Item: BaseConstructor) {
    applicationSchemaMixin(Item.prototype);
    applicationPropertiesMixin(Item.prototype);
    applicationStaticMixin(Item);
}
