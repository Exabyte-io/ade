import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { FlavorSchema } from "@mat3ra/esse/dist/js/types";

import { type FlavorSchemaMixin, flavorSchemaMixin } from "./generated/FlavorSchemaMixin";

export type FlavorMixin = FlavorSchemaMixin;

function flavorStaticMixin(Flavor: Constructor<InMemoryEntity>) {
    const properties: FlavorStaticMixin = {
        get jsonSchema() {
            return JSONSchemasInterface.getSchemaById("software/flavor") as FlavorSchema;
        },
    };

    Object.defineProperties(Flavor, Object.getOwnPropertyDescriptors(properties));
}

export type FlavorStaticMixin = {
    jsonSchema: FlavorSchema;
};

export function flavorMixin(Item: Constructor<InMemoryEntity>) {
    flavorSchemaMixin(Item.prototype);
    flavorStaticMixin(Item);
}
