
import { useCallback, useEffect, useRef, useState } from 'react'
import './App.css'

function App() {
 const [length, setLength] = useState(8);
 const [number, setNumber] = useState(false);
 const [characters, setCharacters] = useState(false);
 const [password, setPassword] = useState('');

 const passwordRef = useRef(null);

 const passwordGenerator = useCallback(()=>{
let pass =''
let str='ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz'

if(number) str += "0123456789"
if(characters) str += "!@#$%^&*()?{}~"

for (let i = 1; i <=length; i++) {
let char = Math.floor(Math.random()*str.length +1) 
pass += str.charAt(char)
setPassword(pass) 
}
 },[length, number, characters, setPassword])

 const copypasswordToClipborad = useCallback(()=>{
  passwordRef.current?.select()
  passwordRef.current?.setSelectionRange(0, 100)
window.navigator.clipboard.writeText(password)
 }, [password])
 useEffect(()=>{
passwordGenerator();
 },[length, number, characters, passwordGenerator])
  return (
    <>
      <div className='  w-full max-w-md mx-auto shadow-md rounded-lg px-4 py-5 text-center my-10 text-range-500 bg-gray-950  '>
        <h1 className='text-slate-50 text-xl text-center'>Password Generator </h1>
        <div className='flex shadow rounded-lg overflow-hidden mb-4 mt-4 text-orange-400'>
          <input
           type='text'
           value={password}
           className='outline-none w-full py-1 px-3'
           placeholder='password'
           readOnly 
           ref={passwordRef}
           />
           <button className='bg-blue-600 px-4 text-orange-400 hover:bg-blue-800 shrink-0 py-0.5' onClick={copypasswordToClipborad}>copy</button>
        </div>
        <div className='flex text-sm gap-x-2'>
          <div className='flex items-center gap-x-1'>
            <input 
            type="range"
            min={6}
            max={100}
            value={length}
            className='cursor-pointer'
            onChange={(e)=>{setLength(e.target.value)}}
           />
           <label htmlFor=""className='text-orange-400'>Length :{length}</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox"
            defaultChecked={number}
            id='numberInput'
            onChange={()=>{setNumber((prev)=>!prev);}}
           />
            <label htmlFor=""className='text-orange-400'>Numbers</label>
          </div>
          <div className='flex items-center gap-x-1'>
          <input 
            type="checkbox"
            defaultChecked={number}
            id='characterInput'
            onChange={()=>{setCharacters((prev)=>!prev);}}
           />
            <label htmlFor=""className='text-orange-400'>Characters</label>
          </div>
        </div>


       </div>
    </>
  )
}

export default App
