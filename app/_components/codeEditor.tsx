'use client'

import React from "react";
import Editor from "@monaco-editor/react";
import CustomLoadingIndicator from "./customLoadingIndicator";

function CodeEditor(props: any) {
  const initialStates = {
    codeText: props.initialData
  };

  const [state, setState] = React.useState(initialStates.codeText);
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
