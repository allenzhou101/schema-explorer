"use client"

import React from "react";
// import hash from 'object-hash'
import Editor from "@monaco-editor/react";

function CodeEditor(props: any) {
  const initialStates = {
    codeText: props.initialData
  };
//   const [currentHash, setCurrentHash] = React.useState(hash(props.initialData))
  console.log("initialHash value",props.initialHash)
  const [state, setState] = React.useState(initialStates.codeText);
  const settingState = (key: any, value: any) => {
    setState((currentState: any) => {
      let newState = currentState;
      newState[key] = value;
      return newState;
    });
  };
  const handleEditorChange = (value: any, event: any) => {
    // settingState("codeText", value);
    // value = value.replace(/\n/g, '')
    setState(value);
    // setCurrentHash(hash(JSON.parse(value)))
    console.log("value", value)
  };

  return (
    <>
      {/* {state} */}
      {/* <p>Initial Hash: {props.initialHash}</p> */}
      {/* <p>Current Hash: {currentHash}</p> */}
      <Editor
        height="600px"
        width="100%"
        defaultLanguage="yaml"
        defaultValue={state}
        onChange={handleEditorChange}
        options={{
          cursorStyle: "line",
          formatOnPaste: true,
          formatOnType: true,
        //   wordWrap: true
          // autoIndent: "full"
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
