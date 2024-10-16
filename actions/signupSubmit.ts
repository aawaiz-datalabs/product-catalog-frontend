'use server';

import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseKey) {
  throw new Error('Missing Supabase environment variables');
}

const supabase = createClient(supabaseUrl, supabaseKey);

type UserFormData = {
  email: string;
  username: string;
  firstname: string;
  lastname: string;
  number: string;
  city: string;
  state: string;
  country: string;
  password: string;
};

export async function submitSignup(formData: UserFormData) {
  try {
    // Create the user in Supabase Auth
    const { data: authData, error: authError } = await supabase.auth.signUp({
      email: formData.email,
      password: formData.password,
      options:{
        data:{
          user_name: formData.username,
          first_name: formData.firstname,
          last_name: formData.lastname,
          phone_number: formData.number,
          city: formData.city,
          state: formData.state,
          country: formData.country
        }
      }
    });

    if (authError) throw authError;

    return { success: true, message: 'Signup successful! Please check your email for confirmation.' };
  } catch (error) {
    console.error('Signup error:', error);
    return { success: false, message: error instanceof Error ? error.message : 'An unexpected error occurred' };
  }
}


