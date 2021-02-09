import { useQuery, useMutation } from '@apollo/client';
import {
  CreateProofreadingDocument,
  FindUserDocument,
  CreateUserDocument,
  CreateNgWordDocument,
  CreateTemplateWordDocument,
} from '@graphql/graphql-operations';
import { Layout } from '@/components/templates/layout';
import { ProofreadingComponent } from '@/components/organisms/ProofreadingComponent';

export default function Check() {
  const [, { loading: createProofreadingLoading }] = useMutation(
    CreateProofreadingDocument,
  );
  const [, { loading: createUserLoading }] = useMutation(CreateUserDocument);
  const [, { loading: createNgLoading }] = useMutation(CreateNgWordDocument);
  const [, { loading: createTemplateLoading }] = useMutation(
    CreateTemplateWordDocument,
  );
  const { loading: findUserLoading } = useQuery(FindUserDocument);

  return (
    <Layout
      isLoading={
        createProofreadingLoading ||
        createUserLoading ||
        createNgLoading ||
        createTemplateLoading ||
        findUserLoading
      }
      requiresAuth={true}
    >
      <ProofreadingComponent></ProofreadingComponent>
    </Layout>
  );
}
