# Space Travel Bookings (AstroBookings)

A **backend API** for managing and booking rocket launches.

This application was created with GitHub Copilot for training purposes on how to apply Generative AI in SDLC and understand concepts as Pronpts, Instructions, Agents and Skillss.

## Features

### Rocket Management API (v0.2.0+)
Complete CRUD operations for managing rocket inventory:
- **Create**: Register new rockets with specified capacity and range
- **Read**: List all rockets or retrieve details for a specific rocket
- **Update**: Modify rocket specifications
- **Delete**: Remove rockets from inventory

**Available Endpoints:**
- `POST /rockets` - Create a new rocket
- `GET /rockets` - List all rockets
- `GET /rockets/:id` - Get a specific rocket by ID
- `PUT /rockets/:id` - Update an existing rocket
- `DELETE /rockets/:id` - Delete a rocket

**Rocket Attributes:**
- `name` (string) - Rocket name
- `range` (enum) - One of: suborbital, orbital, moon, mars
- `capacity` (integer) - Passenger capacity: 1-10

**Validation:**
All input is validated for required fields, allowed range values, and capacity limits. Invalid requests return detailed error messages.

### Launch Bookings (Planned)
- Launches scheduled for specific rockets, with pricing and minimum passenger thresholds
- Rocket capacity validation against booking requests
- Launch status lifecycle: scheduled → confirmed → successful
- Customer management with email, name, and phone
- Multi-seat booking with capacity enforcement
- Payment processing through mock gateway

### Health Check
- `GET /health` - API health status endpoint

## Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development
```bash
npm run dev
```
Server runs on `http://localhost:3000` (default)

### Build
```bash
npm run build
```

### Testing
```bash
npm test
```
Runs Playwright e2e test suite covering all acceptance criteria.

## Architecture

### Project Structure
```
src/
├── index.ts              # Entry point / server startup
├── app.ts                # App factory and middleware setup
└── modules/
    └── rockets/
        ├── rockets.types.ts        # TypeScript type definitions
        ├── rockets.validation.ts   # Input validation logic
        ├── rockets.store.ts        # Data store (in-memory)
        ├── rockets.service.ts      # Business logic layer
        └── rockets.router.ts       # HTTP routes
specs/
└── rockets.spec.md       # Feature specification
tests/
├── health.spec.ts        # Health endpoint tests
└── rockets.spec.ts       # Rocket API e2e tests
prompts/
├── rockets.spec.prompt.md   # Specification generation prompt
├── rockets.code.prompt.md   # Implementation prompt
└── rockets.release.prompt.md # Release checklist prompt
```

### Design Patterns
- **Modular Architecture**: Each API feature is self-contained with clear layer separation
- **Service Layer**: Business logic separated from HTTP handling
- **Typed Validation**: TypeScript types with runtime validation
- **Router Pattern**: Express Router for scalable endpoint management
- **Factory Pattern**: App initialization through factory function

### Validation Strategy
Input validation happens at the service layer before data persistence, ensuring:
- Required fields are present
- Values conform to allowed constraints
- Clear, actionable error messages for clients

## Development Workflow

### Adding a New API Module
1. Create a new folder under `src/modules/{feature_name}/`
2. Implement files following the rocket module structure:
   - `{feature}.types.ts` - Type definitions
   - `{feature}.validation.ts` - Input validation
   - `{feature}.store.ts` - Data persistence
   - `{feature}.service.ts` - Business logic
   - `{feature}.router.ts` - HTTP routes
3. Register the router in `src/app.ts`
4. Add e2e tests in `tests/{feature}.spec.ts`

## Vibe Coding Process

This project uses AI-assisted development with structured prompts to guide implementation from specification to release.

### Specification Foundation

**[specs/rockets.spec.md](specs/rockets.spec.md)** is the single source of truth for the Rocket Management API feature.

#### Content & Purpose

The specification defines requirements across three dimensions:

1. **Problem Description** - User stories from three perspectives:
   - Operations manager: Manage rocket records for booking accuracy
   - Booking agent: View rocket details for customer matching
   - System integrator: Validate inputs for downstream reliability

2. **Solution Overview** - Architectural approach across three layers:
   - **Application**: CRUD endpoints with consistent JSON responses
   - **Logic**: Field validation, enum constraints, capacity limits, clear error messages
   - **Infrastructure**: In-memory storage with standard logging (ready for database upgrade)

3. **Acceptance Criteria** - 9 testable scenarios in Gherkin format:
   - **Happy path**: Create rockets, list, retrieve by ID, update, delete
   - **Validation**: Reject missing name, invalid range, invalid capacity
   - **Error handling**: Return 404 for non-existent rockets
   - **Data integrity**: Persist changes and confirm operations

#### Purpose in Development

- **Blueprint**: Guides implementation of [src/modules/rockets/](src/modules/rockets/)
- **Test Coverage**: Each acceptance criterion maps to e2e tests in [tests/rockets.spec.ts](tests/rockets.spec.ts)
- **Quality Gate**: Release checklist verifies all scenarios pass before deployment

### Prompt-Driven Workflow

Starting from [specs/rockets.spec.md](specs/rockets.spec.md), the development process uses three complementary prompts:

1. **[prompts/rockets.spec.prompt.md](prompts/rockets.spec.prompt.md)** - Specification Generation
   - Converts requirements into detailed specifications
   - Uses Gherkin format for acceptance criteria
   - Output: `specs/rockets.spec.md`

2. **[prompts/rockets.code.prompt.md](prompts/rockets.code.prompt.md)** - Implementation
   - Generates modular code following architectural patterns
   - Creates typed layers: types, validation, store, service, router
   - Output: Feature modules under `src/modules/`

3. **[prompts/rockets.release.prompt.md](prompts/rockets.release.prompt.md)** - Release Management
   - Verifies implementation with e2e tests
   - Updates documentation and version numbers
   - Creates git tags and manages merges
   - Output: Versioned release on `main` branch

4. **[.agents/prompts/create-agents.prompt.md](.agents/prompts/create-agents.prompt.md)** - AI Agent Instructions
   - Generates project documentation for AI agents
   - Summarizes tech stack, workflow, and folder structure
   - Provides concise reference for AI-assisted development
   - Output: `AGENTS.md` at project root

### AI Agent Skills

Skills extend AI agent capabilities for specific tasks:

- **[.github/skills/commit-changes/SKILL.md](.github/skills/commit-changes/SKILL.md)** - Commit Management
  - Handles staging and committing code changes
  - Follows [conventional commits](https://www.conventionalcommits.org/) format
  - Supports grouping related changes and meaningful commit messages
  - Reference: [.github/skills/commit-changes/conventional-commits.md](.github/skills/commit-changes/conventional-commits.md)

### Development Cycle

```
Requirements
    ↓
[spec.prompt] → specs/{feature}.spec.md
    ↓
[code.prompt] → src/modules/{feature}/
    ↓
[release.prompt] → tests + docs + git tag
    ↓
v{version} deployed to main
```

## API Response Format

### Success Response
```json
{
  "id": "1",
  "name": "Orion",
  "range": "moon",
  "capacity": 4
}
```

### Validation Error
```json
{
  "error": "validation_error",
  "details": ["name is required", "capacity must be between 1 and 10"]
}
```

### Not Found Error
```json
{
  "error": "not_found",
  "message": "Rocket not found"
}
```

## Version History

See [CHANGELOG.md](CHANGELOG.md) for release notes.

- **v0.2.0** - Rocket Management API
- **v0.1.0** - Initial project setup