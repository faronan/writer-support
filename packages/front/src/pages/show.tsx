import { useQuery } from '@apollo/client';
import { ProofreadingDataListDocument } from '@graphql/graphql-operations';
import { Layout } from '@/components/templates/layout';
import { DataListComponent } from '@/components/organisms/DataListComponent';

export default function Show() {
  const { loading: queryLoading } = useQuery(ProofreadingDataListDocument);

  return (
    <Layout isLoading={queryLoading} requiresAuth={true}>
      <DataListComponent></DataListComponent>
    </Layout>
  );
}
