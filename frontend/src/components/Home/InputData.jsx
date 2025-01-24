import React from 'react'
import { RxCross2 } from "react-icons/rx";

const InputData = ({InputDiv, setInputDiv }) => {
  return (
    <>
    <div className={`${InputDiv} fixed top-0 left-0 bg-gray-800 opacity-80 h-screen w-full`}></div>
    <div className={`${InputDiv} fixed top-0 left-0 text-white flex items-center justify-center h-screen w-full`}>
        <div className='w-3/6 p-3 bg-gray-800 rounded my-3'>

        <div className='p-2 flex justify-end'>
            <button className='text-2xl'onClick={()=> setInputDiv("hidden")} ><RxCross2 /></button>
        </div>

        <input type="text" placeholder='title' name='title' className='px-3 py-2 rounded w-full border bg-gray-700' />
        <textarea
        name="desc"
        cols="30"
        rows="10"
        placeholder='description'
        className='px-3 py-2 rounded w-full my-2 bg-gray-700'>
        </textarea>

            <button className='px-3 py-2 rounded text-xl font-semibold bg-blue-500'>Submit</button>


        </div>
    </div>
    
    </>
  )
}

export default InputData