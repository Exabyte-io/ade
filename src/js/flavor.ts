import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import {
    type DefaultableInMemoryEntity,
    defaultableEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import {
    type NamedInMemoryEntity,
    namedEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import {
    type RuntimeItemsStringInMemoryEntity,
    runtimeItemsStringMixin,
} from "@mat3ra/code/dist/js/entity/mixins/RuntimeItemsStringMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { FlavorSchema } from "@mat3ra/esse/dist/js/types";

import { type FlavorMixin, flavorMixin } from "./flavorMixin";

type Base = typeof InMemoryEntity &
    Constructor<FlavorMixin> &
    Constructor<RuntimeItemsStringInMemoryEntity> &
    Constructor<NamedInMemoryEntity> &
    Constructor<DefaultableInMemoryEntity>;

export default class Flavor extends (InMemoryEntity as Base) {
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
}

runtimeItemsStringMixin(Flavor.prototype);
namedEntityMixin(Flavor.prototype);
defaultableEntityMixin(Flavor);
flavorMixin(Flavor);
