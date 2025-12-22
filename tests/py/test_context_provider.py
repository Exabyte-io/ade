import pytest
from mat3ra.ade import ContextProvider
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

CONTEXT_PROVIDER_MINIMAL_CONFIG = {
    "name": Name.KGridFormDataManager,
}

CONTEXT_PROVIDER_FULL_CONFIG = {
    "name": Name.KGridFormDataManager,
    "domain": "test_domain",
    "entityName": "subworkflow",
    "data": {"key": "value"},
    "extraData": {"extraKey": "extraValue"},
    "isEdited": True,
    "context": {"contextKey": "contextValue"},
}

CONTEXT_PROVIDER_WITH_DEFAULT_DATA = {
    "name": Name.KPathFormDataManager,
    "data": {"default": "value"},
    "isEdited": False,
    "extraData": {"extra": "data"},
}

EXTERNAL_CONTEXT_OVERRIDE = {
    "KPathFormDataManager": {"override": "value"},
    "isKPathFormDataManagerEdited": True,
    "KPathFormDataManagerExtraData": {"extra_override": "data"},
}

CONTEXT_PROVIDER_WITH_STORED_CONTEXT = {
    "name": Name.KPathFormDataManager,
    "data": {"default": "value"},
    "isEdited": False,
    "context": {
        "KPathFormDataManager": {"stored": "value"},
        "isKPathFormDataManagerEdited": True,
    },
}

EXPECTED_YIELD_DATA_WITH_STORED = {
    "KPathFormDataManager": {"stored": "value"},
    "isKPathFormDataManagerEdited": True,
}

PROVIDER_FOR_MERGE_DICT = ContextProvider(
    name=Name.KGridFormDataManager, data={"spacing": 0.5, "shift": [0, 0, 0]}
)

PROVIDER_FOR_MERGE_OVERRIDE = ContextProvider(
    name=Name.KGridFormDataManager, data={"spacing": 0.3, "density": 10}
)

RESULT_BEFORE_MERGE_DICT = {
    "KGridFormDataManager": {"spacing": 0.5, "shift": [0, 0, 0]},
    "isKGridFormDataManagerEdited": None,
}

EXPECTED_AFTER_MERGE_DICT = {
    "KGridFormDataManager": {"spacing": 0.3, "shift": [0, 0, 0], "density": 10},
    "isKGridFormDataManagerEdited": None,
}

PROVIDER_FOR_MERGE_NON_DICT = ContextProvider(
    name=Name.KPathFormDataManager, data={"path": "G-X-L"}, isEdited=False
)

RESULT_BEFORE_MERGE_NON_DICT = {
    "KGridFormDataManager": {"kgrid": "4 4 4"},
    "isKGridFormDataManagerEdited": True,
}

EXPECTED_AFTER_MERGE_NON_DICT = {
    "KGridFormDataManager": {"kgrid": "4 4 4"},
    "isKGridFormDataManagerEdited": True,
    "KPathFormDataManager": {"path": "G-X-L"},
    "isKPathFormDataManagerEdited": False,
}

PROVIDER_CONTEXT_FOR_MERGE = {
    "KGridFormDataManager": {"override": "value"},
    "isKGridFormDataManagerEdited": True,
}

RESULT_BEFORE_MERGE_WITH_CONTEXT = {}

EXPECTED_AFTER_MERGE_WITH_CONTEXT = {
    "KGridFormDataManager": {"override": "value"},
    "isKGridFormDataManagerEdited": True,
}

CONTEXT_PROVIDER_FOR_GET_DATA = {
    "name": Name.KPathFormDataManager,
    "data": {"default": "value"},
    "isEdited": False,
    "context": {
        "KPathFormDataManager": {"stored": "value"},
        "isKPathFormDataManagerEdited": True,
        "KPathFormDataManagerExtraData": {"extra_stored": "data"},
    },
}

EXTERNAL_CONTEXT_FOR_GET_DATA = {
    "KPathFormDataManager": {"override": "value"},
    "isKPathFormDataManagerEdited": False,
    "KPathFormDataManagerExtraData": {"extra_override": "data"},
}

