from typing import Optional, Dict, Any

from pydantic import Field

from .jinja_context_provider import JinjaContextProvider


class JSONSchemaDataProvider(JinjaContextProvider):
    json_schema: Optional[Dict[str, Any]] = Field(default=None, description="JSON schema for this provider")
