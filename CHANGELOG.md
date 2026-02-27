# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [0.2.0] - 2026-02-27

### Added
- Rocket Management API with full CRUD operations
  - `POST /rockets` - Create a new rocket
  - `GET /rockets` - List all rockets
  - `GET /rockets/:id` - Get a specific rocket by ID
  - `PUT /rockets/:id` - Update an existing rocket
  - `DELETE /rockets/:id` - Delete a rocket
- Comprehensive input validation for rocket attributes:
  - `name` (required, non-empty string)
  - `range` (required, one of: suborbital, orbital, moon, mars)
  - `capacity` (required, integer between 1 and 10)
- Modular architecture with separation of concerns:
  - `rockets.types.ts` - Type definitions
  - `rockets.validation.ts` - Input validation logic
  - `rockets.store.ts` - Data persistence layer
  - `rockets.service.ts` - Business logic
  - `rockets.router.ts` - HTTP endpoints
- End-to-end test suite covering all acceptance criteria
- Centralized app configuration through `app.ts` factory

### Changed
- Refactored entry point (`src/index.ts`) to use app factory pattern
- Implemented scalable module structure for future API additions

### Technical
- **Architecture**: Modular pattern with typed layers
- **Framework**: Express.js with TypeScript
- **Validation**: Strict input validation with detailed error messages
- **Storage**: In-memory store (ready for database integration)
- **Testing**: Playwright e2e tests with full scenario coverage

## [0.1.0] - 2026-02-25

### Added
- Initial project setup with Node.js and TypeScript
- Express.js API framework
- Health check endpoint (`GET /health`)
- Playwright test infrastructure
