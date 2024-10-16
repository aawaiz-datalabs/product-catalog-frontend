'use server'

import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs'
import { cookies } from 'next/headers'

export async function login(formData: FormData) {
  const email = formData.get('email') as string
  const password = formData.get('password') as string

  const supabase = createRouteHandlerClient({ cookies })

  try {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) {
      return { error: error.message }
    }

    return { user: data.user, session: data.session }
  } catch (e) {
    console.error('Login error:', e)
    return { error: 'Failed to log in' }
  }
}