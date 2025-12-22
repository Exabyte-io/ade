from typing import List

from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.software.flavor import FlavorSchema, \
    ExecutionUnitInputIdItemSchemaForPhysicsBasedSimulationEngines
from pydantic import Field


class FlavorInput(ExecutionUnitInputIdItemSchemaForPhysicsBasedSimulationEngines):
    """
    FlavorInput class representing an input template for a flavor.

    Attributes:
        templateId: ID of the template
        templateName: Name of the template
        name: Name of the resulting input file, if different from template name
    """

    pass

class Flavor(FlavorSchema, InMemoryEntitySnakeCase):
    """
    Flavor class representing a flavor of an executable.

    Attributes:
        name: Flavor name (required)
        executableId: ID of the executable this flavor belongs to
        executableName: Name of the executable this flavor belongs to
        applicationName: Name of the application this flavor belongs to
        input: List of input templates for this flavor
        supportedApplicationVersions: List of application versions this flavor supports
        isDefault: Identifies that entity is defaultable
        schemaVersion: Entity's schema version
        preProcessors: Names of the pre-processors for this calculation
        postProcessors: Names of the post-processors for this calculation
        monitors: Names of the monitors for this calculation
        results: Names of the results for this calculation
    """

    input: List[FlavorInput] = Field(default_factory=list, description="Input templates for this flavor")

