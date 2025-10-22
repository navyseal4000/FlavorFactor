# Supabase Schema

This project currently relies on the following tables and columns in your Supabase database.

## `public.users`

| Column       | Type         | Constraints / Default            | Notes                                |
| ------------ | ------------ | -------------------------------- | ------------------------------------ |
| `id`         | `uuid`       | `PRIMARY KEY`, `DEFAULT gen_random_uuid()` | Used as the application user identifier (`i.User.id`). |
| `email`      | `text`       | `NOT NULL`, `UNIQUE`             | Queried by `getUserByEmail`; must be unique. |
| `name`       | `text`       | `NOT NULL`                       | Stored when creating new users.      |
| `created_at` | `timestamptz`| `NOT NULL`, `DEFAULT now()`      | Returned to the client for audit UI. |

### Row Level Security

Row Level Security should be enabled on `public.users` with policies that allow:

- anonymous role to insert a row when `auth.uid()` matches the `id`, or during sign up flow as appropriate.
- authenticated role to select/update their own row (filter by `id` or `email`).

Adjust the policies to your security requirements; the application expects to be able to insert a new record when a user signs up and select/update by email.

---

Keep this document in sync with migration files under `supabase/migrations/` whenever the data-model changes.
