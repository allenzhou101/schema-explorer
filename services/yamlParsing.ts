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
      const namespaceNodeId = `namespace${index + 1}`;
      nodes.push({
        id: namespaceNodeId,
        name: namespace.name,
        type: 'namespace'
      });

      links.push({
          source: namespaceNodeId,
          target: 'schema'
      })

      // Create links for relation definitions if any
      namespace.relationDefinitions?.forEach((relation: any, relIndex: number) => {
        const relationNodeId = `relation${namespaceNodeId}_${relIndex + 1}`;
        nodes.push({
          id: relationNodeId,
          name: relation.name,
          type: 'entity'
        });
        links.push({
          source: namespaceNodeId,
          target: relationNodeId
        });
      });
    });
  }
  
  

  // Return the nodes and links in the structure expected by ForceGraph component
  return { nodes, links };
}

