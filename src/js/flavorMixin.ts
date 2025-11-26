import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { FlavorSchema } from "@mat3ra/esse/dist/js/types";

import { type FlavorSchemaMixin, flavorSchemaMixin } from "./generated/FlavorSchemaMixin";

export type FlavorMixin = FlavorSchemaMixin & {
    // getInputAsRenderedTemplates: (context: Record<string, unknown>) => Record<string, unknown>[];
};

// TODO: should we add fields from esse schema (executableId, executableName, applicationName)?
function flavorPropertiesMixin(item: InMemoryEntity & FlavorSchemaMixin) {
    // @ts-expect-error
    const properties: FlavorMixin & InMemoryEntity & FlavorSchemaMixin = {
        // TODO: there is no "isMultiMaterial" field in the schema; should we add it?
        // get disableRenderMaterials() {
        //     return this.prop("isMultiMaterial", false);
        // },
        // TODO: do we actually use this method anywhere?
        // getInputAsRenderedTemplates(context: Record<string, unknown>) {
        //     return this.input?.map((template) => {
        //         if (template && typeof template === "object" && "getRenderedJSON" in template) {
        //             return template.getRenderedJSON(context);
        //         }
        //         return template;
        //     });
        // },
    };

    Object.defineProperties(item, Object.getOwnPropertyDescriptors(properties));

    return properties;
}

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
    flavorPropertiesMixin(Item.prototype);
    flavorStaticMixin(Item);
}
