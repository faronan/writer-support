import Head from 'next/head';
import styles from '@/styles/Home.module.css';
import { useQuery } from '@apollo/client';
import { ProofreadingDatasDocument } from '@graphql/graphql-operations';
import { signIn, signOut, useSession } from 'next-auth/client';

export default function Home() {
  const [session, loading] = useSession();

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Create Next App</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className={styles.main}>
        {session && (
          <>
            Signed in as {session.user.name} <br />
            <button onClick={signOut}>Sign out</button>
          </>
        )}
        {!session && (
          <>
            Not signed in <br />
            <button onClick={signIn}>Sign in</button>
          </>
        )}
      </main>
    </div>
  );
}
