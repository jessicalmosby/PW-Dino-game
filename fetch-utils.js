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

export async function createDino() {
    const newDino = await client.from('dinos').insert({ user_id: getUser().id });
    return newDino;
}

export async function createAction(dino_id) {
    const newAction = await client.from('actions').insert({ dino_id });

    return newAction;
}

export async function getDinoById(user_id) {
    const response = await client.from('dinos').select('*, actions(*)').match({ user_id }).single();

    return checkError(response);
}

export async function incrementAction(user_id) {
    const dino = await getDinoById(user_id);
    console.log(dino);
    const response = await client
        .from('actions')
        .update({ action_num: dino.action_num + 1 }, { onConflict: 'dino_id' })
        .match({ dino_id: dino.id });

    return checkError(response);
}

function checkError({ data, error }) {
    // eslint-disable-next-line no-console
    return error ? console.error(error) : data;
}
