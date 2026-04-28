import 'react-native-url-polyfill/auto';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.EXPO_PUBLIC_SUPABASE_URL as string;
const supabaseAnonKey = process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY as string;

export const supabase = createClient(supabaseUrl, supabaseAnonKey);


// --- Quick Backend Test ---
supabase.from('users').select('*').limit(1).then(({ data, error }) => {
    if (error) {
        console.error("❌ Supabase Connection Error:", error.message);
    } else {
        console.log("✅ Supabase is connected successfully! Data fetched:", data);
    }
});
