import { useMutation } from '@apollo/client';
import { useSession } from 'next-auth/client';
import { CreateProofreadingDocument } from '@graphql/graphql-operations';
import { AppHead } from '@/components/atoms/AppHead';
import { LoadingText } from '@/components/atoms/LoadingText';
import { AuthComponent } from '@/components/organisms/AuthComponent';

export default function Home() {
  const [, { loading: mutationLoading }] = useMutation(
    CreateProofreadingDocument,
  );

  const [, sessionLoading] = useSession();

  return (
    <div>
      <AppHead></AppHead>

      <main>
        {sessionLoading || mutationLoading ? (
          <LoadingText></LoadingText>
        ) : (
          <AuthComponent></AuthComponent>
        )}
      </main>
    </div>
  );
}
