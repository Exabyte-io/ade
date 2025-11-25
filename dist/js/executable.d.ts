import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import { type DefaultableInMemoryEntity } from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import { type NamedInMemoryEntity } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import { type RuntimeItemsStringInMemoryEntity } from "@mat3ra/code/dist/js/entity/mixins/RuntimeItemsStringMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { ExecutableSchema } from "@mat3ra/esse/dist/js/types";
import { type ExecutableMixin } from "./executableMixin";
type Base = Constructor<ExecutableMixin> & Constructor<RuntimeItemsStringInMemoryEntity> & Constructor<NamedInMemoryEntity> & Constructor<DefaultableInMemoryEntity> & typeof InMemoryEntity;
declare const Executable_base: Base;
export default class Executable extends Executable_base {
    constructor(data?: Partial<ExecutableSchema>);
}
export {};
