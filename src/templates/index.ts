import fs from "fs-extra";
import path from "path";
import { fileURLToPath } from "url";
import type { ProjectConfig } from "../types/index.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export async function generateProjectFiles(
  config: ProjectConfig
): Promise<void> {
  const projectDir = path.join(process.cwd(), config.name);

  // Create base directories
  await fs.ensureDir(projectDir);
  await fs.ensureDir(path.join(projectDir, "src"));
  await fs.ensureDir(path.join(projectDir, "src/components"));
  await fs.ensureDir(path.join(projectDir, "src/assets"));
  await fs.ensureDir(path.join(projectDir, "src/styles"));
  await fs.ensureDir(path.join(projectDir, "public"));

  // Generate base files
  await generateBaseFiles(projectDir, config);

  // Generate specific framework files
  if (config.framework === "react") {
    await generateReactFiles(projectDir, config);
  }
}

async function generateBaseFiles(
  projectDir: string,
  config: ProjectConfig
): Promise<void> {
  // Generate package.json
  const packageJson = {
    name: config.name,
    private: true,
    version: "0.1.0",
    type: "module",
    scripts: {
      dev: "vite",
      build: "tsc && vite build",
      preview: "vite preview",
    },
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
    },
    devDependencies: {
      "@types/react": "^18.2.43",
      "@types/react-dom": "^18.2.17",
      "@typescript-eslint/eslint-plugin": "^6.14.0",
      "@typescript-eslint/parser": "^6.14.0",
      "@vitejs/plugin-react": "^4.2.1",
      eslint: "^8.55.0",
      "eslint-plugin-react-hooks": "^4.6.0",
      "eslint-plugin-react-refresh": "^0.4.5",
      typescript: "^5.2.2",
      vite: "^5.0.8",
    },
  };

  await fs.writeJSON(path.join(projectDir, "package.json"), packageJson, {
    spaces: 2,
  });

  // Generate .gitignore
  const gitignore = `# Logs
logs
*.log
npm-debug.log*
yarn-debug.log*
yarn-error.log*
pnpm-debug.log*
lerna-debug.log*

node_modules
dist
dist-ssr
*.local

# Editor directories and files
.vscode/*
!.vscode/extensions.json
.idea
.DS_Store
*.suo
*.ntvs*
*.njsproj
*.sln
*.sw?
`;

  await fs.writeFile(path.join(projectDir, ".gitignore"), gitignore);

  // Generate README.md
  const readme = `# ${config.name}

This project was created with Project Architect.

## Available Scripts

### \`npm run dev\`

Runs the app in development mode.
Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

### \`npm run build\`

Builds the app for production to the \`dist\` folder.

### \`npm run preview\`

Previews the built app locally.
`;

  await fs.writeFile(path.join(projectDir, "README.md"), readme);

  // Generate TypeScript config
  const tsconfig = {
    compilerOptions: {
      target: "ES2020",
      useDefineForClassFields: true,
      lib: ["ES2020", "DOM", "DOM.Iterable"],
      module: "ESNext",
      skipLibCheck: true,
      moduleResolution: "bundler",
      allowImportingTsExtensions: true,
      resolveJsonModule: true,
      isolatedModules: true,
      noEmit: true,
      jsx: "react-jsx",
      strict: true,
      noUnusedLocals: true,
      noUnusedParameters: true,
      noFallthrough: true,
    },
    include: ["src"],
    references: [{ path: "./tsconfig.node.json" }],
  };

  const tsconfigNode = {
    compilerOptions: {
      composite: true,
      skipLibCheck: true,
      module: "ESNext",
      moduleResolution: "bundler",
      allowSyntheticDefaultImports: true,
    },
    include: ["vite.config.ts"],
  };

  await fs.writeJSON(path.join(projectDir, "tsconfig.json"), tsconfig, {
    spaces: 2,
  });
  await fs.writeJSON(
    path.join(projectDir, "tsconfig.node.json"),
    tsconfigNode,
    { spaces: 2 }
  );

  // Generate Vite config
  const viteConfig = `import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
})
`;

  await fs.writeFile(path.join(projectDir, "vite.config.ts"), viteConfig);
}

