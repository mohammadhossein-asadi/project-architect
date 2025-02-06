export const getMainFiles = () => [
  {
    path: 'src/app.html',
    content: `<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="utf-8" />
    <link rel="icon" href="%sveltekit.assets%/favicon.png" />
    <meta name="viewport" content="width=device-width" />
    %sveltekit.head%
  </head>
  <body data-sveltekit-preload-data="hover">
    <div style="display: contents">%sveltekit.body%</div>
  </body>
</html>`
  },
  {
    path: 'src/routes/+layout.svelte',
    content: `<script lang="ts">
  import '../app.css';
  import Navbar from '$lib/components/Navbar.svelte';
</script>

<Navbar />

<main class="container mx-auto px-4 py-8">
  <slot />
</main>`
  },
  {
    path: 'src/routes/+page.svelte',
    content: `<script lang="ts">
  let count = 0;
</script>

<h1 class="text-4xl font-bold mb-4">Welcome to Svelte</h1>

<button
  class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
  on:click={() => count++}
>
  Count is {count}
</button>`
  }
];