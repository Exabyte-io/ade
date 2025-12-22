import json
import pytest
from mat3ra.ade import ContextProvider, Template
from mat3ra.esse.models.context_provider import Name
from mat3ra.utils import assertion

CONTEXT_PROVIDER_DEFAULT_FIELDS = {
    "domain": None,
    "entityName": None,
    "data": None,
    "extraData": None,
    "isEdited": None,
    "context": None,
}

TEMPLATE_DEFAULT_FIELDS = {
    "rendered": None,
    "applicationName": None,
    "applicationVersion": None,
    "executableName": None,
    "contextProviders": [],
    "isManuallyChanged": None,
    "schemaVersion": "2022.8.16",
    "systemName": None,
    "slug": None,
    "field_id": None,
}

CONFIG_MINIMAL = {
    "name": "pw_scf.in",
    "content": "&CONTROL\n/",
}

# snake_case and camelCase keys acceptable
CONFIG_FULL = {
    "name": "pw_scf.in",
    "content": "&CONTROL\n/",
    "rendered": "rendered",
    "applicationName": "espresso",
    "executable_name": "pw.x",
    "context_providers": [ContextProvider(name=Name.KGridFormDataManager)],
}

EXPECTED_MINIMAL = {
    "name": "pw_scf.in",
    "content": "&CONTROL\n/",
    **TEMPLATE_DEFAULT_FIELDS,
}

EXPECTED_FULL = {
    "name": "pw_scf.in",
    "content": "&CONTROL\n/",
    "rendered": "rendered",
    "applicationName": "espresso",
    "executableName": "pw.x",
    "contextProviders": [{"name": Name.KGridFormDataManager, **CONTEXT_PROVIDER_DEFAULT_FIELDS}],
    **{
        k: v
        for k, v in TEMPLATE_DEFAULT_FIELDS.items()
        if k not in ["rendered", "applicationName", "executableName", "contextProviders"]
    },
}

CONFIG_INVALID_EMPTY = {}
CONFIG_INVALID_NAME_ONLY = {"name": "test.in"}
CONFIG_INVALID_CONTENT_ONLY = {"content": "content"}

CONFIG_WITH_RENDERED = {
    "name": "test.in",
    "content": "original",
    "rendered": "rendered",
}

CONFIG_WITHOUT_RENDERED = {
    "name": "test.in",
    "content": "original",
}

CONFIG_JINJA_SIMPLE = {
    "name": "test.in",
    "content": "Hello {{ name }}!",
}

CONTEXT_JINJA_SIMPLE = {"name": "World"}
EXPECTED_RENDERED_JINJA_SIMPLE = "Hello World!"

CONFIG_WITH_PROVIDER_DATA = {
    "name": "test.in",
    "content": "Value: {{ KGridFormDataManager.value }}",
    "contextProviders": [ContextProvider(name=Name.KGridFormDataManager, data={"value": 42}, isEdited=True)],
}

EXPECTED_RENDERED_WITH_PROVIDER = "Value: 42"

CONFIG_MANUALLY_CHANGED = {
    "name": "test.in",
    "content": "Hello {{ name }}!",
    "isManuallyChanged": True,
}

CONFIG_SINGLE_PROVIDER = {
    "name": "test.in",
    "content": "test",
    "contextProviders": [
        ContextProvider(name=Name.KGridFormDataManager, data={"kgrid": "4 4 4"}, isEdited=True),
    ],
}

EXPECTED_SINGLE_PROVIDER = {
    "KGridFormDataManager": {"kgrid": "4 4 4"},
    "isKGridFormDataManagerEdited": True,
}

CONFIG_MULTIPLE_PROVIDERS = {
    "name": "test.in",
    "content": "test",
    "contextProviders": [
        ContextProvider(name=Name.KGridFormDataManager, data={"kgrid": "4 4 4"}, isEdited=True),
        ContextProvider(name=Name.KPathFormDataManager, data={"path": "G-X-L"}, isEdited=False),
    ],
}

EXPECTED_MULTIPLE_PROVIDERS = {
    "KGridFormDataManager": {"kgrid": "4 4 4"},
    "isKGridFormDataManagerEdited": True,
    "KPathFormDataManager": {"path": "G-X-L"},
    "isKPathFormDataManagerEdited": False,
}

CONFIG_OVERLAPPING_DICT_MERGE = {
    "name": "test.in",
    "content": "test",
    "contextProviders": [
        ContextProvider(name=Name.KGridFormDataManager, data={"spacing": 0.5, "shift": [0, 0, 0]}),
        ContextProvider(name=Name.KGridFormDataManager, data={"spacing": 0.3, "density": 10}),
    ],
}

EXPECTED_OVERLAPPING_DICT_MERGE = {
    "KGridFormDataManager": {"spacing": 0.3, "shift": [0, 0, 0], "density": 10},
    "isKGridFormDataManagerEdited": None,
}

PROVIDER_CONTEXT_OVERRIDE = {
    "KGridFormDataManager": {"override": "value"},
    "isKGridFormDataManagerEdited": True,
}

EXPECTED_WITH_OVERRIDE = {
    "KGridFormDataManager": {"override": "value"},
    "isKGridFormDataManagerEdited": True,
}

CONFIG_EXTERNAL_CONTEXT_TEST = {
    "name": "test.in",
    "content": "kpath: {{ KPathFormDataManager.key }}",
}

