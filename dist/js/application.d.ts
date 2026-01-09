import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import { type DefaultableInMemoryEntityConstructor } from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import { type NamedInMemoryEntityConstructor } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { ApplicationSchema } from "@mat3ra/esse/dist/js/types";
import { type ApplicationMixin, type ApplicationStaticMixin } from "./applicationMixin";
type Base = typeof InMemoryEntity & NamedInMemoryEntityConstructor & DefaultableInMemoryEntityConstructor & Constructor<ApplicationMixin> & ApplicationStaticMixin;
declare const Application_base: Base;
export default class Application extends Application_base implements ApplicationSchema {
    constructor(data?: Partial<ApplicationSchema>);
    static createDefault: () => Application;
    toJSON: () => ApplicationSchema & AnyObject;
}
export {};
