from typing import Any, Dict, Optional

from mat3ra.code.entity import InMemoryEntitySnakeCase
from mat3ra.esse.models.context_provider import ContextProviderSchema


class ContextProvider(ContextProviderSchema, InMemoryEntitySnakeCase):
    """
    Context provider for a template.

    Attributes:
        name: The name of this item (required)
        domain: Domain of the context provider
        entityName: Entity name associated with the context provider
        data: Data object for the context provider
        extraData: Additional data object for the context provider
        isEdited: Flag indicating if the context provider has been edited
        context: Context object for the context provider
    """

    @property
    def default_data(self) -> Optional[Any]:
        """Override in subclasses to provide default data."""
        return None

    @property
    def name_str(self) -> str:
        return self.name.value if hasattr(self.name, 'value') else str(self.name)

    @property
    def extra_data_key(self) -> str:
        return f"{self.name_str}ExtraData"

    @property
    def is_edited_key(self) -> str:
        return f"is{self.name_str}Edited"

    @property
    def is_unit_context_provider(self) -> bool:
        return self.entity_name == "unit"

    @property
    def is_subworkflow_context_provider(self) -> bool:
        return self.entity_name == "subworkflow"

    def _get_data_from_context(self, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        if not context:
            return {}
        data = context.get(self.name_str)
        is_edited = context.get(self.is_edited_key)
        extra_data = context.get(self.extra_data_key)
        result = {}
        if data is not None:
            result["data"] = data
        if is_edited is not None:
            result["is_edited"] = is_edited
        if extra_data is not None:
            result["extra_data"] = extra_data
        return result

    def _get_effective_data(self, context: Optional[Dict[str, Any]] = None) -> Any:
        context_data = self._get_data_from_context(context or self.context)
        effective_data = context_data.get("data", self.data)
        return effective_data if effective_data is not None else self.default_data

    def _get_effective_is_edited(self, context: Optional[Dict[str, Any]] = None) -> bool:
        context_data = self._get_data_from_context(context or self.context)
        return context_data.get("is_edited", self.is_edited)

    def _get_effective_extra_data(self, context: Optional[Dict[str, Any]] = None) -> Optional[Any]:
        context_data = self._get_data_from_context(context or self.context)
        return context_data.get("extra_data", self.extra_data)

    def yield_data(self, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        data = self._get_effective_data(context)
        is_edited = self._get_effective_is_edited(context)
        extra_data = self._get_effective_extra_data(context)
        result = {
            self.name_str: data,
            self.is_edited_key: is_edited,
        }
        if extra_data:
            result[self.extra_data_key] = extra_data
        return result

    def yield_data_for_rendering(self, context: Optional[Dict[str, Any]] = None) -> Dict[str, Any]:
        return self.yield_data(context)

    def merge_context_data(self, result: Dict[str, Any], provider_context: Optional[Dict[str, Any]] = None) -> None:
        """
        Merge this provider's rendering context data into result dictionary.
        Merges context keys if they are objects, otherwise overrides them.

        Args:
            result: Dictionary to merge into (modified in place)
            provider_context: Optional external context to override provider's internal data
        """
        context = self.yield_data_for_rendering(provider_context)
        for key, value in context.items():
            if key in result and isinstance(result[key], dict) and isinstance(value, dict):
                result[key] = {**result[key], **value}
            else:
                result[key] = value

    def get_data(self) -> Any:
        return self.data if self.data is not None else self.default_data
