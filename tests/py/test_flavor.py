from mat3ra.ade import Flavor, FlavorInput
from mat3ra.utils import assertion

FLAVOR_INPUT_MINIMAL_CONFIG = {
    "name": "input.in",
}

FLAVOR_INPUT_FULL_CONFIG = {
    "templateId": "tmpl_123",
    "templateName": "pw_scf",
    "name": "pw_scf.in",
}

FLAVOR_MINIMAL_CONFIG = {
    "name": "scf",
    "executableId": "exe_123",
}

FLAVOR_FULL_CONFIG = {
    "name": "scf",
    "executableId": "exe_123",
    "executableName": "pw.x",
    "applicationName": "espresso",
    "input": [FlavorInput(name="pw_scf.in", templateName="pw_scf")],
    "supportedApplicationVersions": ["7.0", "7.1", "7.2"],
    "isDefault": True,
    "schemaVersion": "1.0.0",
    "preProcessors": [{"name": "prep1"}],
    "postProcessors": [{"name": "post1"}],
    "monitors": [{"name": "convergence"}],
    "results": [{"name": "total_energy"}],
}

FLAVOR_TO_DICT_CONFIG = {
    "name": "scf",
    "executableId": "exe_123",
    "executableName": "pw.x",
    "applicationName": "espresso",
}

FLAVOR_FROM_DICT_CONFIG = {
    "name": "scf",
    "executableId": "exe_123",
    "executableName": "pw.x",
    "applicationName": "espresso",
    "input": [{"name": "pw_scf.in", "templateName": "pw_scf"}],
    "supportedApplicationVersions": ["7.0", "7.1"],
}

FLAVOR_WITH_EXTRA_FIELDS_CONFIG = {
    "name": "scf",
    "executableId": "exe_123",
    "custom_field": "custom_value",
}

EXPECTED_FLAVOR_TO_DICT = {
    "executableId": "exe_123",
    "executableName": "pw.x",
    "applicationName": "espresso",
    "input": [],
    "schemaVersion": "2022.8.16",
    "name": "scf",
    "isDefault": False,
}


def test_flavor_input_creation():
    config = FLAVOR_INPUT_MINIMAL_CONFIG
    input_obj = FlavorInput(**config)
    expected = {**config}
    assertion.assert_deep_almost_equal(expected, input_obj.model_dump(exclude_unset=True))


def test_flavor_input_with_all_fields():
    config = FLAVOR_INPUT_FULL_CONFIG
    input_obj = FlavorInput(**config)
    expected = {**config}
    assertion.assert_deep_almost_equal(expected, input_obj.model_dump(exclude_unset=True))


def test_flavor_creation():
    config = FLAVOR_MINIMAL_CONFIG
    flavor = Flavor(**config)
    expected = {**config}
    assertion.assert_deep_almost_equal(expected, flavor.model_dump(exclude_unset=True))


def test_flavor_with_all_fields():
    config = FLAVOR_FULL_CONFIG
    flavor = Flavor(**config)
    expected = {
        **config,
        "input": [{"name": "pw_scf.in", "templateName": "pw_scf"}],
    }
    assertion.assert_deep_almost_equal(flavor.model_dump(exclude_unset=True), expected)


def test_flavor_to_dict():
    config = FLAVOR_TO_DICT_CONFIG
    flavor = Flavor(**config)
    assertion.assert_deep_almost_equal(EXPECTED_FLAVOR_TO_DICT, flavor.to_dict())



def test_flavor_from_dict():
    config = FLAVOR_FROM_DICT_CONFIG
    flavor = Flavor(**config)
    expected = {**config}
    assertion.assert_deep_almost_equal(expected, flavor.model_dump(exclude_unset=True))


def test_flavor_with_extra_fields():
    config = FLAVOR_WITH_EXTRA_FIELDS_CONFIG
    flavor = Flavor(**config)
    assert flavor.name == "scf"
    assert hasattr(flavor, "custom_field")
    assert flavor.custom_field == "custom_value"
    assert "custom_field" in flavor.to_dict()
