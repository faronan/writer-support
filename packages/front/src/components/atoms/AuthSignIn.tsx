import { signIn } from 'next-auth/client';

export const AuthSignIn = () => {
  return (
    <div>
      <button
        onClick={async (e) => {
          e.preventDefault();
          await signIn('google');
        }}
      >
        Sign in
      </button>
      <button
        onClick={async (e) => {
          e.preventDefault();
          await signIn("credentials");
        }}
      >
        ゲストログイン
      </button>
    </div>
  );
};
