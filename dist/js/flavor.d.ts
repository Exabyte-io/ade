import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import { type DefaultableInMemoryEntity } from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import { type NamedInMemoryEntity } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import { type RuntimeItemsStringInMemoryEntity } from "@mat3ra/code/dist/js/entity/mixins/RuntimeItemsStringMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { FlavorSchema } from "@mat3ra/esse/dist/js/types";
import { type FlavorMixin } from "./flavorMixin";
type Base = typeof InMemoryEntity & Constructor<FlavorMixin> & Constructor<RuntimeItemsStringInMemoryEntity> & Constructor<NamedInMemoryEntity> & Constructor<DefaultableInMemoryEntity>;
declare const Flavor_base: Base;
export default class Flavor extends Flavor_base {
    constructor(data?: Partial<FlavorSchema>);
}
export {};
