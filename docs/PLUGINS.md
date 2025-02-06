# Creating Plugins for Project Architect

This guide will help you create plugins for Project Architect.

## Plugin Structure

A plugin is an object that implements the `Plugin` interface:

```typescript
interface Plugin {
  name: string;
  version: string;
  description: string;
  apply: (template: TemplateConfig) => Promise<TemplateConfig>;
}