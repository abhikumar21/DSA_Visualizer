import React, { useState } from 'react'

const Queue = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [index, setIndex] = useState(0);
  const [deleteValue, setDeleteValue] = useState([]);



  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }

  const handleAddNode = (e) => {
    e.preventDefault();
    if (inputValue.trim() !== "") {
      const newList = inputValue
        .split(/[\s,]+/) // Split by commas or spaces (one or more)
        .filter((num) => !isNaN(num) && num !== "") // Remove invalid entries
        .map(Number); // Convert strings to numbers
  
      setList([...list, ...newList]); // Spread newList to append its items
      setInputValue(""); // Clear the input field
    }
  };
  

  const handleDeleteNode = (e) => {
    // e.preventDefault();
    setDeleteValue((prev) => [...prev, list[index]]);
    let val = index+1;
    setIndex(val);
  }

  const handleReset = () => {
    setList([]);
    setInputValue("");
    setIndex(0);
    setDeleteValue([]);
  }

  return (
    <div className='h-screen'>
          <div className="head h-14 bg-slate-500 px-5 py-3 flex">
        <form className="addNode mr-10">
          <input 
          type="text"
          value = {inputValue}
          onChange = {handleInputChange}
          className=''
          />
         <button className='mx-2 bg-green-700 px-2 py-1 rounded-md text-white ' onClick = {handleAddNode}>Enqueue</button>
        </form>

         <button className='mx-2 bg-yellow-700 px-2 py-1 rounded-md text-white' onClick={handleDeleteNode}>Dequeue</button>
         <button className='mx-2 bg-red-700 px-2 py-1 rounded-md text-white' onClick={handleReset}>Reset</button>


      </div>
    <div className='flex items-center justify-center h-full'>
      <div className="row flex">
        {list.map((node, key) => {
          return (
            <div className={`num w-12 h-12 flex items-center justify-center border-2 border-black text-white text-2xl ${deleteValue.includes(node) ? 'display-none' : 'bg-violet-700'}`} >{node}</div>
          )
        })}
      </div>
    </div>
    </div>
  )
}

export default Queue
