import type { Framework } from "../types/index.js";

export const frameworks: Record<string, Framework> = {
  react: {
    name: "React",
    type: "frontend",
    dependencies: {
      react: "^18.2.0",
      "react-dom": "^18.2.0",
    },
    devDependencies: {
      "@types/react": "^18.2.43",
      "@types/react-dom": "^18.2.17",
      "@vitejs/plugin-react": "^4.2.1",
      vite: "^5.0.8",
    },
    templates: {
      "src/main.tsx": `import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './styles/index.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)`,
      "src/App.tsx": `import { useState } from 'react'
import './styles/App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app">
      <h1>Welcome to React</h1>
      <button onClick={() => setCount(count => count + 1)}>
        Count is {count}
      </button>
    </div>
  )
}`,
    },
  },
};
