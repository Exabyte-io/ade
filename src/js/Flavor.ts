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
import type { RuntimeItemsInMemoryEntity } from "@mat3ra/code/dist/js/generated/RuntimeItemsSchemaMixin";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import type { FlavorSchema } from "@mat3ra/esse/dist/js/types";

import { type FlavorSchemaMixin, flavorSchemaMixin } from "./generated/FlavorSchemaMixin";

interface Flavor extends FlavorSchemaMixin, RuntimeItemsInMemoryEntity, NamedEntity, Defaultable {}

class Flavor extends InMemoryEntity implements FlavorSchema {
    constructor(data: Partial<FlavorSchema> = {}) {
        super({
            monitors: [],
            results: [],
            postProcessors: [],
            preProcessors: [],
            input: [],
            executableId: "",
            executableName: "",
            applicationName: "",
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

    declare toJSON: () => FlavorSchema & AnyObject;
}

namedEntityMixin(Flavor.prototype);
defaultableEntityMixin(Flavor);
runtimeItemsMixin(Flavor.prototype);
flavorSchemaMixin(Flavor.prototype);

export default Flavor;
