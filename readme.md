# Vanilla JavaScript App

[Azure Static Web Apps](https://docs.microsoft.com/azure/static-web-apps/overview) allows you to easily build JavaScript apps in minutes. Use this repo with the [quickstart](https://docs.microsoft.com/azure/static-web-apps/getting-started?tabs=vanilla-javascript) to build and customize a new static site.

This repo is used as a starter for a _very basic_ HTML web application using no front-end frameworks.

## Running locally

1. Install dependencies: `npm install`.
2. Start the local server: `npm start`.

The `npm start` script uses the built-in `node` runtime to serve the `src/` directory (see `serve.js`), so no extra global tools like `sirv` are required.

## Zoho OAuth quick test

1. In the page form, enter your Zoho Accounts domain, client ID, redirect URI, and scope (defaults to `ZohoPeople.approvals.READ`).
2. Pick **Implicit (access token in URL hash)** to mirror the Zoho example flow, then click **Save config**.
3. Select **Sign in with Zoho**. After Zoho redirects back, the app will capture the `#access_token` from the URL fragment and enable the **Refresh list** button.
4. Click **Refresh list** to call `people/api/v3/approvals/_my_pending_approvals` with the captured token and display your pending approvals.

Example authorize request:

```
https://accounts.zoho.com/oauth/v2/auth?response_type=token&client_id=<your_client_id>&scope=ZohoPeople.approvals.READ&redirect_uri=<your_redirect_uri>
```

Successful redirects return data like:

```
https://<your_redirect_uri>#access_token=...&expires_in=3600&location=in&api_domain=https://www.zohoapis.in&granted_for_session=true
```

This repo has a dev container. This means if you open it inside a [GitHub Codespace](https://github.com/features/codespaces), or using [VS Code with the remote containers extension](https://code.visualstudio.com/docs/remote/containers), it will be opened inside a container with all the dependencies already installed.
