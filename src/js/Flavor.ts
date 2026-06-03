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

interface Flavor extends FlavorSchemaMixin, RuntimeItemsSchemaMixin, NamedEntity, Defaultable {}

type ConstructorData = PartialBy<
    FlavorSchema,
    "monitors" | "results" | "postProcessors" | "preProcessors"
>;

class Flavor extends InMemoryEntity<FlavorSchema> implements FlavorSchema {
    constructor(data: ConstructorData) {
        super({
            monitors: [],
            results: [],
            postProcessors: [],
            preProcessors: [],
            ...data,
        });
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
