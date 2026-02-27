# Space Travel Bookings (AstroBookings)

A **backend API** for managing and booking rocket launches.

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