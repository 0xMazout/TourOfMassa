import React, { useEffect, useState } from 'react';
import massaLogoLight from '../assets/Massa_Dark_Detailed_Low.png';
import Editor from '@monaco-editor/react';
import { getDataFile, run } from '../services/axios';
import { fileType } from '../utils/enums';
import ReactMarkdown from 'react-markdown';

function Home() {
  const [valueEditor, setValueEditor] = useState('Loading...');
  const [outputValue, setOutputValue] = useState('Press Run to see the result');
  const [contentValue, setContentValue] = useState('Loading...');
  const [name, setName] = useState('');

  useEffect(() => {
    const handleHashChange = () => {
      setName(window.location.hash.replace('#', ''));
    };
    setName(window.location.hash.replace('#', ''));

    window.addEventListener('hashchange', handleHashChange);

    return () => {
      window.removeEventListener('hashchange', handleHashChange);
    };
  }, []);

  useEffect(() => {
    getDataFile(name).then((res) => {
      setValueEditor(res);
    });
    getDataFile(name, fileType.markdown).then((res) => {
      setContentValue(res);
    });
  }, [name]);

  function handleEditorChange(value: any, event: any) {
    setValueEditor(value);
  }

  function onRun() {
    run(valueEditor, name).then((output) => {
      setOutputValue(output);
    });
  }
  return (
    <>
      <div className="p-5 flex items-center justify-between">
        <img className="max-h-6" src={massaLogoLight} alt="Thyra Logo" />
        <h1 className="text-2xl font-bold ">Massa In Actions</h1>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded "
          onClick={onRun}
        >
          Run
        </button>
      </div>

      <section className="grid grid-cols-2 flex-col text-white bg-slate-700 ">
        <div className="overflow-auto text-justify flex flex-col h-[60vh]">
          <div className="flex flex-col">
            <h1 className="text-2xl font-bold">Documentation</h1>
            <ReactMarkdown children={contentValue} />
          </div>
        </div>
        <div className="flex h-[60vh]">
          <Editor
            height=""
            defaultLanguage="typescript"
            defaultValue={valueEditor}
            theme="vs-dark"
            onChange={handleEditorChange}
            className=""
            value={valueEditor}
          />
        </div>
      </section>
      <section className="bg-slate-400 h-[60vh]">
        <div className="rounded-2xl">
          <h1 className=" text-2xl">Result</h1>
          <pre>{outputValue}</pre>
        </div>
      </section>
    </>
  );
}

export default Home;
