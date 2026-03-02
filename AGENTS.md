# Agents Instructions

## Product Overview
- Backend API for managing space travel bookings and rocket launches.
- Provides CRUD operations for rocket inventory management with validation.
- Launch bookings and customer management features are planned for future releases.

## Technical Implementation

### Tech Stack
- Language: **TypeScript 5.6.3 / Node.js 18+**
- Framework: **Express 4.19.2**
- Database: **In-memory store (no external database)**
- Security: **Basic Express middleware**
- Testing: **Playwright 1.58.2 (e2e tests)**
- Logging: **Console logging**

### Development workflow
```bash
# Set up the project
npm install

# Build/Compile the project
npm run build

# Run the project
npm run dev          # Development mode with hot reload
npm start            # Production mode (requires build first)

# Test the project
npm test             # Runs e2e tests with Playwright

# Deploy the project
# No deployment script configured
```

### Folder structure
```text
.                         # Project root  
├── AGENTS.md             # This file with instructions for AI agents
├── README.md             # The main human documentation file
├── package.json          # Dependencies and scripts
├── tsconfig.json         # TypeScript configuration
├── playwright.config.ts  # Playwright test configuration
├── .agents/              # AI agent prompts and configurations
│   └── prompts/          # Prompt templates for agents
├── src/                  # Source code
│   ├── index.ts          # Entry point / server startup
│   ├── app.ts            # App factory and middleware setup
│   └── modules/          # Feature modules
│       └── rockets/      # Rocket management module
├── specs/                # Feature specifications
├── tests/                # Playwright e2e tests
├── dist/                 # Build output (generated)
├── test-results/         # Test execution results
└── playwright-report/    # Test reports
```

## Environment
- Code and documentation must be in English.
- Chat responses must be in the language of the user prompt.
- Sacrifice grammar for conciseness in responses.
- This is a macOS environment using zsh terminal.
- My default branch is `main`.
