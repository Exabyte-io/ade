import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import {
    type DefaultableInMemoryEntity,
    defaultableEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import {
    type NamedEntity,
    namedEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import {
    type RuntimeItems,
    runtimeItemsMixin,
} from "@mat3ra/code/dist/js/entity/mixins/RuntimeItemsMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { FlavorSchema } from "@mat3ra/esse/dist/js/types";

import { type FlavorMixin, flavorMixin } from "./flavorMixin";

type Base = typeof InMemoryEntity &
    Constructor<FlavorMixin> &
    Constructor<RuntimeItems> &
    Constructor<NamedEntity> &
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

runtimeItemsMixin(Flavor.prototype);
namedEntityMixin(Flavor.prototype);
defaultableEntityMixin(Flavor);
flavorMixin(Flavor);
