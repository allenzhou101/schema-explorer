"use client"

import jsYaml from 'js-yaml';
import { useEffect, useState } from "react";
import CodeEditor from "../components/schema/codeEditor";
import ForceGraph from "../components/preview/forceGraph";
import CustomLoadingIndicator from '../components/customLoadingIndicator';
import PrimaryButton from '../components/buttons/primaryButton';
import VariantButton from '@/components/buttons/variantButton';
import PrimaryModal from '@/components/modals/primaryModal';


export default function Home() {
  const [schemaData, setSchemaData] = useState<string | undefined>(undefined); // Schema being previewed
  const [editorContent, setEditorContent] = useState<string | undefined>(undefined); // Content of code editor
  const [isYamlValid, setIsYamlValid] = useState(true); // Whether the code editor format is valid
  const [openModal, setOpenModal] = useState(false)

  useEffect(() => {
    fetch('/exampleSchemas/files.yaml')
      .then(response => response.text())
      .then(yaml => {
        setSchemaData(yaml);
        setEditorContent(yaml); // Initialize editorContent with the fetched YAML
      })
      .catch(error => {
        console.error('Error loading YAML data:', error);
      });
  },[]);

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
      className="flex min-h-screen flex-col items-center bg-[#121212] px-8 lg:px-24 py-8"
    >
      <div className="max-w-screen-2xl w-full">
        <div
          className="p-4"
        >
          <h1 className="text-gray-100 text-3xl font-bold">Schema Explorer</h1>
          <h2 className="text-gray-400 text-xs">Edit, preview, and save your Descope ReBAC Schema. Try different example schemas for <a href="/exampleSchemas/courses.yaml" target="_blank" className="underline">courses</a>, <a href="/exampleSchemas/inventory.yaml" target="_blank" className="underline">inventory</a> 
          , <a href="/exampleSchemas/projects.yaml" target="_blank" className="underline">projects</a>
          , and <a href="/exampleSchemas/eCommerce.yaml" target="_blank" className="underline">E-commerce</a>.
          
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
                  title="AI Generated Schema"
                  description="Tell us about your application structure and functionality, and we'll generate a ReBAC schema for you."
                  confirmText='Generate'
                  placeholderText='Describe your application here. What are the entities? What are the relationships between them?'
                  onConfirm={() => {
                    // setOpenModal(false)
                  }}
                />
                <VariantButton onClick={() => setOpenModal(true)}>Generate Schema</VariantButton>
                {/* {!isYamlValid && <p className="text-gray-400 text-[10px] italic">*You have YAML formatting errors. Fix them to save.*</p>} */}
                <PrimaryButton onClick={handleSave} disabled={!isYamlValid}>Save</PrimaryButton>
              </div>
            </div>
            <div className="w-full bg-[#1E1E1E] rounded-md border border-[#494949] overflow-hidden h-[600px]">
              {schemaData === undefined ? (
                <CustomLoadingIndicator/>
              ) : (
                <CodeEditor editorContent={editorContent} onChange={handleEditorChange} />
              )}
            </div>
          </div>
          <div className="w-full md:w-1/2 p-4">
            <h2 className="text-md text-gray-500 dark:text-gray-300 mb-4 font-medium">Preview</h2>
            <div className="w-full bg-[#1E1E1E] rounded-md border border-[#494949] overflow-hidden h-[600px]">
              <ForceGraph
                schema={schemaData}
              />
            </div>
          </div>
        </div>
        <div className="w-full p-4">
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
        </div>
      </div>
    </main>
  )
}