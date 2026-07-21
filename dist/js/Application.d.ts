import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import { type Defaultable } from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import { HashedEntity } from "@mat3ra/code/dist/js/entity/mixins/HashedEntityMixin";
import { type NamedEntity } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import type { ApplicationSchema } from "@mat3ra/esse/dist/js/types";
import { type ApplicationSchemaMixin } from "./generated/ApplicationSchemaMixin";
type Schema = ApplicationSchema;
export type DefaultApplicationConfig = Pick<Schema, "name" | "shortName" | "version" | "summary" | "build">;
interface Application extends ApplicationSchemaMixin, NamedEntity, Defaultable, HashedEntity {
}
declare class Application<S extends Schema = Schema> extends InMemoryEntity<S> implements Schema {
    static get jsonSchema(): JSONSchema;
    static createDefault: () => Application;
    getHashObject(): {
        name: string;
        version: string;
        build: string;
    };
}
export default Application;
