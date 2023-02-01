import React, { useEffect, useState } from "react";
import massaLogoLight from "../assets/Massa_Dark_Detailed_Low.png";
import Editor from "@monaco-editor/react";
import { getDataFile, run } from "../services/axios";
import {fileType} from "../utils/enums";

function Home() {
  const [valueEditor, setValueEditor] = useState("Loading...");
  const [outputValue, setOutputValue] = useState("Loading...");

  
  
  useEffect(() => {
    getDataFile("").then((res) => {
      setValueEditor(res);
    });
    getDataFile("", fileType.markdown).then((res) => {
      setOutputValue(res);
    });
  }, []);
  
  function handleEditorChange(value: any, event: any) {
    setValueEditor(value);
  }
  
  function onRun() {
    run(valueEditor).then((output) => {
      setOutputValue(output);
    });
  }
  return (
    <>
      <div className="p-5 flex items-center justify-between">
        <img className="max-h-6" src={massaLogoLight} alt="Thyra Logo" />
        <h1 className="text-2xl ml-6 font-bold ">Massa Tour</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          onClick={onRun}
        >
          Run
        </button>
      </div>

      <section className="h-full grid grid-cols-2 flex-col bg-slate-700">
        {/* This is the Block of Documentation Description */}
        <div className="h-full flex flex-col">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Tour of Massa</h1>
            <p className="text-sm">
              {outputValue}
            </p>
          </div>
        </div>
        <div className="flex">
          <Editor
            height="80vh"
            defaultLanguage="typescript"
            defaultValue={valueEditor}
            theme="vs-dark"
            onChange={handleEditorChange}
          />
        </div>
      </section>
      <section className="bg-slate-400">
        <div className="rounded-2xl">
          <h1>Result</h1>
          <pre>{outputValue}</pre>
        </div>
      </section>
    </>
  );
}

export default Home;
