import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import { type DefaultableInMemoryEntityConstructor } from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import { NamedInMemoryEntityConstructor } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import { type RuntimeItemsInMemoryEntityConstructor } from "@mat3ra/code/dist/js/entity/mixins/RuntimeItemsMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { FlavorSchema } from "@mat3ra/esse/dist/js/types";
import { type FlavorMixin } from "./flavorMixin";
type Base = typeof InMemoryEntity & Constructor<FlavorMixin> & RuntimeItemsInMemoryEntityConstructor & NamedInMemoryEntityConstructor & DefaultableInMemoryEntityConstructor;
declare const Flavor_base: Base;
export default class Flavor extends Flavor_base implements FlavorSchema {
    constructor(data?: Partial<FlavorSchema>);
    static createDefault: () => Flavor;
    toJSON: () => FlavorSchema & AnyObject;
}
export {};
