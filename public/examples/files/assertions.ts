// @ts-ignore
import DescopeClient from '@descope/node-sdk';

const descopeClient = DescopeClient({ projectId: '__ProjectID__', managementKey: '__ManagementKey__' });
const authzService = descopeClient.management.authz;


const checkRelations = async () => {
    const relationQueries: AuthzRelationQuery[] = [{
        resource: 'some-doc',
        relationDefinition: 'owner',
        namespace: 'doc',
        target: 'u1'
      },
      {
        resource: 'some-other-doc',
        relationDefinition: 'editor',
        namespace: 'doc',
        target: 'u2'
      }];
      const resp = await authzService.hasRelations(relationQueries);

      resp.data?.forEach((relation: AuthzRelationQuery) => {
        console.log(relation.hasRelation);
      });
}


// Types

type AuthzRelationQuery = {
    resource: string;
    relationDefinition: string;
    namespace: string;
    target: string;
    hasRelation?: boolean;
  };