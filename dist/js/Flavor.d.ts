import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import { type Defaultable } from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import { type NamedEntity } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { RuntimeItemsSchemaMixin } from "@mat3ra/code/dist/js/generated/RuntimeItemsSchemaMixin";
import type { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import type { FlavorSchema } from "@mat3ra/esse/dist/js/types";
import { type FlavorSchemaMixin } from "./generated/FlavorSchemaMixin";
import type { PartialBy } from "./typeUtils";
interface Flavor extends FlavorSchemaMixin, RuntimeItemsSchemaMixin, NamedEntity, Defaultable {
}
type ConstructorData = PartialBy<FlavorSchema, "monitors" | "results" | "postProcessors" | "preProcessors">;
declare class Flavor extends InMemoryEntity<FlavorSchema> implements FlavorSchema {
    constructor(data: ConstructorData);
    static get jsonSchema(): JSONSchema;
    static createDefault: () => Flavor;
}
export default Flavor;
