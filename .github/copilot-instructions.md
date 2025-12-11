# Heelix - AI Agent Instructions

## Project Architecture

**Monorepo Structure**: Nx-managed workspace with applications in `apps/` directory.
- `apps/heelix`: React 19 + React Router web app (Vite, port 4200)
- `apps/heelix-e2e`: Playwright-based end-to-end tests

**Tech Stack**:
- **Frontend**: React 19 + TypeScript + Tailwind CSS + React Router v6
- **Build**: Nx (v22.2.0) orchestration, Vite for bundling
- **Testing**: Vitest (unit) + Playwright (e2e)
- **Code Quality**: ESLint (flat config), TypeScript strict mode
- **Cross-platform**: Expo support included (React Native)

## Critical Developer Workflows

### Running Applications
```bash
npx nx serve heelix          # Dev server on http://localhost:4200
npx nx build heelix          # Production bundle
npx nx test heelix           # Run unit tests
npx nx test heelix-e2e       # Run e2e tests
npx nx preview heelix        # Preview production build
```

### Project Inspection
```bash
npx nx show project heelix   # List all targets for a project
npx nx graph                 # Visualize dependency graph
npx nx list                  # List installed plugins
```

### Code Generation
```bash
npx nx g @nx/react:component MyComponent --project=heelix --style=tailwind
```

## Patterns & Conventions

### Routing
- Routes defined in `apps/heelix/src/app/app.tsx` using React Router v6
- Pattern: `<Routes>` with `<Route>` elements; navigate via `<Link>` component
- Example structure already in place with "/" and "/page-2"

### Styling
- **Tailwind CSS** configured globally; generated components default to Tailwind
- `apps/heelix/tailwind.config.js` + `postcss.config.js` + `src/styles.css`
- Generator default: `@nx/react` component creation with `--style=tailwind`

### Testing Strategy
- **Unit tests**: Vitest with React Testing Library; collocate as `*.spec.tsx` files
- **E2e tests**: Playwright; `webServer` auto-starts preview build (port 4300)
- Tests depend on `build` target (`nx.json` targetDefaults)

### Module Organization
- Nx module boundary enforcement via ESLint (`@nx/enforce-module-boundaries`)
- All modules can depend on all others (`sourceTag: '*'` → `onlyDependOnLibsWithTags: ['*']`)
- Ignore patterns: `dist/`, `vite.config.*.timestamp*`, `vitest.config.*.timestamp*`

### TypeScript Configuration
- **Strict mode enabled**: `noUnusedLocals: true`, `noImplicitReturns: true`
- **Module system**: ESNext (ES2022 target)
- **Path resolution**: Bundler strategy (Vite-friendly)
- Base config: `tsconfig.base.json`; app overrides in `apps/heelix/tsconfig.app.json`

## Common Commands for AI Agents

| Task | Command |
|------|---------|
| Check if code compiles | `npx nx typecheck heelix` |
| Lint all files | `npx nx lint` (or specific project) |
| Run all tests | `npx nx test:ci` (CI mode) or `npx nx test heelix` (watch) |
| Format code | Use prettier (via ESLint rules) |
| Add dependency | `npm install <package>` (workspace root) |
| Clean build artifacts | `nx reset` or delete `dist/` directories |

## Key Files to Reference

- **App entry**: `apps/heelix/src/app/app.tsx` (routing setup)
- **Vite config**: `apps/heelix/vite.config.mts` (build settings, ports)
- **ESLint rules**: `eslint.config.mjs` (root level, flat config format)
- **Nx config**: `nx.json` (plugins, generators, task defaults)
- **Test setup**: `vitest.workspace.ts`, `apps/heelix-e2e/playwright.config.ts`

## Integration Points

- **Expo/React Native**: Configured but not actively used in main heelix app
- **Node modules**: Workspace root; all apps reference via npm workspaces
- **CI/Cloud**: Nx Cloud ready (`npx nx connect` for remote caching)

## Notes for Maintainers

- Avoid creating new files in root `src/`; use `apps/` structure
- When modifying ESLint config, use flat config syntax (`.mjs` files)
- Tests must pass before deployment; e2e runs against preview build
- Tailwind JIT compilation automatic; no manual build needed for CSS
