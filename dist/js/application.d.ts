import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import { type Defaultable } from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import { type NamedEntity } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { AnyObject } from "@mat3ra/esse/dist/js/esse/types";
import type { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import type { ApplicationSchema } from "@mat3ra/esse/dist/js/types";
import { type ApplicationSchemaMixin } from "./generated/ApplicationSchemaMixin";
export type DefaultApplicationConfig = Pick<ApplicationSchema, "name" | "shortName" | "version" | "summary" | "build">;
interface Application extends ApplicationSchemaMixin, NamedEntity, Defaultable {
}
declare class Application extends InMemoryEntity implements ApplicationSchema {
    constructor(data?: Partial<ApplicationSchema>);
    static get jsonSchema(): JSONSchema;
    static createDefault: () => Application;
    toJSON: () => ApplicationSchema & AnyObject;
    get isUsingMaterial(): boolean;
}
export default Application;
