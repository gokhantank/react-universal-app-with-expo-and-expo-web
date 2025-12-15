# Heelix

<a alt="Nx logo" href="https://nx.dev" target="_blank" rel="noreferrer"><img src="https://raw.githubusercontent.com/nrwl/nx/master/images/nx-logo.png" width="45"></a>

A react universal app with monorepo workspace built with [Nx](https://nx.dev), featuring cross-platform applications for web and mobile using Expo and Expo Web

## Project Structure

This workspace contains:

- **`apps/web`** - React web application (React 19, TypeScript, Tailwind CSS, Vite)
- **`apps/mobile`** - Expo/React Native mobile application
- **`shared`** - Shared library with reusable components and features (Dashboard, FactorAnalysis, Navigation, etc.)

## Architecture Decision

### Why This Stack?

This architecture was chosen to enable true code sharing across web and mobile platforms while providing a modern, maintainable development experience. For a team primarily experienced with Angular, adopting React represents an exciting opportunity to expand our technical expertise.

### Expo (React Native) for Mobile

**Pros:**
- **Rapid Development**: Expo provides a managed workflow with over-the-air updates, eliminating the need for native builds during development
- **Rich Ecosystem**: Access to a comprehensive set of pre-built native modules and APIs through Expo SDK
- **Cross-Platform**: Write once, run on both iOS and Android with native performance
- **Developer Experience**: Hot reloading, excellent debugging tools, and simplified build process
- **Code Sharing**: Share business logic, components, and utilities between web and mobile through the shared library
- **Active Community**: Large, vibrant community with extensive documentation and support

**Cons:**
- **Native Module Limitations**: Some advanced native features may require ejecting from the managed workflow (though this is becoming less common)
- **Bundle Size**: Can be larger than pure native apps, though optimization techniques help mitigate this
- **Learning Curve**: Team members familiar with Angular will need to learn React patterns and React Native specifics
- **Platform-Specific Code**: Occasionally requires platform-specific implementations for certain features

### Expo Web (React Native Web) for Web

**Pros:**
- **Maximum Code Reuse**: Share React Native components directly on the web, reducing duplication
- **Consistent UI/UX**: Maintain visual and behavioral consistency across web and mobile platforms
- **Single Codebase**: Write components once in React Native and render them on both native and web
- **Modern Web Standards**: Leverages modern web APIs and React's virtual DOM for optimal performance
- **SEO Friendly**: Can be configured for server-side rendering when needed
- **Progressive Enhancement**: Works well with modern web features and can be enhanced for web-specific optimizations

**Cons:**
- **Performance Considerations**: React Native Web adds abstraction layers that can impact web performance compared to pure React web apps
- **Web-Specific Features**: Some web-specific optimizations and features may require additional configuration or workarounds
- **Bundle Size**: May result in larger bundle sizes compared to purpose-built web applications
- **Styling Limitations**: Some React Native styling patterns don't translate perfectly to web CSS, requiring platform-specific styling
- **Learning Curve**: Developers need to understand both React Native and web-specific considerations

### Why This Architecture Works for Us

1. **Team Growth**: As a team of Angular developers, learning React provides valuable cross-framework experience and expands our skill set
2. **Code Efficiency**: Sharing components and business logic between platforms reduces maintenance overhead and development time
3. **Consistent Experience**: Users get a cohesive experience across web and mobile platforms
4. **Future-Proof**: React and React Native have strong industry adoption and long-term support
5. **Monorepo Benefits**: Nx enables efficient code sharing, dependency management, and build optimization across the entire workspace
6. **Flexibility**: The architecture allows for platform-specific optimizations when needed while maintaining maximum code reuse

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

```sh
npm install
```

## Run Tasks

### Web Application

To run the web app development server:

```sh
npx nx serve web
```

To create a production bundle:

```sh
npx nx build web
```

To preview the production build:

```sh
npx nx preview web
```

### Mobile Application

To start the Expo development server:

```sh
npx nx start mobile
```

To run on iOS:

```sh
npx nx run-ios mobile
```

To run on Android:

```sh
npx nx run-android mobile
```

### Shared Library

To build the shared library:

```sh
npx nx build shared
```

### Testing

Run unit tests:

```sh
npx nx test web
npx nx test shared
```

Run linting:

```sh
npx nx lint web
npx nx lint mobile
npx nx lint shared
```

### Project Information

To see all available targets for a project:

```sh
npx nx show project web
npx nx show project mobile
npx nx show project shared
```

To visualize the project dependency graph:

```sh
npx nx graph
```

These targets are either [inferred automatically](https://nx.dev/concepts/inferred-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) or defined in the `project.json` or `package.json` files.

[More about running tasks in the docs &raquo;](https://nx.dev/features/run-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Add New Projects

While you could add new projects to your workspace manually, you might want to leverage [Nx plugins](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) and their [code generation](https://nx.dev/features/generate-code?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) feature.

### Generate a New React Application

```sh
npx nx g @nx/react:app my-app
```

### Generate a New React Library

```sh
npx nx g @nx/react:lib my-lib
```

### Generate a New Component

```sh
npx nx g @nx/react:component MyComponent --project=web --style=tailwind
```

### Generate a New Expo Application

```sh
npx nx g @nx/expo:application my-mobile-app
```

You can use `npx nx list` to get a list of installed plugins. Then, run `npx nx list <plugin-name>` to learn about more specific capabilities of a particular plugin. Alternatively, [install Nx Console](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) to browse plugins and generators in your IDE.

[Learn more about Nx plugins &raquo;](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) | [Browse the plugin registry &raquo;](https://nx.dev/plugin-registry?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Set up CI!

### Step 1

To connect to Nx Cloud, run the following command:

```sh
npx nx connect
```

Connecting to Nx Cloud ensures a [fast and scalable CI](https://nx.dev/ci/intro/why-nx-cloud?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects) pipeline. It includes features such as:

- [Remote caching](https://nx.dev/ci/features/remote-cache?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task distribution across multiple machines](https://nx.dev/ci/features/distribute-task-execution?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Automated e2e test splitting](https://nx.dev/ci/features/split-e2e-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Task flakiness detection and rerunning](https://nx.dev/ci/features/flaky-tasks?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

### Step 2

Use the following command to configure a CI workflow for your workspace:

```sh
npx nx g ci-workflow
```

[Learn more about Nx on CI](https://nx.dev/ci/intro/ci-with-nx#ready-get-started-with-your-provider?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Install Nx Console

Nx Console is an editor extension that enriches your developer experience. It lets you run tasks, generate code, and improves code autocompletion in your IDE. It is available for VSCode and IntelliJ.

[Install Nx Console &raquo;](https://nx.dev/getting-started/editor-setup?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

## Useful links

Learn more:

- [Learn more about this workspace setup](https://nx.dev/getting-started/tutorials/react-monorepo-tutorial?utm_source=nx_project&amp;utm_medium=readme&amp;utm_campaign=nx_projects)
- [Learn about Nx on CI](https://nx.dev/ci/intro/ci-with-nx?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [Releasing Packages with Nx release](https://nx.dev/features/manage-releases?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
- [What are Nx plugins?](https://nx.dev/concepts/nx-plugins?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)

And join the Nx community:
- [Discord](https://go.nx.dev/community)
- [Follow us on X](https://twitter.com/nxdevtools) or [LinkedIn](https://www.linkedin.com/company/nrwl)
- [Our Youtube channel](https://www.youtube.com/@nxdevtools)
- [Our blog](https://nx.dev/blog?utm_source=nx_project&utm_medium=readme&utm_campaign=nx_projects)
