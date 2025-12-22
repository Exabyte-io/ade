from pydantic import Field

from .context_provider import ContextProvider


class JinjaContextProvider(ContextProvider):
    is_using_jinja_variables: bool = Field(
        default=False, description="Whether this provider uses Jinja variables"
    )
