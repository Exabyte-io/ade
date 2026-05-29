from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.code.mixins import HashedEntityMixin
from mat3ra.esse.models.software.application import ApplicationSchema
from mat3ra.utils.object import calculate_hash_from_object
from pydantic import ConfigDict, Field


class Application(ApplicationSchema, HashedEntityMixin, InMemoryEntitySnakeCase):
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

    shortName: str = ""
    summary: str = ""
    version: str = ""
    build: str = ""
    isUsingMaterial: bool = Field(default=False)

    @property
    def is_using_material(self) -> bool:
        return bool(self.isUsingMaterial)

    def get_short_name(self) -> str:
        return self.short_name if self.short_name else self.name

    def get_hash_object(self) -> dict:
        return {
            "name": self.name,
            "version": self.version,
            "build": self.build,
        }
