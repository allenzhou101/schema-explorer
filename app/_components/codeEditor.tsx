'use client'

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import CustomLoadingIndicator from "./customLoadingIndicator";

interface CodeEditorProps {
  initialData: string | undefined;
}

function CodeEditor(props: CodeEditorProps) {
  const { initialData } = props;

  const initialStates = {
    codeText: initialData
  };

  const [state, setState] = useState(initialStates.codeText);
  const handleEditorChange = (value: any, event: any) => {
    setState(value);
  };

  return (
    <>
      <Editor
        height="600px"
        width="100%"
        defaultLanguage="yaml"
        defaultValue={state}
        onChange={handleEditorChange}
        theme="vs-dark"
        loading={<CustomLoadingIndicator/>}
        options={{
          cursorStyle: "line",
          formatOnPaste: true,
          formatOnType: true,
          minimap: { enabled: false },
          wordWrap: "on",
          scrollBeyondLastLine: false,
        }}
        onMount={(editor, monaco) => {
          setTimeout(function () {
            // editor.getAction("editor.action.formatDocument").run();
          }, 300);
        }}
      />
    </>
  );
}

export default CodeEditor;
