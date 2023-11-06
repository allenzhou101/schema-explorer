import CodeEditor from "./_components/codeEditor";
import ForceGraph from "./_components/forceGraph";

export default function Home() {
  return (
    <main
       className="flex min-h-screen flex-col bg-gray-100 dark:bg-gray-900"
     >
      <div
        className="p-4"
      >
        <h1 className="text-gray-100 text-xl font-semibold">ReBAC Explorer</h1>
        <h2 className="text-gray-400 text-sm">Edit, preview, and save your Descope ReBAC Schema.</h2>
      </div>
      <div className="flex flex-col md:flex-row">
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Code Editor</h2>
          <div className="w-full bg-white dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 overflow-hidden">
            <CodeEditor
              initialData={initialEditorData}
            />
          </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
          <h2 className="text-lg font-semibold text-gray-700 dark:text-gray-300 mb-4">Preview</h2>
          <div className="w-full bg-white dark:bg-gray-800 rounded-md border border-gray-300 dark:border-gray-700 overflow-hidden" style={{height: "600px"}}>
            <ForceGraph
              nodes={nodes}
            />
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
        "name": "name1",
        "val": 1 
      },
      { 
        "id": "id2",
        "name": "name2",
        "val": 10 
      },
  ],
  "links": [
      {
          "source": "id1",
          "target": "id2"
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
