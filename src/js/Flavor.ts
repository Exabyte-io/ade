import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import {
    type DefaultableInMemoryEntityConstructor,
    defaultableEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import {
    namedEntityMixin,
    NamedInMemoryEntityConstructor,
} from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import {
    type RuntimeItemsInMemoryEntityConstructor,
    runtimeItemsMixin,
} from "@mat3ra/code/dist/js/entity/mixins/RuntimeItemsMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { FlavorSchema } from "@mat3ra/esse/dist/js/types";

import { type FlavorMixin, flavorMixin } from "./flavorMixin";

type Base = typeof InMemoryEntity &
    Constructor<FlavorMixin> &
    RuntimeItemsInMemoryEntityConstructor &
    NamedInMemoryEntityConstructor &
    DefaultableInMemoryEntityConstructor;

export default class Flavor extends (InMemoryEntity as Base) implements FlavorSchema {
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

    declare createDefault: () => Flavor;
}

namedEntityMixin(Flavor.prototype);
defaultableEntityMixin(Flavor);
runtimeItemsMixin(Flavor.prototype);
flavorMixin(Flavor);
