import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import { type Defaultable } from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import { type NamedEntity } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { RuntimeItemsInMemoryEntity } from "@mat3ra/code/dist/js/generated/RuntimeItemsSchemaMixin";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import type { FlavorSchema } from "@mat3ra/esse/dist/js/types";
import { type FlavorSchemaMixin } from "./generated/FlavorSchemaMixin";
interface Flavor extends FlavorSchemaMixin, RuntimeItemsInMemoryEntity, NamedEntity, Defaultable {
}
declare class Flavor extends InMemoryEntity implements FlavorSchema {
    constructor(data?: Partial<FlavorSchema>);
    static get jsonSchema(): JSONSchema;
    static createDefault: () => Flavor;
    toJSON: () => FlavorSchema & AnyObject;
}
export default Flavor;
