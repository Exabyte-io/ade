from copy import deepcopy
from typing import Any, Dict, List, Optional

from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.software.template import TemplateSchema
from mat3ra.utils.extra.jinja import render_jinja_with_error_handling
from pydantic import Field

from .context.context_provider import ContextProvider


class Template(TemplateSchema, InMemoryEntitySnakeCase):
    """
    Template class representing a template for application input files.

    Attributes:
        name: Input file name (required)
        content: Content of the input file (required)
        rendered: Rendered content of the input file
        applicationName: Name of the application this template belongs to
        applicationVersion: Version of the application this template belongs to
        executableName: Name of the executable this template belongs to
        contextProviders: List of context providers for this template
        isManuallyChanged: Whether the template has been manually changed
        schemaVersion: Entity's schema version
    """

    contextProviders: List[ContextProvider] = Field(
        default_factory=list, description="List of context providers for this template"
    )

    def get_rendered(self) -> str:
        return self.rendered if self.rendered is not None else self.content

    def set_content(self, text: str) -> None:
        self.content = text

    def set_rendered(self, text: str) -> None:
        self.rendered = text

    def add_context_provider(self, provider: ContextProvider) -> None:
        self.context_providers = [*self.context_providers, provider]

    def remove_context_provider(self, provider: ContextProvider) -> None:
        self.context_providers = [
            p
            for p in self.context_providers
            if not (p.name == provider.name and p.domain == provider.domain)
        ]

    def _clean_rendering_context(self, context: Dict[str, Any]) -> Dict[str, Any]:
        cleaned = deepcopy(context)
        cleaned.pop("job", None)
        return cleaned

    def get_data_from_providers_for_rendering_context(
        self, provider_context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        result: Dict[str, Any] = {}
        for provider in self.context_providers:
            provider.merge_context_data(result, provider_context)
        return result

    def _get_rendering_context(
        self, external_context: Optional[Dict[str, Any]] = None
    ) -> Dict[str, Any]:
        provider_context = external_context or {}
        return {
            **(external_context or {}),
            **self.get_data_from_providers_for_rendering_context(provider_context),
        }

    def render(self, external_context: Optional[Dict[str, Any]] = None) -> None:
        rendering_context = self._get_rendering_context(external_context)
        if not self.isManuallyChanged:
            cleaned_context = self._clean_rendering_context(rendering_context)
            rendered = render_jinja_with_error_handling(self.content, **cleaned_context)
            self.rendered = rendered or self.content

    def get_rendered_dict(self, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        self.render(context)
        return self.to_dict()

    def get_rendered_json(self, context: Optional[Dict[str, Any]] = None) -> str:
        self.render(context)
        return self.to_json()
