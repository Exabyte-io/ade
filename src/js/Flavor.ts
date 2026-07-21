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
import type { FlavorSchema } from "@mat3ra/esse/dist/js/types";

import { type FlavorSchemaMixin, flavorSchemaMixin } from "./generated/FlavorSchemaMixin";
import type { PartialBy } from "./typeUtils";

type Schema = FlavorSchema;

interface Flavor extends FlavorSchemaMixin, RuntimeItemsSchemaMixin, NamedEntity, Defaultable {}

/** Input for {@link Flavor}: runtime item lists default to empty when omitted. */
export type FlavorConstructorData<S extends Schema = Schema> = PartialBy<
    S,
    "monitors" | "results" | "postProcessors" | "preProcessors"
>;

class Flavor<S extends Schema = Schema> extends InMemoryEntity<S> implements Schema {
    // NoInfer: keep default S (or an explicit type arg) instead of inferring S from the data literal.
    constructor(data: NoInfer<FlavorConstructorData<S>>) {
        super({
            ...data,
            monitors: data.monitors ?? [],
            results: data.results ?? [],
            postProcessors: data.postProcessors ?? [],
            preProcessors: data.preProcessors ?? [],
        } as S);
    }

    static get jsonSchema(): JSONSchema {
        const schema = JSONSchemasInterface.getSchemaById("software/flavor");
        if (schema === undefined) {
            throw new Error('JSONSchemasInterface: missing schema id "software/flavor"');
        }
        return schema;
    }

    declare static createDefault: () => Flavor;
}

namedEntityMixin(Flavor.prototype);
defaultableEntityMixin(Flavor);
runtimeItemsMixin(Flavor.prototype);
flavorSchemaMixin(Flavor.prototype);

export default Flavor;
