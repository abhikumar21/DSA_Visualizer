import React, { useState } from 'react'

const LinkedList = () => {
  const [list, setList] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [deleteValue, setDeleteValue] = useState("");



  const handleInputChange = (e) => {
    setInputValue(e.target.value)
  }
  const handleDeleteChange = (e) => {
    setDeleteValue(e.target.value)
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
    e.preventDefault();
    if(!isNaN(deleteValue) && deleteValue.trim() !== "") {
      const deleteVal = parseInt(deleteValue);
      if (list.includes(deleteVal)) {
        setList(list.filter((node) => node !== deleteVal)); // Remove the node
        setDeleteValue(""); // Clear the input
      }  

    }
  }

  return (
    <div>
      <div className="head h-14 bg-slate-500 px-5 py-3 flex">
        <form className="addNode mr-10">
          <input 
          type="text"
          value = {inputValue}
          onChange = {handleInputChange}
          className=''
          />
         <button className=' mx-2' onClick = {handleAddNode}>Add</button>
        </form>

        <form className="deleteNode">
        <input 
          type="text"
          value = {deleteValue}
          onChange = {handleDeleteChange}
          className='w-16'
          />
         <button className=' mx-2' onClick = {handleDeleteNode}>Delete</button>
        </form>

      </div>


      <div className="linked-list px-5 py-5 flex">
        {/* <div className="head bg-green-400 w-10 h-10 flex items-center justify-center mx-2">null</div> */}

        {list.map((node, idx)=> {
          return (
            <div className='flex'>
              {idx!=0 ? 
              <div className="arrow w-10 h-10 flex items-center justify-center mx-2 "> -> </div> : <></>
              }
              <div className="node bg-green-400 w-10 h-10 flex items-center justify-center mx-2">{node}</div>
           </div>
          )

        })}

      </div>
    </div>
  )
}

export default LinkedList
