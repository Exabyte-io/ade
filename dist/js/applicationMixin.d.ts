import type { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { DefaultableInMemoryEntity } from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import type { NamedEntity } from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import type { ApplicationSchemaBase } from "@mat3ra/esse/dist/js/types";
import Executable from "./executable";
import { type ApplicationSchemaMixin } from "./generated/ApplicationSchemaMixin";
type Base = InMemoryEntity & NamedEntity & DefaultableInMemoryEntity;
export type BaseConstructor = Constructor<Base> & {
    constructCustomExecutable?: (config: object) => Executable;
};
export type ApplicationMixin = ApplicationSchemaMixin & {
    name: Required<ApplicationSchemaBase>["name"];
    isUsingMaterial: boolean;
};
export type DefaultApplicationConfig = Pick<ApplicationSchemaBase, "name" | "shortName" | "version" | "summary" | "build">;
export type ApplicationStaticMixin = {
    defaultConfig: DefaultApplicationConfig;
    jsonSchema: ApplicationSchemaBase;
};
export declare function applicationMixin(Item: BaseConstructor): void;
export {};
