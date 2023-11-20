import DescopeClient from '@descope/node-sdk';
import { assert } from 'console';

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
      
    //   assert(resp[0].hasRelation);
    //   assert(resp[1].hasRelation);
}


type AuthzRelationQuery = {
    resource: string;
    relationDefinition: string;
    namespace: string;
    target: string;
    hasRelation?: boolean;
  };