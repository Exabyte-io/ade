from mat3ra.ade import Application
from mat3ra.utils import assertion

APPLICATION_DEFAULT_FIELDS = {
    "shortName": None,
    "summary": None,
    "build": None,
    "hasAdvancedComputeOptions": None,
    "isLicensed": None,
    "field_id": None,
    "slug": None,
    "systemName": None,
    "schemaVersion": "2022.8.16",
    "isDefault": False,
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
    vasp = Application(name="vasp")
    assert vasp.is_using_material is True

    nwchem = Application(name="nwchem")
    assert nwchem.is_using_material is True

    espresso = Application(name="espresso")
    assert espresso.is_using_material is True

    other = Application(name="other_app")
    assert other.is_using_material is False


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
    }
    assertion.assert_deep_almost_equal(expected, app.to_dict())


def test_application_from_dict():
    config = APPLICATION_FROM_DICT_CONFIG
    app = Application(**config)
    expected = {**config}
    assertion.assert_deep_almost_equal(expected, app.model_dump(exclude_unset=True))
