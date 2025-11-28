import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { Defaultable } from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import type { NamedEntity } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { ExecutableSchema } from "@mat3ra/esse/dist/js/types";

import type { FlavorMixin } from "./flavorMixin";
import { ExecutableSchemaMixin, executableSchemaMixin } from "./generated/ExecutableSchemaMixin";

type BaseFlavor = FlavorMixin & NamedEntity & InMemoryEntity;
type Base = InMemoryEntity & NamedEntity & Defaultable;

export type BaseConstructor = Constructor<Base> & {
    constructCustomFlavor?: (config: object) => BaseFlavor;
};

export type ExecutableMixin = ExecutableSchemaMixin & {
    toJSON: () => ExecutableSchema & AnyObject;
};

export type ExecutableStaticMixin = {
    jsonSchema: ExecutableSchema;
};

function executableStaticMixin(Executable: Constructor<Base>) {
    const properties: ExecutableStaticMixin = {
        get jsonSchema() {
            return JSONSchemasInterface.getSchemaById("software/executable") as ExecutableSchema;
        },
    };

    Object.defineProperties(Executable, Object.getOwnPropertyDescriptors(properties));
}

export function executableMixin(Item: BaseConstructor) {
    executableSchemaMixin(Item.prototype);
    executableStaticMixin(Item);
}
