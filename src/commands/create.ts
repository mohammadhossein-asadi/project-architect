import chalk from "chalk";
import { createSpinner } from "nanospinner";
import gradient from "gradient-string";
import fs from "fs-extra";
import path from "path";
import { exec } from "child_process";
import { getProjectConfig } from "../cli/prompts.js";
import { generateProjectFiles } from "../templates/index.js";
import { sleep } from "../utils/helpers.js";
import type { ProjectConfig } from "../types/index.js";

async function createProject(): Promise<void> {
  try {
    const config = await getProjectConfig();

    console.log(
      "\n" + gradient.pastel.multiline("🚀 Creating your project...") + "\n"
    );

    const spinner = createSpinner("Generating project structure...").start();
    await sleep(1000);

    // Generate project files
    await generateProjectFiles(config);

    const projectPath = path.join(process.cwd(), config.name);

    // Create additional configuration files
    if (config.customizations.linting) {
      spinner.start("Setting up ESLint and Prettier...");
      await createPrettierConfig(projectPath);
      await createESLintConfig(projectPath, config.language === "typescript");
      spinner.success({ text: "Linting configuration created! ✨" });
    }

    // Update package.json scripts
    await updatePackageScripts(projectPath, config);

    spinner.start("Installing dependencies...");
    await executeCommand("npm install", projectPath);
    spinner.success({ text: "Dependencies installed successfully! 📦" });

    console.log(
      "\n" +
        gradient.pastel.multiline(`
    🎉 Success! Created ${config.name} at ./${config.name}
    
    Inside that directory, you can run several commands:

    ${chalk.cyan("npm run dev")}
      Starts the development server.

    ${chalk.cyan("npm run build")}
      Bundles the app into static files for production.

    ${chalk.cyan("npm run preview")}
      Locally preview production build.

    We suggest that you begin by typing:

    ${chalk.cyan("cd")} ${config.name}
    ${chalk.cyan("npm install")}
    ${chalk.cyan("npm run dev")}

    Happy coding! 🚀
    `)
    );
  } catch (error) {
    console.error(
      "\n" + gradient.pastel.multiline("❌ Error creating project:")
    );
    if (error instanceof Error) {
      console.error(chalk.red(error.message));
    } else {
      console.error(chalk.red("An unknown error occurred"));
    }
    process.exit(1);
  }
}

async function executeCommand(command: string, cwd: string): Promise<void> {
  return new Promise((resolve, reject) => {
    exec(command, { cwd }, (error: Error | null) => {
      if (error) {
        reject(error);
        return;
      }
      resolve();
    });
  });
}

async function createPrettierConfig(projectPath: string): Promise<void> {
  const prettierConfig = {
    semi: true,
    singleQuote: true,
    trailingComma: "es5",
    printWidth: 80,
    tabWidth: 2,
    endOfLine: "auto",
  };

  await fs.writeFile(
    path.join(projectPath, ".prettierrc"),
    JSON.stringify(prettierConfig, null, 2)
  );
}

async function createESLintConfig(
  projectPath: string,
  isTypeScript: boolean
): Promise<void> {
  const eslintConfig = {
    env: {
      browser: true,
      es2021: true,
      node: true,
    },
    extends: [
      "eslint:recommended",
      "plugin:react/recommended",
      "plugin:react-hooks/recommended",
      ...(isTypeScript ? ["plugin:@typescript-eslint/recommended"] : []),
    ],
    parserOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      ecmaFeatures: {
        jsx: true,
      },
    },
    plugins: ["react", "react-hooks"],
    rules: {
      "react/react-in-jsx-scope": "off",
      "react/prop-types": "off",
    },
    settings: {
      react: {
        version: "detect",
      },
    },
  };

  await fs.writeFile(
    path.join(projectPath, ".eslintrc"),
    JSON.stringify(eslintConfig, null, 2)
  );
}

async function updatePackageScripts(
  projectPath: string,
  config: ProjectConfig
): Promise<void> {
  const packageJsonPath = path.join(projectPath, "package.json");
  const packageJson = JSON.parse(await fs.readFile(packageJsonPath, "utf8"));

  packageJson.scripts = {
    ...packageJson.scripts,
    lint: "eslint src --ext .js,.jsx,.ts,.tsx",
    format: 'prettier --write "src/**/*.{js,jsx,ts,tsx,css,md}"',
    "type-check": config.language === "typescript" ? "tsc --noEmit" : undefined,
  };

  await fs.writeFile(packageJsonPath, JSON.stringify(packageJson, null, 2));
}

export { createProject };
