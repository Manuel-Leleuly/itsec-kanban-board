# Kanban Flow

## Overview

This is a simple kanban board made with ReactJS (NextJS). I was originally for
finishing the technical test from ITSEC. This version has been adapted and renamed for use in my portfolio.

## How to use

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

> [!WARNING] This repo uses [MockAPI](https://mockapi.io/) for storing and
> manipulating data. Please take a look at
> [TicketSchema](src/api/tickets/models/tickets.ts) and
> [UserSchema](src/api/users/models/users.ts) for creating the data tables

## Development Requirements

- IDE (VSCode, WebStorm, Cursor, Atom, Notepad++, VIM, etc.)
- BunJS (`npm install -g bun`)

## Environment Variables

| Name     | Optional | Description               |
|----------|----------|---------------------------|
| BASE_URL | no       | Base url for storing data |

## Current limitations / errors

1. MockAPI used in this repo is a free version, meaning that I can only do CRUD
   using `id`. During login and/or register process, the page will have to fetch
   all stored users from server into client so that I can check the `email`
   and/or `password`. This results in the page load slower than expected.
2. There are some hydration issues in some of the component
3. There is an issue with
   [Maximum update depth exceeded](https://github.com/clauderic/dnd-kit/issues/496).
   This happens when you drag an item to left and right quickly and excessively.
   I'm still trying to figure out why that happened. It doesn't happen when you
   drag it slowly