PROVIDER_KPATH = ContextProvider(name=Name.KPathFormDataManager, data={"default": "value"})

EXTERNAL_CONTEXT_KPATH = {
    "KPathFormDataManager": {"key": "external_value"},
    "isKPathFormDataManagerEdited": True,
}

EXPECTED_EXTERNAL_CONTEXT_RENDER = "kpath: external_value"

EXPECTED_RENDERED_DICT = {
    "name": "test.in",
    "content": "Hello {{ name }}!",
    "rendered": "Hello World!",
    **TEMPLATE_DEFAULT_FIELDS,
}


@pytest.mark.parametrize(
    "config,expected_fields",
    [
        (CONFIG_MINIMAL, EXPECTED_MINIMAL),
        (CONFIG_FULL, EXPECTED_FULL),
    ],
)
def test_template_creation(config, expected_fields):
    template = Template(**config)
    assertion.assert_deep_almost_equal(expected_fields, template.to_dict())


@pytest.mark.parametrize(
    "config",
    [
        CONFIG_INVALID_EMPTY,
        CONFIG_INVALID_NAME_ONLY,
        CONFIG_INVALID_CONTENT_ONLY,
    ],
)
def test_template_validation(config):
    with pytest.raises(Exception):
        Template(**config)


@pytest.mark.parametrize(
    "config,expected_output",
    [
        (CONFIG_WITH_RENDERED, "rendered"),
        (CONFIG_WITHOUT_RENDERED, "original"),
    ],
)
def test_get_rendered(config, expected_output):
    template = Template(**config)
    assert template.get_rendered() == expected_output


def test_set_content():
    template = Template(name="test.in", content="original")
    template.set_content("new content")
    assert template.content == "new content"


def test_set_rendered():
    template = Template(name="test.in", content="original")
    template.set_rendered("rendered")
    assert template.rendered == "rendered"


def test_add_context_provider():
    template = Template(name="test.in", content="content")
    provider = ContextProvider(name=Name.KGridFormDataManager)
    template.add_context_provider(provider)
    assert len(template.contextProviders) == 1
    assert template.contextProviders[0].name == Name.KGridFormDataManager


def test_remove_context_provider():
    provider1 = ContextProvider(name=Name.KGridFormDataManager, domain="test")
    provider2 = ContextProvider(name=Name.KPathFormDataManager, domain="test")
    template = Template(name="test.in", content="content", contextProviders=[provider1, provider2])
    template.remove_context_provider(provider1)
    assert len(template.contextProviders) == 1
    assert template.contextProviders[0].name == Name.KPathFormDataManager


@pytest.mark.parametrize(
    "config,context,expected_rendered",
    [
        (CONFIG_JINJA_SIMPLE, CONTEXT_JINJA_SIMPLE, EXPECTED_RENDERED_JINJA_SIMPLE),
        (CONFIG_WITH_PROVIDER_DATA, None, EXPECTED_RENDERED_WITH_PROVIDER),
        (CONFIG_MANUALLY_CHANGED, CONTEXT_JINJA_SIMPLE, None),
    ],
)
def test_render(config, context, expected_rendered):
    template = Template(**config)
    template.render(context)
    if expected_rendered is None:
        assert template.rendered is None
    else:
        assert expected_rendered in template.rendered or template.rendered == expected_rendered


@pytest.mark.parametrize(
    "config,context,expected",
    [
        (CONFIG_JINJA_SIMPLE, CONTEXT_JINJA_SIMPLE, EXPECTED_RENDERED_DICT),
    ],
)
def test_get_rendered_dict(config, context, expected):
    template = Template(**config)
    result = template.get_rendered_dict(context)
    assertion.assert_deep_almost_equal(expected, result)


@pytest.mark.parametrize(
    "config,context,expected_dict",
    [
        (CONFIG_JINJA_SIMPLE, CONTEXT_JINJA_SIMPLE, EXPECTED_RENDERED_DICT),
    ],
)
def test_get_rendered_json(config, context, expected_dict):
    template = Template(**config)
    result = template.get_rendered_json(context)
    assert isinstance(result, str)
    result_dict = json.loads(result)
    assertion.assert_deep_almost_equal(expected_dict, result_dict)


@pytest.mark.parametrize(
    "config,provider_context,expected",
    [
        (CONFIG_SINGLE_PROVIDER, None, EXPECTED_SINGLE_PROVIDER),
        (CONFIG_MULTIPLE_PROVIDERS, None, EXPECTED_MULTIPLE_PROVIDERS),
        (CONFIG_OVERLAPPING_DICT_MERGE, None, EXPECTED_OVERLAPPING_DICT_MERGE),
        (CONFIG_SINGLE_PROVIDER, PROVIDER_CONTEXT_OVERRIDE, EXPECTED_WITH_OVERRIDE),
    ],
)
def test_get_data_from_providers_for_rendering_context(config, provider_context, expected):
    template = Template(**config)
    result = template.get_data_from_providers_for_rendering_context(provider_context)
    assertion.assert_deep_almost_equal(expected, result)


def test_render_with_external_context_and_provider():
    template = Template(**CONFIG_EXTERNAL_CONTEXT_TEST)
    template.add_context_provider(PROVIDER_KPATH)
    template.render(EXTERNAL_CONTEXT_KPATH)
    assert template.get_rendered() == EXPECTED_EXTERNAL_CONTEXT_RENDER
