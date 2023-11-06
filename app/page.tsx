import CodeEditor from "./_components/codeEditor";
import ForceGraph from "./_components/forceGraph";

export default function Home() {
  return (
    <main
      className="flex min-h-screen flex-col items-center bg-[#121212] px-8 lg:px-24 py-8"
    >
      <div className="max-w-screen-2xl w-full">
        <div
          className="p-4"
        >
          <h1 className="text-gray-100 text-3xl font-bold">Schema Explorer</h1>
          <h2 className="text-gray-400 text-xs">Edit, preview, and save your Descope ReBAC Schema.</h2>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-md text-gray-500 dark:text-gray-300 mb-4 font-medium">Schema</h2>
            <div className="w-full bg-[#1E1E1E] rounded-md border border-[#494949] overflow-hidden">
              <CodeEditor
                initialData={initialEditorData}
              />
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-md text-gray-500 dark:text-gray-300 mb-4 font-medium">Preview</h2>
            <div className="w-full bg-[#1E1E1E] rounded-md border border-[#494949] overflow-hidden h-[600px]">
              <ForceGraph
                nodes={nodes}
              />
            </div>
          </div>
        </div>
      </div>
    </main>
  )
}


const nodes = {
  "nodes": [ 
      { 
        "id": "id1",
        "name": "Project",
        "val": 1,
        "type": "schema"
      },
      { 
        "id": "id2",
        "name": "Doc",
        "val": 10,
        "type": "namespace"
      },
      { 
        "id": "id3",
        "name": "Viewer",
        "val": 15,
        "type": "entity"
      },
      { 
        "id": "id4",
        "name": "Editor",
        "val": 15,
        "type": "entity"
      },
      { 
        "id": "id5",
        "name": "Owner",
        "val": 15,
        "type": "entity"
      },

  ],
  "links": [
      {
          "source": "id1",
          "target": "id2"
      },
      {
          "source": "id2",
          "target": "id3"
      },
      {
        "source": "id2",
        "target": "id4"
    },
    {
      "source": "id2",
      "target": "id5"
  },
  ]
}


const initialEditorData = `
name: Files
  namespaces:
    - name: org
      relationDefinitions:
        - name: parent
        - name: member
          complexDefinition:
            nType: union
            children:
              - nType: child
                expression:
                  neType: self // essentially means does this target have a direct relation. If the target is a member of the org
              - nType: child
                expression:
                  neType: relationLeft // essentially is a recursive check traversing down the tree (eg. checking subfolders of the target).
                  relationDefinition: parent // Check the target for a parent relation definition, and do the same for the parent if a parent is found.
                  relationDefinitionNamespace: org // The namespace these relations should be a part of
                  targetRelationDefinition: member // Check if target is a member of org
                  targetRelationDefinitionNamespace: org
`;
