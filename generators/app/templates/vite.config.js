import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
<% if (useDotenv) { %>
import { config } from 'dotenv'

config()
<% } %>
<% if (useTailwind) { %>
import tailwindcss from '@tailwindcss/vite'
<% } %>

export default defineConfig({
  plugins: [
    react(),
    <% if (useTailwind) { %>
    tailwindcss(),
    <% } %>
  ],
  <% if (useDotenv) { %>
  define: {
    'process.env': process.env
  },
  <% } %>
})
