#PNPM monorepo

## Description

This is a monorepo for showcasing different technoligies and tools. The main goal is to have a single place where we can see how different tools and technologies can be used togheter. But all using the same data and solving the same problem.

### The funtionality of the apps

The apps have some fairly simple usecases:

1. List all the commits
2. Create a new commit
3. Update a commit

### Structure

- `packages/` - contains all the packages and shared UI components
- `apps/` - contains all the apps
- `server/` - contains all the tools

The apps and servers that are used togheter will share the same name.

### Data

The data is stored in a supabase database, and is based on the Ignite commits until 16. of March 2024.

### Variants

- `Crud` - All the usecases are implemented with a simple CRUD API
