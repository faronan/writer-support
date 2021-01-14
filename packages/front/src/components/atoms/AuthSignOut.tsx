import { signOut } from 'next-auth/client';

export const AuthSignOut = () => {
  return (
    <div>
      <button
        onClick={async (e) => {
          e.preventDefault();
          await signOut();
        }}
      >
        Sign Out
      </button>
    </div>
  );
};
