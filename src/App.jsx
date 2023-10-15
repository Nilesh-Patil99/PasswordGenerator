import { useState, useCallback,useEffect, useRef } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

function App() {
  const [length, setLength] = useState(8);
  const [numAllowed, setNumAllowed] = useState(false);
  const [charAllowed, setCharAllowed] = useState(false);
  const [password, setPassword] = useState("");
  const passwordRef= useRef(null)
  const passWordGenerator = useCallback(() => {
    let pass = "";
    let str = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
    if (numAllowed) str += 1234567890;
    if (charAllowed) str += "!@#$%^&*()_";
    for (let i = 1; i <= length; i++) {
      pass += str.charAt(Math.floor(Math.random() * str.length + 1));
    }
    setPassword(pass);
  }, [length, charAllowed, numAllowed]);
  const copyToclipboard= useCallback(()=>{
    passwordRef.current?.select()
    passwordRef.current?.setSelectionRange(0,length)
    window.navigator.clipboard.writeText(password)
    
    
  }, [password])
  useEffect(()=>{
    passWordGenerator()
  },[length,numAllowed.charAllowed,passWordGenerator])
  return (
    <>
      <div className="w-screen max-w-md mx-auto my-8 text-orange-500 rounded-lg px-4 shadow-md bg-gray-600">
        <h1 className="text-white text-lg py-2 text-center">
          Password generator
        </h1>
        <div className="flex shadow rounded-lg overflow-hidden mb-4">
          <input
            readOnly
            ref={passwordRef}
            value={password}
            className="w-full  px-3 outline-none rounded-lg my-1  "
            placeholder="Password"
          ></input>
          <button onClick={copyToclipboard} className="bg-blue-600 text-white mx-2 my-2 strink-0">
            Copy
          </button>
        </div>
        <div className="flex gap-x-2 text-sm">
          <div className="flex items-center gap-x-1">
            <input
              type="range"
              min={6}
              max={20}
              value={length}
              onChange={(e) => setLength(e.target.value)}
            ></input>
            <label>length {length}</label>
            <input
              type="checkbox"
              defaultChecked={charAllowed}
              id="charInput"
              onChange={()=> {setCharAllowed((prev) => !prev)}}
            ></input>
            <label htmlFor="charInput">Character </label>
            <input
              type="checkbox"
              defaultChecked={numAllowed}
              id="numberInput"
              onChange={()=> {setNumAllowed((prev) => !prev)}}
            ></input>
            <label htmlFor="numberInput">Numbers </label>
          </div>
        </div>
       
      </div>
      <p className="text-white text-center justify-center item-end">Made with ❤ By Nilesh </p>
    </>
  );
}

export default App;
