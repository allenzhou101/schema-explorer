// Define TypeScript interfaces that match the structure of your YAML data.
interface RelationDefinition {
    name: string;
    complexDefinition?: ComplexDefinition;
  }
  
  interface ComplexDefinition {
    nType: string;
    children?: Child[];
  }
  
  interface Child {
    nType: string;
    expression: Expression;
  }
  
  interface Expression {
    neType: string;
    relationDefinition?: string;
    relationDefinitionNamespace?: string;
    targetRelationDefinition?: string;
    targetRelationDefinitionNamespace?: string;
  }
  
  interface Namespace {
    name: string;
    relationDefinitions: RelationDefinition[];
  }
  
  interface Schema {
    name: string;
    namespaces: Namespace[];
  }



  // Define TypeScript interfaces that match the structure of your ForceGraph data.
  interface Node {
    id: string;
    name: string;
    val?: number;
    type: 'schema' | 'namespace' | 'entity';
  }
  
  interface Link {
    source: string;
    target: string;
  }

  

  export type { RelationDefinition, ComplexDefinition, Child, Expression, Namespace, Schema, Node, Link };