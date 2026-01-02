import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import { type DefaultableInMemoryEntityConstructor } from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import { type NamedInMemoryEntityConstructor } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import { type RuntimeItemsInMemoryEntityConstructor } from "@mat3ra/code/dist/js/entity/mixins/RuntimeItemsMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { ExecutableSchema } from "@mat3ra/esse/dist/js/types";
import { type ExecutableMixin } from "./executableMixin";
type Base = Constructor<ExecutableMixin> & RuntimeItemsInMemoryEntityConstructor & NamedInMemoryEntityConstructor & DefaultableInMemoryEntityConstructor & typeof InMemoryEntity;
declare const Executable_base: Base;
export default class Executable extends Executable_base implements ExecutableSchema {
    constructor(data?: Partial<ExecutableSchema>);
    createDefault: () => Executable;
}
export {};
