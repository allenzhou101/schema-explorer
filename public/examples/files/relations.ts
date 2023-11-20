// @ts-ignore
import DescopeClient from '@descope/node-sdk';

const descopeClient = DescopeClient({ projectId: '__ProjectID__', managementKey: '__ManagementKey__' });
const authzService = descopeClient.management.authz;


const createRelations = async () => {
  const relations: AuthzRelation[] = [{
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
    }]
  
  await authzService.createRelations(relations);
}


// Types

type AuthzRelation = {
  resource: string;
  relationDefinition: string;
  namespace: string;
  target?: string;
  targetSetResource?: string;
  targetSetRelationDefinition?: string;
  targetSetRelationDefinitionNamespace?: string;
  query?: AuthzUserQuery;
};

type AuthzUserQuery = {
  tenants?: string[];
  roles?: string[];
  text?: string;
  statuses?: UserStatus[];
  ssoOnly?: boolean;
  withTestUser?: boolean;
  customAttributes?: Record<string, any>;
};

enum UserStatus {
  enabled = 'enabled',
  disabled = 'disabled',
  invited = 'invited',
}