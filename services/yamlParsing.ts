import jsYaml from 'js-yaml';
import { Link, Node } from '../util/types';

export function parseYamlToNodes(yamlString: string): { nodes: Node[]; links: Link[] } {
  // Parse the YAML string into a JavaScript object
  const yamlObject: any = jsYaml.load(yamlString);
  
  // Initialize your nodes and links arrays
  const nodes: Node[] = [];
  const links: Link[] = [];

  // Add the project schema as a node
  if (yamlObject && yamlObject.name) {
    if (yamlObject.name) {
      nodes.push({
        id: 'schema',
        name: yamlObject.name,
        type: 'schema'
      });
    }

    // Logic to convert YAML structure to nodes and links

    // For each namespace, create a node and link it to the parent schema
    yamlObject.namespaces?.forEach((namespace: any, index: number) => {
      const namespaceName = namespace.name;
      nodes.push({
        id: namespaceName,
        name: namespaceName,
        type: 'namespace'
      });

      links.push({
          source: namespaceName,
          target: 'schema'
      })

      // Create links for relation definitions if any
      namespace.relationDefinitions?.forEach((relation: any, relIndex: number) => {
        // const relationNodeId = `relation${namespaceNodeId}_${relIndex + 1}`;
        const relationDefinitionNodeId = `${namespaceName}#${relation.name}`;
        nodes.push({
          id: relationDefinitionNodeId,
          name: relation.name,
          type: 'entity'
        });
        links.push({
          source: namespaceName,
          target: relationDefinitionNodeId
        });

        if (relation.complexDefinition) {
          if (relation.complexDefinition.nType === 'union') {
              relation.complexDefinition.children.forEach((child: any, childIndex: number) => {
                const neType = child.expression.neType;
                if (neType === "self") {

                } else if (neType === "relationLeft") {

                } else if (neType === "relationRight") {

                } else if (neType === "targetSet") {
                  const targetRelationDefinition = child.expression.targetRelationDefinition;
                  const targetRelationDefinitionNamespace = child.expression.targetRelationDefinitionNamespace;
                  links.push({
                    source: relationDefinitionNodeId,
                    target: `${targetRelationDefinitionNamespace}#${targetRelationDefinition}`,
                  });
                }

              });
          }
        }
      });
    });
  }
  
  

  // Return the nodes and links in the structure expected by ForceGraph component
  return { nodes, links };
}

