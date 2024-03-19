import { type SupabaseClient, createClient } from "@supabase/supabase-js";
import { Context, MiddlewareHandler } from "hono";
import { env } from "hono/adapter";
export const idTokenContext = "supabase";

/**
 * Middleware for initializing the supabase client
 * @param c: Context
 * @param next: MiddlewareHandler
 * @returns Promise<void>
 */
export const supabaseMiddleware: MiddlewareHandler = async (c, next) => {
  try {
    const { SUPABASE_URL: BASE_URL, SUPABASE_KEY: BASE_KEY } = env<{
      SUPABASE_URL: string;
      SUPABASE_KEY: string;
    }>(c);

    if (!BASE_URL)
      return c.json(
        { msg: "SUPABASE_URL debe ser declarado como variable de env" },
        500,
      );
    if (!BASE_KEY)
      return c.json(
        { msg: "SUPABASE_KEY debe ser declarado como variable de env" },
        500,
      );

    if (getSupabase(c)) return next();

    const supabase = createClient(BASE_URL, BASE_KEY);
    c.set(idTokenContext, supabase);

    await next();
  } catch (e: unknown) {
    return c.json({ msg: (e as Error).message }, 500);
  }
};

/**
 * Get the supabase client from the context
 * @param c: Context
 * @returns SupabaseClient
 */
export const getSupabase = (c: Context): SupabaseClient =>
  c.get(idTokenContext);
