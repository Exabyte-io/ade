import json
from pathlib import Path

from mat3ra.ade import Application
from mat3ra.standata.applications import ApplicationStandata
from mat3ra.utils import assertion

APPLICATION_DEFAULT_FIELDS = {
    "schemaVersion": "2022.8.16",
    "isDefault": False,
    "shortName": "",
    "summary": "",
    "build": "",
}

APPLICATION_MINIMAL_CONFIG = {
    "name": "espresso",
}

APPLICATION_FULL_CONFIG = {
    "name": "vasp",
    "version": "5.4.4",
    "build": "standard",
    "shortName": "VASP",
    "summary": "Vienna Ab initio Simulation Package",
    "hasAdvancedComputeOptions": True,
    "isLicensed": True,
    "isDefault": True,
    "schemaVersion": "1.0.0",
}

APPLICATION_WITH_VERSION_CONFIG = {
    "name": "espresso",
    "version": "7.2",
}

APPLICATION_FROM_DICT_CONFIG = {
    "name": "espresso",
    "version": "7.2",
    "build": "openmpi",
    "shortName": "QE",
}


def test_application_creation():
    config = APPLICATION_MINIMAL_CONFIG
    app = Application(**config)
    expected = {**config}
    assertion.assert_deep_almost_equal(expected, app.model_dump(exclude_unset=True))


def test_application_with_all_fields():
    config = APPLICATION_FULL_CONFIG
    app = Application(**config)
    expected = {**config}
    assertion.assert_deep_almost_equal(expected, app.model_dump(exclude_unset=True))


def test_is_using_material_property():
    apps_using_material = [
        "deepmd",
        "espresso",
        "lammps",
        "nwchem",
        "python",
        "vasp",
    ]
    for name in apps_using_material:
        config = next(iter(ApplicationStandata.get_by_name(name)))
        assert Application(**config).is_using_material is True
    assert Application(name="other_app").is_using_material is False


def test_get_short_name():
    app_with_short = Application(name="espresso", shortName="QE")
    assert app_with_short.get_short_name() == "QE"

    app_without_short = Application(name="espresso")
    assert app_without_short.get_short_name() == "espresso"


def test_application_to_dict():
    config = APPLICATION_WITH_VERSION_CONFIG
    app = Application(**config)
    expected = {
        **APPLICATION_DEFAULT_FIELDS,
        **config,
        "isUsingMaterial": False,
    }
    assertion.assert_deep_almost_equal(expected, app.to_dict())


def test_application_from_dict():
    config = APPLICATION_FROM_DICT_CONFIG
    app = Application(**config)
    expected = {**config}
    assertion.assert_deep_almost_equal(expected, app.model_dump(exclude_unset=True))


def test_calculate_hash_matches_fixture():
    fixture_path = Path(__file__).parent.parent / "fixtures" / "application_hash.json"
    fixture = json.loads(fixture_path.read_text())

    st = fixture["standata"]
    [config] = [
        a
        for a in ApplicationStandata.get_by_name(st["name"])
        if a.get("version") == st["version"] and a.get("build") == st["build"]
    ]
    app = Application(**config)
    assert app.calculate_hash() == fixture["hash"]
