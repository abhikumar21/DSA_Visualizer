import React, { useState, useEffect, useRef } from 'react';


function randomIntFromInterval(min, max) {
  return Math.floor(Math.random() * (max - min + 1) + min);
}


export const Sorting =() => {
  const [array, setArray] = useState([]);
  const [boolfn, setBoolfn] = useState(0);
  const [nval, setNval] = useState(15);

  useEffect(() => {
    resetArray();
    // console.log(array, "unsorted");
  }, [nval]);

  useEffect(() => {
    const barElements = document.querySelectorAll('.bar');
    barElements.forEach(bar => {
      bar.style.backgroundColor = 'rgb(234 88 12)';
    });
  }, [array]);


  const resetArray = () => {
    const newArray = [];
    for (let i = 0; i < nval; i++) {
      newArray.push(randomIntFromInterval(50, 600));
    }
    setArray(newArray);
  };

/////////////////////////insertion Sort start
const insertionSort = async(array)=> {
  for(let i=1;i<array.length;i++) {
    let current = array[i];
    let j=i-1;
    const bar1 = document.getElementById(`bar${i}`);
    bar1.style.backgroundColor = "yellow";
    while(array[j]>current && j>=0) {
      const bar2 = document.getElementById(`bar${j}`);
      const bar3 = document.getElementById(`bar${j+1}`);
      bar2.style.backgroundColor = "blue";
      bar3.style.backgroundColor = "blue";
      // array[j+1] = array[j];
      swapBubble(array, j, j+1);
      await sleep(1000);
      setBoolfn(newBool => newBool===1 ? 0 : 1);
      j--;
      bar1.style.backgroundColor = "green";
      bar2.style.backgroundColor = "green";
      bar3.style.backgroundColor = "green";
    }
    array[j+1] = current;
    await sleep(1500);
    setBoolfn(newBool => newBool===1 ? 0 : 1);
  }
}  

//////////////////////////bubbleSort start
const bubbleSort = async(array) => {
  for(let i=0;i<array.length-1;i++) {
    for(let j=0;j<array.length-i-1;j++) {
      const bar1 = document.getElementById(`bar${j}`);
      const bar2 = document.getElementById(`bar${j+1}`);
      bar1.style.backgroundColor="green";
      bar2.style.backgroundColor="green";
      if(array[j]>array[j+1]) {
        await swapBubble(array, j, j+1); 
        setBoolfn(newBool => newBool===1 ? 0 : 1);
      }
      await sleep(400);
      // const bar1 = document.getElementById(`bar${j}`);
      // const bar2 = document.getElementById(`bar${j+1}`);
      bar1.style.backgroundColor="blue";
      bar2.style.backgroundColor="blue";
    }
  }
}

const swapBubble = async(array, i, j)=> {
  // const bar1 = document.getElementById(`bar${i}`);
  // const bar2 = document.getElementById(`bar${j}`);
  // bar1.style.backgroundColor="green";
  // bar2.style.backgroundColor="green";

  await sleep(400);
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;  
}


/////////////////////////mergeSort Start
const mergeSort = async(array) => {
  await mergeSortFunc(array, 0, array.length - 1);
  setBoolfn(prevBoolfn => prevBoolfn === 0 ? 1 : 0);
}

const mergeSortFunc = async(array, s, e) => {
  if (s < e) {
      let mid = Math.floor((s + e) / 2);
      await mergeSortFunc(array, s, mid);
      await mergeSortFunc(array, mid + 1, e);
      await merge(array, s, mid, e);
      // console.log(array);
  }
}

const merge = async(array, s, mid, e) => {
  const a = new Array(e - s + 1);
  let left = s;
  let right = mid + 1;
  let k = 0;
  while (left <= mid && right <= e) {
      if (array[left] < array[right]) {
          a[k] = array[left];
          left++;
      } else {
          a[k] = array[right];
          right++;
      }
      k++;
  }
  while (left <= mid) {
      a[k] = array[left];
      left++;
      k++;
  }
  while (right <= e) {
      a[k] = array[right];
      right++;
      k++;
  }
  for (let i = 0; i < a.length; i++) {
    const bar1 = document.getElementById(`bar${i}`)
    const bar2 = document.getElementById(`bar${s+i}`)
    bar1.style.backgroundColor = "blue"
    bar2.style.backgroundColor = "blue"
    await sleep(500);
    array[s + i] = a[i];
    await sleep(500);
    setBoolfn(prevBoolfn => prevBoolfn === 0 ? 1 : 0);
    bar1.style.backgroundColor = "green"
    bar2.style.backgroundColor = "green"
  }
}
///////////////////////mergeSort End


////////////////////////quick Sort start
  const quickSort=async(array)=> {
    await qsFunc(array, 0, array.length - 1);
  }

  const qsFunc= async(array, low, high)=> {
    if(low<high) {
            let pIndex = await qs(array, low, high);
            await qsFunc(array, low, pIndex-1);
            await qsFunc(array, pIndex+1, high);
    }
  }

  const qs= async(array, low, high)=> {
    let i=low;
    let j=high;
    let pivot=array[low];
    const barlow = document.getElementById(`bar${low}`);
    barlow.style.backgroundColor = "yellow";
    await sleep(1000);

    while(i<j) {
        while(i<=high-1 && array[i]<=pivot) {
            i++;
        }
        while(j>=0 && array[j]>pivot) {
            j--;
        }
        if(i<j){
          await swap(array, i, j);  
          setBoolfn(prevBoolfn => prevBoolfn === 0 ? 1 : 0);
          await sleep(1000);
          const bar1 = document.getElementById(`bar${i}`);
          const bar2 = document.getElementById(`bar${j}`);
          bar1.style.backgroundColor="blue";
          bar2.style.backgroundColor="blue";
        }
        
    }
    await swap(array, j, low);
    setBoolfn(prevBoolfn => prevBoolfn === 0 ? 1 : 0);
    await sleep(1000);
    const bar1 = document.getElementById(`bar${j}`);
    const bar2 = document.getElementById(`bar${low}`);
    bar1.style.backgroundColor="blue";
    bar2.style.backgroundColor="blue";
    
    return j;
  }

  const swap = async(array, i, j) => {
    const bar1 = document.getElementById(`bar${i}`);
    const bar2 = document.getElementById(`bar${j}`);
    bar1.style.backgroundColor="green";
    bar2.style.backgroundColor="green";

    await sleep(1000);
      let temp = array[i];
      array[i] = array[j];
      array[j] = temp;  
  }
  //////////quickSort end

  function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

const handleChange=(e)=> {
  setNval(parseInt(e.target.value, 10)); 
}


  return (
    <>
        <div className="sorting h-screen bg-slate-900">
          <div className="nav flex bg-slate-900 text-white flex-wrap py-4 justify-evenly">
            <div className='flex px-5 flex-[1_1_30%] items-center'><input onChange={(e)=>handleChange(e)} type='range' min="5" max="35" step="5" value={nval} className='flex justify-center cursor-pointer w-3/5 mx-4'/> <div>{nval}</div> </div>      
            <div className='flex-[1_1_30%]'><span className='flex justify-center cursor-pointer' onClick={()=>resetArray()}>Generate New Array</span></div>  
            <div className="sorts flex-[1_1_40%] flex justify-evenly cursor-pointer">
              <span onClick={()=> mergeSort(array)}>Merge Sort</span>
              <span onClick={()=> quickSort(array)}>Quick Sort</span>
              <span onClick={()=> insertionSort(array)}>Insertion Sort</span>
              <span onClick={()=> bubbleSort(array)}>Bubble Sort</span>
            </div>      
          </div>
          <div className="arrays flex justify-center align-bottom items-end h-[90%] bg-blue-200 relative gap-4">
          {
            array.map((value, idx) => {
              return (
              <div key={idx} id={`bar${idx}`} className="bar w-[30px] bg-orange-600 relative" style={{height : `${value}px`}}></div>
              )
            })
          }

          </div>
        </div>
        </>
  );
}
