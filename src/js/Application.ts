import { InMemoryEntity } from "@mat3ra/code/dist/js/entity";
import {
    type Defaultable,
    defaultableEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/DefaultableMixin";
import {
    HashedEntity,
    hashedEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/HashedEntityMixin";
import {
    type NamedEntity,
    namedEntityMixin,
} from "@mat3ra/code/dist/js/entity/mixins/NamedEntityMixin";
import JSONSchemasInterface from "@mat3ra/esse/dist/js/esse/JSONSchemasInterface";
import type { JSONSchema } from "@mat3ra/esse/dist/js/esse/utils";
import type { ApplicationSchema } from "@mat3ra/esse/dist/js/types";

import {
    type ApplicationSchemaMixin,
    applicationSchemaMixin,
} from "./generated/ApplicationSchemaMixin";

export type DefaultApplicationConfig = Pick<
    ApplicationSchema,
    "name" | "shortName" | "version" | "summary" | "build"
>;

interface Application extends ApplicationSchemaMixin, NamedEntity, Defaultable, HashedEntity {}

class Application extends InMemoryEntity<ApplicationSchema> implements ApplicationSchema {
    static get jsonSchema(): JSONSchema {
        const schema = JSONSchemasInterface.getSchemaById("software/application");
        if (schema === undefined) {
            throw new Error('JSONSchemasInterface: missing schema id "software/application"');
        }
        return schema;
    }

    declare static createDefault: () => Application;

    getHashObject() {
        return {
            name: this.name,
            version: this.version,
            build: this.build,
        };
    }
}

namedEntityMixin(Application.prototype);
defaultableEntityMixin(Application);
applicationSchemaMixin(Application.prototype);
hashedEntityMixin(Application.prototype);

export default Application;
