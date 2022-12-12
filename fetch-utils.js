const SUPABASE_URL = 'https://uqwstvnsesaenalrdjyp.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVxd3N0dm5zZXNhZW5hbHJkanlwIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjgxMDgwMjYsImV4cCI6MTk4MzY4NDAyNn0.bZ660DcBSXEiAg5PHlsCACk9kEfmD8_HYAnhjOB69Vo';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
