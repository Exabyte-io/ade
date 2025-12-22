[![npm version](https://badge.fury.io/js/%40mat3ra%2Fade.svg)](https://badge.fury.io/js/%40mat3ra%2Fade)
[![License: Apache](https://img.shields.io/badge/License-Apache-blue.svg)](https://www.apache.org/licenses/LICENSE-2.0)

# ade

Application DEfinitions package. Houses the definitions for:

- `Application` - uniquely determined by `name, [version], [build]`
- `Executable` - defined for a given application and accessible from application by name
- `Flavor` - defined for a given executable and accessible from executable by name
- `Template` - a jinja template for an application input file

The relevant data parameterizing supported entities is housed in the
[Standata](https://github.com/Exabyte-io/standata) repository.


## Installation

For usage within a JavaScript project:

```bash
npm install @mat3ra/ade
```

For usage within a Python project:

```bash
pip install mat3ra-ade
```

For development:

```bash
git clone https://github.com/Exabyte-io/ade.git
```


## Contributions

This repository is an [open-source](LICENSE.md) work-in-progress and we welcome contributions.

We regularly deploy the latest code containing all accepted contributions online as part of the
[Mat3ra.com](https://mat3ra.com) platform, so contributors will see their code in action there.

See [ESSE](https://github.com/Exabyte-io/esse) for additional context regarding the data schemas used here.

Useful commands for development:

### JavaScript/TypeScript
```bash
# run linter without persistence
npm run lint

# run linter and save edits
npm run lint:fix

# compile the library
npm run transpile

# run tests
npm run test

# run tests with coverage
npm run test:coverage

# run tests with coverage and check thresholds
npm run test:coverage:check

# generate HTML coverage report
npm run test:coverage:html
```

### Python
```bash
# run linter
python -m black src/py/mat3ra/ade/ tests/py/
python -m ruff check src/py/mat3ra/ade/ tests/py/
python -m isort src/py/mat3ra/ade/ tests/py/

# run tests
python -m pytest tests/py/

# run tests with coverage
python -m pytest tests/py/ --cov=mat3ra.ade --cov-report=html
```

## Development: Code/Test Coverage

This project includes comprehensive code coverage reporting with multiple viewing options:

### Local Coverage
- Run `npm run test:coverage:html` to generate an HTML coverage report locally
- Open `coverage/index.html` in your browser to view the report

### GitHub Integration
The project uses GitHub Actions to automatically generate and display coverage reports:

1. **PR Coverage Comments**: Every pull request automatically gets a coverage report comment showing:
   - Overall coverage percentages
   - Coverage changes compared to the base branch
   - Detailed file-by-file coverage breakdown

2. **Coverage Artifacts**: Coverage reports are uploaded as GitHub artifacts for each PR and commit
   - Download from the Actions tab in GitHub
   - Available for 30 days for main branch, 7 days for PRs

3. **GitHub Pages** (Optional): Coverage reports are published to GitHub Pages for easy browser viewing
   - Available at: `https://exabyte-io.github.io/ade/`
   - Updated on every push to main branch

### Coverage Thresholds
The project enforces minimum coverage thresholds:
- **Statements**: 85%
- **Branches**: 80%
- **Functions**: 80%
- **Lines**: 85%

### External Coverage Services
- **Codecov**: Coverage data is automatically uploaded to Codecov for historical tracking and trend analysis
