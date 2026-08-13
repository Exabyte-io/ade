import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import {
    type Defaultable,
    defaultableEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import {
    type NamedEntity,
    namedEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import { runtimeItemsMixin } from "@mat3ra/code/dist/js/entity/mixins/RuntimeItemsMixin";
import type { RuntimeItemsSchemaMixin } from "@mat3ra/code/dist/js/generated/RuntimeItemsSchemaMixin";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import type { ExecutableSchema } from "@mat3ra/esse/dist/js/types";

import {
    type ExecutableSchemaMixin,
    executableSchemaMixin,
} from "./generated/ExecutableSchemaMixin";
import type { PartialBy } from "./typeUtils";

type Schema = ExecutableSchema;

/** Input for {@link Executable}: runtime item lists default to empty when omitted. */
export type ExecutableConstructorData<S extends Schema = Schema> = PartialBy<
    S,
    "monitors" | "results" | "postProcessors" | "preProcessors"
>;

interface Executable
    extends ExecutableSchemaMixin,
        RuntimeItemsSchemaMixin,
        NamedEntity,
        Defaultable {}

class Executable<S extends Schema = Schema> extends InMemoryEntity<S> implements Schema {
    // NoInfer: keep default S (or an explicit type arg) instead of inferring S from the data literal.
    constructor(data: NoInfer<ExecutableConstructorData<S>>) {
        super({
            ...data,
            monitors: data.monitors ?? [],
            results: data.results ?? [],
            postProcessors: data.postProcessors ?? [],
            preProcessors: data.preProcessors ?? [],
        } as S);
    }

    static get jsonSchema(): JSONSchema {
        const schema = JSONSchemasInterface.getSchemaById("software/executable");
        if (schema === undefined) {
            throw new Error('JSONSchemasInterface: missing schema id "software/executable"');
        }
        return schema;
    }

    declare static createDefault: () => Executable;
}

namedEntityMixin(Executable.prototype);
defaultableEntityMixin(Executable);
runtimeItemsMixin(Executable.prototype);
executableSchemaMixin(Executable.prototype);

export default Executable;
