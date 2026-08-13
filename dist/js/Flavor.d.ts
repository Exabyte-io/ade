import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import { type Defaultable } from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import { type NamedEntity } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { RuntimeItemsSchemaMixin } from "@mat3ra/code/dist/js/generated/RuntimeItemsSchemaMixin";
import type { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import type { FlavorSchema } from "@mat3ra/esse/dist/js/types";
import { type FlavorSchemaMixin } from "./generated/FlavorSchemaMixin";
import type { PartialBy } from "./typeUtils";
type Schema = FlavorSchema;
interface Flavor extends FlavorSchemaMixin, RuntimeItemsSchemaMixin, NamedEntity, Defaultable {
}
/** Input for {@link Flavor}: runtime item lists default to empty when omitted. */
export type FlavorConstructorData<S extends Schema = Schema> = PartialBy<S, "monitors" | "results" | "postProcessors" | "preProcessors">;
declare class Flavor<S extends Schema = Schema> extends InMemoryEntity<S> implements Schema {
    constructor(data: NoInfer<FlavorConstructorData<S>>);
    static get jsonSchema(): JSONSchema;
    static createDefault: () => Flavor;
}
export default Flavor;
