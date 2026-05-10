# generator-reactjs

Yeoman generator for React + Vite projects.

## Sub-generators

### `yo reactjs`

Scaffolds a complete React + Vite project with:

| Prompt | Description | Default |
|---|---|---|
| Package manager | npm, yarn, or pnpm | npm |
| Routing style | `createBrowserRouter` (React Router v6.4+) or `BrowserRouter` / `Routes` | `createBrowserRouter` |
| Add lazy loading with Suspense? | Generates `src/components/Loading.jsx` and wraps page imports with `React.lazy` | No |
| Add route guards (PrivateRoutes)? | Generates `src/components/PrivateRoutes.jsx` with `/login` redirect | No |
| Configure .env with dotenv? | Generates `.env` file and configures Vite to expose env vars | No |
| Configure Tailwind CSS + DaisyUI? | Adds Tailwind and DaisyUI, generates `vite.config.js` with the plugin | No |

**Generated files:**
- `src/main.jsx` or `src/App.jsx` (depending on routing style)
- `src/view/Home/HomePage.jsx`
- `src/view/Login/LoginPage.jsx`
- `src/components/PrivateRoutes.jsx` (if guards enabled)
- `src/components/Loading.jsx` (if lazy enabled)
- `.env` (if dotenv enabled)
- `vite.config.js` (if dotenv or tailwind enabled)

---

### `yo reactjs:generic-entity`

Generates a `GenericEntity` class that wraps axios HTTP methods and merges the response into the instance via `Object.assign`.

| Prompt | Description | Default |
|---|---|---|
| Package manager | npm, yarn, or pnpm | pnpm |
| Output directory | Relative path to save the file | `src/model` |

**Generated file:** `src/model/GenericEntity.js`

```js
import axios from 'axios'

export default class GenericEntity {
  constructor(baseURL) {
    this.baseURL = baseURL
  }

  async get(path = '') { ... }
  async post(path = '', body) { ... }
  async put(path = '', body) { ... }
  async patch(path = '', body) { ... }
  async delete(path = '') { ... }
}
```

Each method calls the corresponding axios verb, merges the response data into `this` via `Object.assign(this, data)`, and returns `this` for chaining.

**Usage:**
```js
const user = new GenericEntity('http://localhost:3000/api/users')
await user.get('/1')
// user now has all response properties
```

---

### `yo reactjs:axios-interceptor`

Generates an axios interceptor that attaches a Bearer token from `localStorage` to every request and handles 401 responses.

| Prompt | Description | Default |
|---|---|---|
| Package manager | npm, yarn, or pnpm | pnpm |
| Output directory | Relative path to save the file | `src/interceptors` |
| localStorage key for the token | Key used to retrieve the token | `token` |
| Redirect path on 401 | Route to redirect on unauthorized | `/login` |

**Generated file:** `src/interceptors/interceptor.js`

```js
import axios from 'axios'

axios.interceptors.request.use(...)    // attaches Bearer token
axios.interceptors.response.use(...)   // redirects on 401
```

Import once in your app entry point to enable interceptors globally.

---

### `yo reactjs:with-navigation`

Generates a HOC that injects the `navigate` function from `react-router-dom` into any component as a prop.

| Prompt | Description | Default |
|---|---|---|
| Package manager | npm, yarn, or pnpm | pnpm |
| Output directory | Relative path to save the file | `src/components` |

**Generated file:** `src/components/withNavigation.jsx`

```jsx
import { useNavigate } from 'react-router-dom'

export default function withNavigation(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate()
    return <Component {...props} navigate={navigate} />
  }
}
```

**Usage:**
```jsx
import withNavigation from './components/withNavigation'

function MyComponent({ navigate }) {
  return <button onClick={() => navigate('/home')}>Go</button>
}

export default withNavigation(MyComponent)
```
