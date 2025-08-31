# NextPB-Auth-Starter

A full-stack starter template using Next.js, PocketBase, Tailwind CSS, and ShadCN UI. Built-in auth, CI/CD, and developer-ready setup.

## Features

🔐 Authentication – Built-in user authentication with PocketBase, ready to handle login, signup, and session management.
↔️ Auth Forwarding – Seamless authentication flow with authentication redirects using NextJS middleware.
🛡️ Row-Level Security (RLS) – Implemented Pocketbase API Rules
📦 Containerization – Docker-ready setup for easy local development, testing, and production deployment.
⚙️ CI/CD Ready – Out-of-the-box pipelines (Jenkins / DinD-Jenkins) to automate building, testing, and deploying your app with GH hooks.
🎨 Clean starting layout with Tailwind CSS and ShadCN with example app router and API route usage.

## Setup and usage

Option 1: (Jenkins CI/CD)

- CI/CD Setup Guide: [Dind-Jenkins](https://github.com/V-vTK/DinD-Jenkins)
- The application opens at:
  - Pocketbase: [localhost:8096](http://localhost:8096)
  - NextJS: [localhost:3006](http://localhost:3006)

Option 2: (Developement)

- Developement with [Fast Refresh](https://nextjs.org/docs/architecture/fast-refresh).
- Run `docker compose up -d --build pocketbase`
- Navigate to frontend folder '`cd frontend`'
- Run `npm run dev`
- The application is now open:
  - Pocketbase: [localhost:8096](http://localhost:8096)
  - NextJS: [localhost:3006](http://localhost:3000)

Option 3: (Test production build)

- Navigate to frontend folder '`cd frontend`'
- Edit '`.env.local`' file to use `http://next-pocketbase:8090` as explained in the comment.
- Run `docker compose up -d --build`
- The application is now open:
  - Pocketbase: [localhost:8096](http://localhost:8096)
  - NextJS: [localhost:3006](http://localhost:3006)

## Notes

Pocketbase docs: https://pocketbase.io/docs/
NextJS docs: https://nextjs.org/docs