EXPECTED_DATA_FROM_GET_DATA = {
    "data": {"override": "value"},
    "is_edited": False,
    "extra_data": {"extra_override": "data"},
}


def test_creation():
    config = CONTEXT_PROVIDER_MINIMAL_CONFIG
    provider = ContextProvider(**config)
    expected = {
        **config,
        **CONTEXT_PROVIDER_DEFAULT_FIELDS,
    }
    assertion.assert_deep_almost_equal(expected, provider.to_dict())


def test_validation():
    with pytest.raises(Exception):
        ContextProvider()


def test_full_creation():
    config = CONTEXT_PROVIDER_FULL_CONFIG
    provider = ContextProvider(**config)
    expected = {**config}
    assertion.assert_deep_almost_equal(expected, provider.to_dict())


def test_default_values():
    config = CONTEXT_PROVIDER_MINIMAL_CONFIG
    provider = ContextProvider(**config)
    expected = {
        **config,
        **CONTEXT_PROVIDER_DEFAULT_FIELDS,
    }
    assertion.assert_deep_almost_equal(expected, provider.to_dict())


def test_extra_data_key():
    provider = ContextProvider(name=Name.KPathFormDataManager)
    assert provider.extra_data_key == "KPathFormDataManagerExtraData"


def test_is_edited_key():
    provider = ContextProvider(name=Name.KPathFormDataManager)
    assert provider.is_edited_key == "isKPathFormDataManagerEdited"


def test_is_unit_context_provider():
    unit_provider = ContextProvider(name=Name.KGridFormDataManager, entityName="unit")
    assert unit_provider.is_unit_context_provider is True
    subworkflow_provider = ContextProvider(name=Name.KGridFormDataManager, entityName="subworkflow")
    assert subworkflow_provider.is_unit_context_provider is False


def test_is_subworkflow_context_provider():
    unit_provider = ContextProvider(name=Name.KGridFormDataManager, entityName="unit")
    assert unit_provider.is_subworkflow_context_provider is False
    subworkflow_provider = ContextProvider(name=Name.KGridFormDataManager, entityName="subworkflow")
    assert subworkflow_provider.is_subworkflow_context_provider is True


def test_yield_data_with_external_context():
    provider = ContextProvider(**CONTEXT_PROVIDER_WITH_DEFAULT_DATA)
    external_context = EXTERNAL_CONTEXT_OVERRIDE
    result = provider.yield_data_for_rendering(external_context)
    assertion.assert_deep_almost_equal(external_context, result)


def test_yield_data_with_stored_context():
    provider = ContextProvider(**CONTEXT_PROVIDER_WITH_STORED_CONTEXT)
    result = provider.yield_data_for_rendering()
    expected = EXPECTED_YIELD_DATA_WITH_STORED
    assertion.assert_deep_almost_equal(expected, result)


@pytest.mark.parametrize(
    "provider,result_before,provider_context,expected_after",
    [
        (
            PROVIDER_FOR_MERGE_OVERRIDE,
            RESULT_BEFORE_MERGE_DICT,
            None,
            EXPECTED_AFTER_MERGE_DICT,
        ),
        (
            PROVIDER_FOR_MERGE_NON_DICT,
            RESULT_BEFORE_MERGE_NON_DICT,
            None,
            EXPECTED_AFTER_MERGE_NON_DICT,
        ),
        (
            PROVIDER_FOR_MERGE_DICT,
            RESULT_BEFORE_MERGE_WITH_CONTEXT,
            PROVIDER_CONTEXT_FOR_MERGE,
            EXPECTED_AFTER_MERGE_WITH_CONTEXT,
        ),
    ],
)
def test_merge_context_data(provider, result_before, provider_context, expected_after):
    result = result_before.copy()
    provider.merge_context_data(result, provider_context)
    assertion.assert_deep_almost_equal(expected_after, result)


def test_get_data():
    provider = ContextProvider(**CONTEXT_PROVIDER_FOR_GET_DATA)
    data = provider._get_data_from_context(EXTERNAL_CONTEXT_FOR_GET_DATA)
    assertion.assert_deep_almost_equal(EXPECTED_DATA_FROM_GET_DATA, data)
