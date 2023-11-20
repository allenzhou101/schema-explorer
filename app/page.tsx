"use client"

import jsYaml from 'js-yaml';
import { useEffect, useState } from "react";
import CodeEditor from "../components/schema/codeEditor";
import ForceGraph from "../components/preview/forceGraph";
import CustomLoadingIndicator from '../components/customLoadingIndicator';
import PrimaryButton from '../components/buttons/primaryButton';
import PrimaryModal from '@/components/modals/primaryModal';
import sectionHeight from '@/util/constants';
import { Editor } from '@monaco-editor/react'
import { useFetchData } from '@/util/hooks/useFetchData';

export default function Home() {
  const [editorContent, setEditorContent] = useState<string | undefined>(undefined); // Content of code editor
  const [isYamlValid, setIsYamlValid] = useState(true); // Whether the code editor format is valid
  const [openModal, setOpenModal] = useState(false)


  const endpoints = [
    '/examples/files/relations.ts',
    '/examples/files/assertions.ts',
    '/examples/files/schema.yaml',
  ];

  const [fetchedData, fetchError] = useFetchData(endpoints);

  const [schemaData, setSchemaData] = useState<string | undefined>(undefined); // Content of code editor
  const [relations, setRelations] = useState<string | undefined>(undefined); // Content of code editor
  const [assertions, setAssertions] = useState<string | undefined>(undefined); // Content of code editor


  useEffect(() => {
    // TODO: Clean up data fetching
    if (fetchedData) {
      // @ts-ignore
      const tempSchema = fetchedData[endpoints[2]];
      setSchemaData(tempSchema);
      setEditorContent(tempSchema);

      // @ts-ignore
      const tempRelations = fetchedData[endpoints[0]];
      setRelations(tempRelations);

      // @ts-ignore
      const tempAssertions = fetchedData[endpoints[1]];
      setAssertions(tempAssertions);
    }
  }, [fetchedData]);

  if (fetchError) {
    console.error('Error fetching data:', fetchError);
  }

  const handleEditorChange = (content: string) => {
    setEditorContent(content); // Update editor content on change
    if (content) {
      try {
        jsYaml.load(content); // Try parsing the YAML
        setIsYamlValid(true); // If no error, set YAML as valid
      } catch (e) {
        setIsYamlValid(false); // If error, set YAML as invalid
      }
    }
  };

  const handleSave = () => {
    try {
      setSchemaData(editorContent); // Update the schema data with the editor content on save
    } catch (e) {
      console.error('Error parsing YAML data:', e);
    }
  }

  return (
    <main
      className="flex min-h-screen flex-col items-center bg-[#121212] px-4 xl:px-12 py-8"
    >
      <div className="max-w-screen-4xl w-full">
        <div
          className="p-4"
        >
          <h1 className="text-gray-100 text-3xl font-bold">ReBAC Explorer</h1>
          <h2 className="text-gray-400 text-xs">Edit, preview, and save your Descope ReBAC Schema. Try different example schemas for <a href="/exampleSchemas/courses.yaml" target="_blank" className="underline">courses</a>, <a href="/exampleSchemas/inventory.yaml" target="_blank" className="underline">inventory</a> 
          , <a href="/exampleSchemas/projects.yaml" target="_blank" className="underline">projects</a>
          , and <a href="/exampleSchemas/eCommerce.yaml" target="_blank" className="underline">E-commerce</a>.
          Check out the <a href="https://docs.descope.com/manage/authorization/rebac/" target="_blank" className="underline">ReBAC docs</a> for more information.
          
          </h2>
        </div>
        <div className="flex flex-col md:flex-row">
          <div className="w-full md:w-1/2 p-4">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-md text-gray-500 dark:text-gray-300 font-medium">Schema</h2>
              <div className="space-x-2 flex flex-row items-center">
                <PrimaryModal
                  open={openModal}
                  setOpen={setOpenModal}
                  title="Generate a schema using AI"
                  description="Tell us about your application structure and functionality, and a ReBAC schema will be generated for you."
                  confirmText='Generate'
                  placeholderText='Describe your application here. What are the entities? What are the relationships between them?'
                  onConfirm={() => {
                    // setOpenModal(false)
                  }}
                />
                {/* <VariantButton onClick={() => setOpenModal(true)}>AI Generate</VariantButton> */}
                {/* {!isYamlValid && <p className="text-gray-400 text-[10px] italic">*You have YAML formatting errors. Fix them to save.*</p>} */}
                <PrimaryButton onClick={handleSave} disabled={!isYamlValid}>Save</PrimaryButton>
              </div>
            </div>
            <div className={`w-full bg-[#1E1E1E] rounded-md border border-[#494949] overflow-hidden h-[${sectionHeight}px]`}>
              {schemaData === undefined ? (
                <CustomLoadingIndicator/>
              ) : (
                <CodeEditor editorContent={editorContent} onChange={handleEditorChange} />
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-md text-gray-500 dark:text-gray-300 mb-4 font-medium">Preview</h2>
            <div className={`w-full bg-[#1E1E1E] rounded-md border border-[#494949] overflow-hidden h-[700px]`}>
              <ForceGraph
                schema={schemaData}
              />
            </div>
          </div>
        </div>
        {/* <div className="w-full p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-md text-gray-300 font-medium">Explanation</h2>
                <p className="text-xs text-gray-400">Get an explanation of the schema you have saved.</p>
              </div>
              <div className="space-x-2 flex flex-row items-center">
                <PrimaryButton onClick={() => {
                  
                }}>Generate</PrimaryButton>
              </div>
            </div>            
            <div className="w-full bg-[#1E1E1E] rounded-md border border-[#494949] overflow-hidden min-h-[200px]">
              
            </div>
        </div> */}
        
      </div>
      <div className="flex flex-col md:flex-row w-full">
      <div className="w-full md:w-1/2 p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-md text-gray-300 font-medium">Relations</h2>
                <p className="text-xs text-gray-400">Relations define specific Relation Definitions between Targets and Resources.</p>
              </div>
              {/* <div className="space-x-2 flex flex-row items-center">
                <PrimaryButton onClick={() => {
                  
                }}>Generate</PrimaryButton>
              </div> */}
            </div>            
            <div className={`w-full bg-[#1E1E1E] rounded-md border border-[#494949] overflow-hidden h-[${sectionHeight}px]`}>
              <Editor
                height={`${sectionHeight}px`}
                width="100%"
                defaultLanguage="typescript"
                defaultValue={relations}
                theme="vs-dark"
                loading={<CustomLoadingIndicator />}
                options={{
                  cursorStyle: "line",
                  formatOnPaste: true,
                  formatOnType: true,
                  minimap: { enabled: false },
                  wordWrap: "on",
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
        </div>
        <div className="w-full md:w-1/2 p-4">
            <div className="flex justify-between items-center mb-4">
              <div>
                <h2 className="text-md text-gray-300 font-medium">Assertions</h2>
                <p className="text-xs text-gray-400">Check if Relation Definitions exist between Targets and Resources.</p>
              </div>
              {/* <div className="space-x-2 flex flex-row items-center">
                <PrimaryButton onClick={() => {
                  
                }}>Generate</PrimaryButton>
              </div> */}
            </div>            
            <div className={`w-full bg-[#1E1E1E] rounded-md border border-[#494949] overflow-hidden h-[${sectionHeight}px]`}>
              <Editor
                height={`${sectionHeight}px`}
                width="100%"
                defaultLanguage="typescript"
                defaultValue={assertions}
                theme="vs-dark"
                loading={<CustomLoadingIndicator />}
                options={{
                  cursorStyle: "line",
                  formatOnPaste: true,
                  formatOnType: true,
                  minimap: { enabled: false },
                  wordWrap: "on",
                  scrollBeyondLastLine: false,
                }}
              />
            </div>
        </div>
      </div>
    </main>
  )
}
