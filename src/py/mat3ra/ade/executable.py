from typing import List

from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.software.executable import ExecutableSchema, RuntimeItemNameObjectSchema
from pydantic import Field


class Executable(ExecutableSchema, InMemoryEntitySnakeCase):
    """
    Executable class representing an executable of an application.

    Attributes:
        name: The name of the executable (required)
        applicationName: Name of the application this executable belongs to
        applicationVersion: Version of the application this executable belongs to
        hasAdvancedComputeOptions: Whether advanced compute options are present
        isDefault: Identifies that entity is defaultable
        schemaVersion: Entity's schema version
        preProcessors: Names of the pre-processors for this calculation
        postProcessors: Names of the post-processors for this calculation
        monitors: Names of the monitors for this calculation
        results: Names of the results for this calculation
    """

    preProcessors: List[RuntimeItemNameObjectSchema] = Field(default_factory=list)
    postProcessors: List[RuntimeItemNameObjectSchema] = Field(default_factory=list)
    monitors: List[RuntimeItemNameObjectSchema] = Field(default_factory=list)
    results: List[RuntimeItemNameObjectSchema] = Field(default_factory=list)
    applicationName: str = ""
    applicationVersion: str = ""
