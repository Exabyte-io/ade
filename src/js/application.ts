import { NamedDefaultableInMemoryEntity } from "@mat3ra/code/dist/js/entity";
import type { Constructor } from "@mat3ra/code/dist/js/utils/types";
import { Utils } from "@mat3ra/utils";

import {
    type ApplicationMixin,
    type ApplicationStaticMixin,
    applicationMixin,
    applicationStaticMixin,
} from "./applicationMixin";

type Base = typeof NamedDefaultableInMemoryEntity &
    Constructor<ApplicationMixin> &
    ApplicationStaticMixin;

export default class Application extends (NamedDefaultableInMemoryEntity as Base) {
    calculateHash() {
        return Utils.hash.calculateHashFromObject(
            Utils.specific.removeTimestampableKeysFromConfig(this.toJSON()),
        );
    }
}

applicationMixin(Application.prototype);
applicationStaticMixin(Application);
