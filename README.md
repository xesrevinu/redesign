# Redesign

# Introduction

This is a very experimental project, the purpose is to learn how ChatGPT, Open AI use it on the front end and create better products.

> 这是非常实验性质的项目，目的是为了学习 ChatGPT, Open AI 如何在前端使用并创造更好的产品。

Using Nx as a monorepo management tool, pnpm manages dependencies, the technology stack uses Next.js, Tauri, Vite, @fp-ts, Effect, Tailwind, Axios, Zustand, React, React-Router

> 使用 Nx 作为 monorepo 管理工具, pnpm 管理依赖，技术栈采用 Next.js, Tauri, Vite, @fp-ts, Effect, Tailwind, Axios, Zustand, React, React-Router

# Getting Started

First of all, you need to install pnpm.

```bash
npm install -g pnpm
```

## Install dependencies

```bash
pnpm install
```

## Run Web App

```bash
pnpm start web
```

## Run Tauri App

```bash
pnpm start desktop
```

## Run Browser Extension

```bash
pnpm start extension # TODO: Not implemented yet.
```

## Build the app

```bash
pnpm build # This will trigger all applications.
# or
pnpm build web
# or
pnpm build desktop
```

# License

MIT
