# Kanban Flow

## Overview

This is a simple kanban board made with ReactJS (NextJS). It was originally for
finishing the technical test from ITSEC. This version has been adapted and renamed for use in my portfolio.

## How to use

> [!WARNING]
> This repo uses [kanban-flow-go](https://github.com/Manuel-Leleuly/kanban-flow-go) backend for storing and
> manipulating data. Please make sure to run the backend first before running this one

### Local

If you want to run this project locally, you can do so by first installing all
the dependencies required:

```
bun --bun install
```

Then, start the development environment:

```
bun --bun run dev
```

## Development Requirements

- IDE (VSCode, WebStorm, Cursor, Atom, Notepad++, VIM, etc.)
- BunJS (`npm install -g bun`)

## Environment Variables

| Name     | Optional | Description               |
|----------|----------|---------------------------|
| BASE_URL | no       | Base url for storing data |

## Current limitations / errors

1. There are some hydration issues in some of the component
2. Some pages are still not working properly
