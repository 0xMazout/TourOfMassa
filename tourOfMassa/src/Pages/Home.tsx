import React, { useRef } from "react";
import massaLogoLight from "../assets/Massa_Dark_Detailed_Low.png";
import Editor, { useMonaco } from "@monaco-editor/react";
import * as monaco from "monaco-editor";
function Home() {
	//Fetch the data from the API
	//Fetch Title , Description, Code Snippet
	// const populateHome = () => {
	//     fetch("http://localhost:3000/api/tour")
	//         .then((response) => response.json())
	//         .then((data) => console.log(data));
	// };
	// populateHome();

    // const editorRef = useRef();
    // function handleEditorDidMount(editor:monaco.editor.IStandaloneCodeEditor, _monaco:any) {
    //   editorRef.current = editor; 
    // }
    // function showValue() {
    //     editorRef.current
    //     alert( editorRef.current?.getValue());
    //   }
      function handleEditorChange(value: any, event: any) {
        console.log("here is the current model value:", value);
      }
    //   const monacoo = useMonaco();
    //   monacoo?.Selection.fromPositions("")
	return (
		<>
			<div className="p-5 flex items-center justify-between">
				<img className="max-h-6" src={massaLogoLight} alt="Thyra Logo" />
				<h1 className="text-2xl ml-6 font-bold ">Massa Tour</h1>
                <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ">
						Run
				</button>
			</div>
            
			<section className="h-full grid grid-cols-2 flex-col bg-slate-700">
				{/* This is the Block of Documentation Description */}
				<div className="h-full flex flex-col">
					<div className="flex flex-col">
						<h1 className="text-2xl font-bold">Tour of Massa</h1>
						<p className="text-sm">
							This is a documentation of the Massa project
						</p>
					</div>
				</div>
				<div className="flex">
					<Editor
						height="80vh"
						defaultLanguage="typescript"
						theme="vs-dark"
						defaultValue="// some comment"

                        // onMount={handleEditorDidMount}
                        onChange={handleEditorChange}
					/>

				</div>
			</section>
		</>
	);
}

export default Home;
