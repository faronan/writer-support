import { useMutation } from '@apollo/client';
import { CreateProofreadingDocument } from '@graphql/graphql-operations';
import { Layout } from '@/components/templates/layout';
import { ProofreadingComponent } from '@/components/organisms/ProofreadingComponent';

export default function Check() {
  const [, { loading: mutationLoading }] = useMutation(
    CreateProofreadingDocument,
  );

  return (
    <Layout isLoading={mutationLoading}>
      <ProofreadingComponent></ProofreadingComponent>
    </Layout>
  );
}