async function generateReactFiles(
  projectDir: string,
  config: ProjectConfig
): Promise<void> {
  const srcDir = path.join(projectDir, "src");
  const extension = config.language === "typescript" ? "tsx" : "jsx";

  // Generate index.html
  const indexHtml = `<!doctype html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <link rel="icon" type="image/svg+xml" href="/vite.svg" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>${config.name}</title>
  </head>
  <body>
    <div id="root"></div>
    <script type="module" src="/src/main.${extension}"></script>
  </body>
</html>
`;

  await fs.writeFile(path.join(projectDir, "index.html"), indexHtml);

  // Generate main.tsx/jsx
  const mainContent = `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
`;

  await fs.writeFile(path.join(srcDir, `main.${extension}`), mainContent);

  // Generate App.tsx/jsx
  const appContent = `import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>${config.name}</h1>
      <div className="card">
        <button onClick={() => setCount((count) => count + 1)}>
          count is {count}
        </button>
        <p>
          Edit <code>src/App.${extension}</code> and save to test HMR
        </p>
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}

export default App
`;

  await fs.writeFile(path.join(srcDir, `App.${extension}`), appContent);

  // Generate CSS files
  const indexCss = `:root {
  font-family: Inter, system-ui, Avenir, Helvetica, Arial, sans-serif;
  line-height: 1.5;
  font-weight: 400;

  color-scheme: light dark;
  color: rgba(255, 255, 255, 0.87);
  background-color: #242424;

  font-synthesis: none;
  text-rendering: optimizeLegibility;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

a {
  font-weight: 500;
  color: #646cff;
  text-decoration: inherit;
}
a:hover {
  color: #535bf2;
}

body {
  margin: 0;
  display: flex;
  place-items: center;
  min-width: 320px;
  min-height: 100vh;
}

h1 {
  font-size: 3.2em;
  line-height: 1.1;
}

button {
  border-radius: 8px;
  border: 1px solid transparent;
  padding: 0.6em 1.2em;
  font-size: 1em;
  font-weight: 500;
  font-family: inherit;
  background-color: #1a1a1a;
  cursor: pointer;
  transition: border-color 0.25s;
}
button:hover {
  border-color: #646cff;
}
button:focus,
button:focus-visible {
  outline: 4px auto -webkit-focus-ring-color;
}

@media (prefers-color-scheme: light) {
  :root {
    color: #213547;
    background-color: #ffffff;
  }
  a:hover {
    color: #747bff;
  }
  button {
    background-color: #f9f9f9;
  }
}
`;

  const appCss = `#root {
  max-width: 1280px;
  margin: 0 auto;
  padding: 2rem;
  text-align: center;
}

.logo {
  height: 6em;
  padding: 1.5em;
  will-change: filter;
  transition: filter 300ms;
}
.logo:hover {
  filter: drop-shadow(0 0 2em #646cffaa);
}
.logo.react:hover {
  filter: drop-shadow(0 0 2em #61dafbaa);
}

@keyframes logo-spin {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
}

@media (prefers-reduced-motion: no-preference) {
  a:nth-of-type(2) .logo {
    animation: logo-spin infinite 20s linear;
  }
}

.card {
  padding: 2em;
}

.read-the-docs {
  color: #888;
}
`;

  await fs.writeFile(path.join(srcDir, "styles", "index.css"), indexCss);
  await fs.writeFile(path.join(srcDir, "styles", "App.css"), appCss);

  // Generate assets
  const reactLogo = `<?xml version="1.0" encoding="UTF-8"?>
<svg width="100%" height="100%" viewBox="-10.5 -9.45 21 18.9" fill="none" xmlns="http://www.w3.org/2000/svg" class="text-sm mr-0 w-10 h-10 text-link dark:text-link-dark flex origin-center transition-all ease-in-out">
  <circle cx="0" cy="0" r="2" fill="currentColor"></circle>
  <g stroke="currentColor" stroke-width="1" fill="none">
    <ellipse rx="10" ry="4.5"></ellipse>
    <ellipse rx="10" ry="4.5" transform="rotate(60)"></ellipse>
    <ellipse rx="10" ry="4.5" transform="rotate(120)"></ellipse>
  </g>
</svg>`;

  await fs.writeFile(path.join(srcDir, "assets", "react.svg"), reactLogo);

  const viteLogo = `<?xml version="1.0" encoding="UTF-8"?>
<svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" width="31.88" height="32" viewBox="0 0 256 257"><defs><linearGradient id="a" x1="-.828%" x2="57.636%" y1="7.652%" y2="78.411%"><stop offset="0%" stop-color="#41D1FF"/><stop offset="100%" stop-color="#BD34FE"/></linearGradient><linearGradient id="b" x1="43.376%" x2="50.316%" y1="2.242%" y2="89.03%"><stop offset="0%" stop-color="#FFEA83"/><stop offset="8.333%" stop-color="#FFDD35"/><stop offset="100%" stop-color="#FFA800"/></linearGradient></defs><path fill="url(#a)" d="M255.153 37.938L134.897 252.976c-2.483 4.44-8.862 4.466-11.382.048L.875 37.958c-2.746-4.814 1.371-10.646 6.827-9.67l120.385 21.517a6.537 6.537 0 0 0 2.322-.004l117.867-21.483c5.438-.991 9.574 4.796 6.877 9.62Z"/><path fill="url(#b)" d="M185.432.063L96.44 17.501a3.268 3.268 0 0 0-2.634 3.014l-5.474 92.456a3.268 3.268 0 0 0 3.997 3.378l24.777-5.718c2.318-.535 4.413 1.507 3.936 3.838l-7.361 36.047c-.495 2.426 1.782 4.5 4.151 3.78l15.304-4.649c2.372-.72 4.652 1.36 4.15 3.788l-11.698 56.621c-.732 3.542 3.979 5.473 5.943 2.437l1.313-2.028l72.516-144.72c1.215-2.423-.88-5.186-3.54-4.672l-25.505 4.922c-2.396.462-4.435-1.77-3.759-4.114l16.646-57.705c.677-2.35-1.37-4.583-3.769-4.113Z"/></svg>`;

  await fs.writeFile(path.join(projectDir, "public", "vite.svg"), viteLogo);
}
