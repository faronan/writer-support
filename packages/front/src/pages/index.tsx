import { useMutation } from '@apollo/client';
import { CreateProofreadingDocument } from '@graphql/graphql-operations';
import { Layout } from '@/components/templates/layout';
import { AuthComponent } from '@/components/molecules/AuthComponent';
import { ProofreadingComponent } from '@/components/organisms/ProofreadingComponent';

export default function Home() {
  const [, { loading: mutationLoading }] = useMutation(
    CreateProofreadingDocument,
  );

  return (
    <Layout isLoading={mutationLoading}>
      <AuthComponent></AuthComponent>
      <ProofreadingComponent></ProofreadingComponent>
    </Layout>
  );
}
