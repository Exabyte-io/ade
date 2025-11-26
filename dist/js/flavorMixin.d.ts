import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { FlavorSchema } from "@mat3ra/esse/dist/js/types";
import { type FlavorSchemaMixin } from "./generated/FlavorSchemaMixin";
export type FlavorMixin = FlavorSchemaMixin & {};
export type FlavorStaticMixin = {
    jsonSchema: FlavorSchema;
};
export declare function flavorMixin(Item: Constructor<InMemoryEntity>): void;
