import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import { type Defaultable } from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import { type NamedEntity } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { RuntimeItemsSchemaMixin } from "@mat3ra/code/dist/js/generated/RuntimeItemsSchemaMixin";
import type { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import type { ExecutableSchema } from "@mat3ra/esse/dist/js/types";
import { type ExecutableSchemaMixin } from "./generated/ExecutableSchemaMixin";
import type { PartialBy } from "./typeUtils";
type Schema = ExecutableSchema;
/** Input for {@link Executable}: runtime item lists default to empty when omitted. */
export type ExecutableConstructorData<S extends Schema = Schema> = PartialBy<S, "monitors" | "results" | "postProcessors" | "preProcessors">;
interface Executable extends ExecutableSchemaMixin, RuntimeItemsSchemaMixin, NamedEntity, Defaultable {
}
declare class Executable<S extends Schema = Schema> extends InMemoryEntity<S> implements Schema {
    constructor(data: NoInfer<ExecutableConstructorData<S>>);
    static get jsonSchema(): JSONSchema;
    static createDefault: () => Executable;
}
export default Executable;
