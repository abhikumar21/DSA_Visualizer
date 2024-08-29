import React, { useEffect, useState } from 'react'
import Queen from '../HomePage/images/queen.png'

const NQueens = () => {
  
  const [matrix, setMatrix] = useState([]);
  const [n, setN] = useState(4);
  const [solutionFound, setSolutionFound] = useState(false);


  useEffect(() => {
    initializeMatrix();
  }, [n]);

  const initializeMatrix = () => {
    let newMatrix = Array(n).fill().map(() => Array(n).fill('.'));
    setMatrix(newMatrix);
  };


  const isAttacked=(x, y, mat, n)=>{

    for(let i=0;i<x;i++) {
      if(mat[i][y]==='Q'){
        return true;
      }
    }

    for(let i=x, j=y; i>=0 && j>=0 ; i--, j--) {
      if(mat[i][j]==='Q') {
        return true;
      }
    }

    for(let i=x, j=y; i>=0 && j<n ; i--, j++) {
      if(mat[i][j]==='Q') {
        return true;
      }
    }

    return false;
  }

  const fQueens = async (n, mat, row) => {
    if (row === n) {
      setSolutionFound(true);
      return true;
    }
    for (let j = 0; j < n; j++) {
      const checkAttack = await isAttacked(row, j, mat, n);
      // console.log(mat, checkAttack, row, j);
      if (!checkAttack) {
        const newMat = mat.map(row => [...row]); // Creating a new copy of the matrix
        newMat[row][j] = 'Q';
        setMatrix(newMat);
        await sleep(100); // Adding a delay to visualize the process
        if (await fQueens(n, newMat, row + 1)) {
          return true; // Return true if a solution is found
        }
        newMat[row][j] = '.';
        setMatrix(newMat);
      }
    }
    return false; // Return false if no solution is found
  };
  

  const solveNQueens=()=> {
    // let mat = [];
    // let n = 5;
    // for(let i=0;i<n;i++) {
    //   let arr = [];
    //   for(let j=0;j<n;j++) {
    //     arr[j]='.';
    //   }
    //   mat[i]=arr;
    // }
    fQueens(n, matrix, 0);
    // console.log(mat);   
  }

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  // useEffect(()=> {
  //   let array = [];
  //   let n = 5;
  //   for(let i=0;i<n;i++) {
  //     array[i]=[];
  //     for(let j=0;j<n;j++) {
  //       array[i][j]='.';
  //     }
  //   }
  //   setMatrix(array);
  // }, [])


const handleChange=(e)=> {
  setN(parseInt(e.target.value, 10));
}


  return (
    <div className='nqueens w-screen h-screen flex flex-col'>
      <div className="head w-full bg-amber-900 text-white flex h-[60px] justify-evenly items-center">
        <div className="size flex h-full items-center gap-10">
          <span>Choose grid size</span>
          <span className='flex'><input className='mx-4 w-[100%]' onChange={(e)=>handleChange(e)} type="range" min="1" max="9" step="1" value={n} /> <div>{n}</div></span>
          <button onClick={()=>solveNQueens()} className='solve bg-violet-300 text-black h-[35px] px-5 rounded-lg'>Solve</button>
        </div>
        <button className='bg-black h-[35px] px-5 rounded-lg'>Reset</button>
      </div>
      <div className="matrix w-full h-full flex flex-col items-center justify-center">

        {/* return jsx from both maps */}
       <div className="board bg-slate-700 w-auto h-auto p-2 my-10">
        {matrix.map((rows, rowIndex)=> (
            <div className="rows flex" key={rowIndex}>
              {rows.map((cols, colIndex)=> (
                <div key={colIndex} className={`box h-20 w-20 ${(colIndex+rowIndex)%2===0 ? 'bg-violet-700' : 'bg-violet-300'} overflow-hidden flex items-center justify-center`}>
                  <img className={`h-[80%] w-auto display ${cols=='Q' ? "block" : "hidden"} `} src={Queen}></img>
                  </div>
                ))
              }
            </div>
          ))
        }
        </div>

      </div>
    </div>
  );
}

export default NQueens
