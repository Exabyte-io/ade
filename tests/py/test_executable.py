from mat3ra.ade import Executable
from mat3ra.utils import assertion

EXECUTABLE_MINIMAL_CONFIG = {
    "name": "pw.x",
}

EXECUTABLE_FULL_CONFIG = {
    "name": "pw.x",
    "applicationName": "espresso",
    "applicationVersion": "7.2",
    "hasAdvancedComputeOptions": True,
    "isDefault": True,
    "schemaVersion": "1.0.0",
    "preProcessors": [{"name": "prep1"}],
    "postProcessors": [{"name": "post1"}],
    "monitors": [{"name": "mon1"}],
    "results": [{"name": "res1"}],
}

EXECUTABLE_TO_DICT_CONFIG = {
    "name": "pw.x",
    "applicationName": "espresso",
    "applicationVersion": "7.2",
}

EXECUTABLE_FROM_DICT_CONFIG = {
    "name": "pw.x",
    "applicationName": "espresso",
    "applicationVersion": "7.2",
    "isDefault": True,
    "monitors": [{"name": "convergence"}],
    "results": [{"name": "total_energy"}],
}


def test_executable_creation():
    config = EXECUTABLE_MINIMAL_CONFIG
    executable = Executable(**config)
    expected = {**config}
    assertion.assert_deep_almost_equal(expected, executable.model_dump(exclude_unset=True))


def test_executable_defaults_runtime_item_lists_when_omitted():
    executable = Executable(
        name="espresso",
        applicationName="espresso",
        applicationVersion="6.3",
    )
    assert executable.monitors == []
    assert executable.results == []
    assert executable.postProcessors == []
    assert executable.preProcessors == []


def test_executable_with_all_fields():
    config = EXECUTABLE_FULL_CONFIG
    executable = Executable(**config)
    expected = {**config}
    assertion.assert_deep_almost_equal(expected, executable.model_dump(exclude_unset=True))


def test_executable_application_name_setter():
    executable = Executable(name="pw.x")
    assert executable.applicationName == ""

    executable.applicationName = "espresso"
    assert executable.applicationName == "espresso"


def test_executable_to_dict():
    config = EXECUTABLE_TO_DICT_CONFIG
    executable = Executable(**config)
    expected = {**config}
    assertion.assert_deep_almost_equal(expected, executable.model_dump(exclude_unset=True))


def test_executable_from_dict():
    config = EXECUTABLE_FROM_DICT_CONFIG
    executable = Executable(**config)
    expected = {**config}
    assertion.assert_deep_almost_equal(expected, executable.model_dump(exclude_unset=True))
