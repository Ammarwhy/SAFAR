import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL as string;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string;

if (!supabaseUrl || !supabaseAnonKey) {
    console.warn(
        'Missing Supabase environment variables. Ensure VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY are set in .env'
    );
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey, {
  auth: {
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: true,
  },
});

export type ConnectionCheckResult =
    | { ok: true; info?: any; warning?: string }
    | { ok: false; error: string };

/**
 * Lightweight health check to confirm the Supabase project is reachable.
 */
export async function checkConnection(): Promise<ConnectionCheckResult> {
    try {
        const { data, error, status } = await supabase.from('profiles').select('id').limit(1);
        if (!error) return { ok: true, info: { rows: (data ?? []).length, status } };

        const msg = (error && (error as any).message) || JSON.stringify(error);
        if (
            (error as any).status === 401 ||
            /row-level|policy|permission/i.test(msg) ||
            /could not find the table|schema cache|relation .* does not exist/i.test(msg)
        ) {
            return { ok: true, warning: msg };
        }

        return { ok: false, error: msg };
    } catch (e) {
        return { ok: false, error: String(e) };
    }
}
