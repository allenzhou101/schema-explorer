"use client"

import jsYaml from 'js-yaml';

import { useEffect, useState } from "react";
import CodeEditor from "./_components/codeEditor";
import ForceGraph from "./_components/forceGraph";
import { Schema } from '@/util/types';
import CustomLoadingIndicator from './_components/customLoadingIndicator';


export default function Home() {
  const [schemaData, setSchemaData] = useState<string | undefined>(undefined);
  useEffect(() => {
    fetch('/defaultSchema.yaml')
    .then(response => response.text())
    .then(yaml => {
      setSchemaData(yaml);
    })
    .catch(error => {
      console.error('Error loading YAML data:', error);
    });
  },[]);
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
            <div className="w-full bg-[#1E1E1E] rounded-md border border-[#494949] overflow-hidden h-[600px]">
              {schemaData === undefined ? (
                <CustomLoadingIndicator/>
              ) : (
                <CodeEditor initialData={schemaData} />
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
      </div>
    </main>
  )
}