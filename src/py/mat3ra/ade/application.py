from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.software.application import ApplicationSchemaBase
from mat3ra.utils.object import calculate_hash_from_object, remove_timestampable_keys
from pydantic import ConfigDict, Field


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
        isUsingMaterial: Whether this application is used for materials processing
        isDefault: Identifies that entity is defaultable
        schemaVersion: Entity's schema version
    """

    # `extra="ignore"` drops keys the schema doesn't declare (e.g. `buildConfig`
    # attached by standata) at construction time, so `calculate_hash` stays
    # aligned with the JS side, which performs the same schema-driven filtering
    # inside `Application.toJSON()`.
    model_config = ConfigDict(extra="ignore")

    isUsingMaterial: bool = Field(default=False)

    @property
    def is_using_material(self) -> bool:
        return bool(self.isUsingMaterial)

    def get_short_name(self) -> str:
        return self.short_name if self.short_name else self.name

    def calculate_hash(self) -> str:
        return calculate_hash_from_object(remove_timestampable_keys(self.to_dict()))
