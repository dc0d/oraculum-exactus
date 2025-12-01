# Agent Instructions for oraculum-exactus

## Core Values & Workflow

When working on this codebase, uphold these principles:

- **Clarity**: Write code that is easy to understand and maintain
- **Consistency**: Follow existing patterns and conventions throughout the project
- **Accuracy**: Ensure all changes work correctly and don't introduce regressions

## Before Making Changes

1. **Study the codebase deeply** before proposing solutions

   - Examine related files and their dependencies
   - Understand how the change fits into the existing architecture
   - Review similar implementations in the codebase for patterns to follow

2. **Ask clarifying questions** when facing uncertainty

   - Don't make assumptions about requirements
   - Verify expected behavior with the developer
   - Confirm architectural decisions that impact multiple modules

3. **Stay in context** of the oraculum-exactus project
   - Reference existing implementations in this codebase
   - Use the project's established patterns and utilities
   - Don't suggest external libraries or patterns not already in use

## Validation Requirements

After **every** change you make:

1. **Build verification**:

   ```bash
   npm run build
   ```

   Ensure it completes without errors (TypeScript type-check, then esbuild bundle)

2. **Test verification**:
   ```bash
   npm test
   ```
   Ensure all tests pass with expected coverage (Jest, with coverage)

These are **non-negotiable** requirements. Do not skip these steps.

## Project-Specific Guidelines

### Architecture Understanding

- Oracle systems live in oracles with JSON data in oracles
- All randomization uses `randInt` from functions.ts
- Commands are managed in `COMMANDS_LIST` in suggester.ts
- Trigger string is stored as `trigger` in settings (see src/settings/definitions.ts)
- Debug logging is always enabled via `logger` utility

### Code Style

- Follow TypeScript 5.x / ES2022 patterns
- Use kebab-case for filenames (`example-file.ts`)
- PascalCase for classes/interfaces, camelCase for functions/variables
- Favor pure functions and immutable data
- Keep functions focused and single-purpose

### Adding Features

**New Oracle System**:

1. Create directory under oracles
2. Implement class similar to `ClassicOracles` or `ImmersionOracles`
3. Add JSON data file to oracles
4. Follow constructor pattern with default inputs
5. Add comprehensive tests

**New Command**:

1. Update `COMMANDS_LIST` in suggester.ts
2. Add handler logic in selection_handler.ts
3. Add formatter support in selection_formatter.ts if needed
4. Write tests for the new command

### Testing Expectations

- Write unit tests for all new functionality
- Follow existing test patterns (see functions.test.ts, src/oracles/datasworn/index.test.ts)
- Use `createRandFn` from index.ts for deterministic random values
- Test edge cases and error conditions
- Maintain or improve code coverage

## Communication Style

- Explain your reasoning when proposing changes
- Document trade-offs when multiple approaches exist
- Provide context for why a particular pattern was chosen
- Flag potential issues or concerns proactively

## References

- See copilot-instructions.md for architecture overview
- Review ts.instructions.md for TypeScript guidelines
- Check README.md for workflow diagrams and user documentation
