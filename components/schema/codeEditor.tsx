import React, { useRef } from "react";
import Editor from "@monaco-editor/react";
import CustomLoadingIndicator from "../customLoadingIndicator";
import sectionHeight from "@/util/constants";

interface CodeEditorProps {
  editorContent: string | undefined;
  onChange: (content: string) => void;
}

function CodeEditor(props: CodeEditorProps) {
  const { editorContent, onChange } = props;

  const handleEditorChange = (value: string | undefined, event: any) => {
    if (value !== undefined) {
      onChange(value);
    }
  };

  return (
    <>
      <Editor
        height={`${sectionHeight}px`}
        width="100%"
        defaultLanguage="yaml"
        defaultValue={editorContent}
        onChange={handleEditorChange}
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
    </>
  );
}

export default CodeEditor;
