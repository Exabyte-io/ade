import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { Defaultable } from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import type { NamedEntity } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { ExecutableSchema } from "@mat3ra/esse/dist/js/types";
import type { FlavorMixin } from "./flavorMixin";
import { ExecutableSchemaMixin } from "./generated/ExecutableSchemaMixin";
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
export declare function executableMixin(Item: BaseConstructor): void;
export {};
