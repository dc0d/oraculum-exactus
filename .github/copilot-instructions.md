# Copilot Instructions for oraculum-exactus

## Project Overview

This Obsidian plugin generates and suggests RPG oracle results, supporting multiple oracle systems (Datasworn, Immersion, Ironsworn, etc.). The architecture is modular: each oracle system lives in its own directory under oracles and loads data from JSON files in oracles.

## Architecture & Data Flow

- **main.ts**: Entry point. Registers the plugin, manages settings, and integrates oracle and suggestion logic.
- **src/oracles/**: Each subdirectory (e.g., `datasworn`, `immersion`) implements an oracle system. Classes (e.g., `ClassicOracles`, `ImmersionOracles`) expose methods for rolling and retrieving results, using data from corresponding JSON files.
- **src/handlers/**: Contains command suggestion (suggester.ts), selection handling, and trigger logic. The suggestion system matches user input to available commands.
- **src/dice/**: Dice parsing and rolling utilities. All randomization uses `randInt` from functions.ts.
- **index.ts**: Settings are managed via the `Settings` interface and `getDefaultSettings()`. The trigger string for command activation is stored as `trigger` in settings, defaulting to `.\\`.
- **logger.ts**: Debug logging is always enabled via the `logger` utility.

## Developer Workflows

- **Build**: `npm run build` (TypeScript type-check, then esbuild bundle)
- **Dev**: `npm run dev` (esbuild in dev mode)
- **Test**: `npm test` (Jest, with coverage)
- **Test Watch**: `npm run test:watch`

## Project Conventions & Patterns

- Oracle classes expect their data and random function as constructor arguments, but default to built-in values.
- All randomization is centralized via `randInt` in functions.ts.
- The command trigger string is set in settings as `trigger` (not `beginTrigger`).
- Oracle data must be present in oracles and match the expected schema.
- All plugin logic is CommonJS-bundled for Obsidian compatibility.
- To add a new oracle: create a new directory under oracles, implement a class similar to `ClassicOracles` or `ImmersionOracles`, and provide a matching JSON data file.
- To add a new suggestion command: update `COMMANDS_LIST` in suggester.ts.

## Integration Points & External Dependencies

- Relies on Obsidian API, esbuild, Jest, TypeScript.
- Oracle data is loaded from JSON files (e.g., classic.json).
- All plugin logic is bundled as CommonJS for Obsidian.

## Examples & Key Files

- main.ts: Plugin registration, settings management, and integration
- datasworn, immersion: Oracle implementations
- suggester.ts: Command suggestion logic
- roller.ts: Dice rolling logic
- index.ts: Settings and trigger configuration
- logger.ts: Debug logging utility

## References

- See README.md for a flowchart of the suggestion workflow.
- selection_handler.ts for command execution patterns.
- trigger_handler.ts for trigger parsing logic.
