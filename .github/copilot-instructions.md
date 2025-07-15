# Repo Instructions

## Testing

Any feature addition requires thorough testing.
Use Test-Driven Development (TDD) to guide implementation wherever applicable.
All new code should be accompanied by appropriate unit test.

## Performance

Performance is absolutely critical to this project.
If you modify any application logic, you MUST run benchmarks both before and after your changes.
Ensure that performance has not been negatively impacted.
Document benchmark results in your pull request description.

## Commit Style

All commits in this repository MUST follow the [Conventional Commits](https://www.conventionalcommits.org/en/v1.0.0/) specification.
Commits are used to automatically release new versions using `release-it`.

- If you change repository setup, CI flows, or similar meta-configuration, use the `build:` or `ci:` prefix — this prevents a new release from being triggered.
- The `Initial Plan` commit must be prefixed with `docs:`.

**Examples:**

- `feat: add user authentication module`
- `fix: resolve API response error`
- `ci: update workflow for test coverage`
- `build: update dependencies`
- `docs: initial plan`
