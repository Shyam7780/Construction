import supabase from './supabase';

const OWNER_EMAIL = 'owner@premierbuild.com';

export function isOwnerEmail(email: string | undefined): boolean {
  return email === OWNER_EMAIL;
}

const isMobile = () => /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

export function signInWithGoogle() {
  const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
  const redirectUri = import.meta.env.VITE_GOOGLE_AUTH_PROXY;

  if (!clientId || !redirectUri) {
    alert('Google OAuth is not configured. Please contact the site owner.');
    return;
  }

  const state = btoa(JSON.stringify({
    origin: window.location.origin,
    appName: 'PremierBuild Admin',
    supabaseUrl: import.meta.env.VITE_SUPABASE_URL,
    supabaseAnonKey: import.meta.env.VITE_SUPABASE_ANON_KEY
  }));

  const url = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${encodeURIComponent(redirectUri)}&response_type=code&scope=openid%20email%20profile&prompt=select_account&state=${encodeURIComponent(state)}`;

  window.open(url, 'google-auth', isMobile() ? '' : 'width=500,height=600');
}

export async function signOut() {
  await supabase.auth.signOut();
}

// Handle redirect fallback
export async function handleGoogleRedirect() {
  const params = new URLSearchParams(window.location.search);
  const token = params.get('google_id_token');
  if (!token) return;

  window.history.replaceState({}, '', window.location.pathname);

  const { error } = await supabase.auth.signInWithIdToken({
    provider: 'google',
    token
  });
  if (error) console.error('Google sign-in error:', error);
}
