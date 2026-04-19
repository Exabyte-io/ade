from typing import Any, Dict, Set

from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse import ESSE
from mat3ra.esse.models.software.application import ApplicationSchemaBase
from mat3ra.utils.object import calculate_hash_from_object, remove_timestampable_keys

APPLICATION_SCHEMA_ID = "software/application"


def _collect_schema_property_names(schema: Dict[str, Any]) -> Set[str]:
    """Recursively collect every property name declared anywhere in a JSON schema,
    walking through `allOf` / `anyOf` / `oneOf` combinators."""
    names: Set[str] = set()
    if not isinstance(schema, dict):
        return names
    properties = schema.get("properties")
    if isinstance(properties, dict):
        names.update(properties.keys())
    for combinator in ("allOf", "anyOf", "oneOf"):
        for sub_schema in schema.get(combinator, []) or []:
            names.update(_collect_schema_property_names(sub_schema))
    return names


class Application(ApplicationSchemaBase, InMemoryEntitySnakeCase):
    """
    Application class representing a software application.

    Attributes:
        name: Application name (required)
        version: Application version
        build: Application build
        shortName: Short name of the application
        summary: Application's short description
        hasAdvancedComputeOptions: Whether advanced compute options are present
        isLicensed: Whether licensing is present
        isDefault: Identifies that entity is defaultable
        schemaVersion: Entity's schema version
    """

    @property
    def is_using_material(self) -> bool:
        material_using_applications = [
            "deepmd",
            "espresso",
            "lammps",
            "nwchem",
            "python",
            "vasp",
        ]
        return self.name in material_using_applications

    def get_short_name(self) -> str:
        return self.short_name if self.short_name else self.name

    def calculate_hash(self) -> str:
        """Calculate a stable hash of the application config.

        Uses the ESSE `software/application` schema to drop keys the schema
        doesn't declare (e.g. `buildConfig` that standata may attach) so the
        digest stays aligned with the JS implementation, which performs the
        same schema-driven filtering inside `Application.toJSON()`.
        """
        esse = ESSE()
        schema = esse.get_schema_by_id(APPLICATION_SCHEMA_ID)
        allowed_keys = _collect_schema_property_names(schema)
        config = {k: v for k, v in self.to_dict().items() if k in allowed_keys}
        try:
            esse.validate(config, schema)
        except Exception as err:
            raise ValueError("Application config failed ESSE schema validation") from err
        return calculate_hash_from_object(remove_timestampable_keys(config))
