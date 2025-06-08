import React, { useEffect, useState } from 'react'
import './Binary.css'
import * as d3 from "d3";
import { buildTree, decode, isLongText } from "./util.ts";

const Binary = () => {
  const [inputString, setInputString] = useState("");
  const [newRoot, setNewRoot] = useState(null);
  const [boolfn, setBoolfn] = useState(0);


  const handleChange = (e) => {
    setInputString(e.target.value);
  }

 const createTree = (e) => {
   e.preventDefault();
    try {
      // const inputString = document.querySelector("#inputString").value;
      const data = buildTree(decode(inputString));
      // console.log(data)
      
      const w = document.querySelector("svg").clientWidth;
      const h = document.querySelector("svg").clientHeight - 100;
      const treeLayout = d3.tree().size([w, h]);
      
      const root = d3.hierarchy(data);
      // console.log(root)
      treeLayout(root);
      setNewRoot(root);
      // console.log(newRoot.children[0]);
  
      // clean up
      d3.selectAll("circle").remove();
      d3.selectAll("line").remove();
      d3.selectAll("text").remove();
      document.querySelector("#errorText").textContent = "";
  
      // Nodes
      d3.select("svg g.nodes")
        .selectAll("circle.node")
        .data(root.descendants())
        .enter()
        .append("circle")
        .classed("node", function (d) {
          return d.data.name !== null;
        })
        .classed("hidden", function (d) {
          return d.data.name === null;
        })
        .attr("cx", function (d) {
          return d.x;
        })
        .attr("cy", function (d) {
          return d.y;
        })
        .attr("r", 20)
        .attr("id", d => `node-${d.data.name}`);
  
      // Links
      d3.select("svg g.links")
        .selectAll("line.link")
        .data(root.links())
        .enter()
        .append("line")
        .classed("link", function (d) {
          return d.target.data.name !== null;
        })
        .classed("hidden", function (d) {
          return d.target.data.name === null;
        })
        .attr("x1", function (d) {
          return d.source.x;
        })
        .attr("y1", function (d) {
          return d.source.y;
        })
        .attr("x2", function (d) {
          return d.target.x;
        })
        .attr("y2", function (d) {
          return d.target.y;
        });
  
      // Labels
      d3.select("svg g.labels")
        .selectAll("text.label")
        .data(root.descendants())
        .enter()
        .append("text")
        .classed("label", function(d) {
          return !isLongText(d.data.name);
        })
        .classed("longLabel", function(d) {
          return isLongText(d.data.name);
        })
        .attr("text-anchor", "middle")
        .attr("transform", function (d) {
          return "translate(" + d.x + "," + d.y + ")";
        })
        .attr("dy", "5px")
        .text(function (d) {
          const name = d.data.name;
          return isLongText(name) ? name.slice(0, 3) + "..." : name;
        });
    } catch (e) {
      document.querySelector("#errorText").textContent = e.message;
    }

}


const preOrder = async(node) => {
  if (node==null) return;
  d3.select(`#node-${node.data.name}`)
  .transition()
  // .duration(500)
  .attr('fill', 'red');
  await sleep(500);
    await preOrder(node.children ? node.children[0] : null);
    await preOrder(node.children ? node.children[1] : null);
};

const inOrder = async(node) => {
  if (node==null) return;
  await inOrder(node.children ? node.children[0] : null);
  console.log(node.data.name);
  d3.select(`#node-${node.data.name}`)
  .transition()
  .attr('fill', 'blue');
  await sleep(500);
  await inOrder(node.children ? node.children[1] : null);
};

const postOrder = async(node) => {
  if (!node) return;
  await postOrder(node.children ? node.children[0] : null);
  await postOrder(node.children ? node.children[1] : null);
  d3.select(`#node-${node.data.name}`)
  .transition()
  .attr('fill', 'green');
  await sleep(500);
};

function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

  return (
    <div id="binary" className='binary w-screen'>
    <form className="infoContainer flex align-middle h-auto bg-slate-700 text-white px-5 py-4 w-[100%] justify-around">
      <div className="input flex h-auto align-middle w-1/2 gap-5">
        <label htmlFor="levelOrder" className='items-center flex align-middle h-full'>Enter level order traversal:</label>
        <input className='text-black px-5 py-2 w-2/3 rounded-md' name="levelOrder" id="inputString" value={inputString} placeholder="Enter digits using commas" onChange={(e)=>handleChange(e)} />
      </div>
      <input type="submit" id="updateBtn" value="Update tree" className='bg-neutral-200 text-black px-5 rounded-md' onClick={(e)=>createTree(e)} />
      <div className="buttons flex gap-4 ">
        <button className='bg-red-600 px-4 rounded-xl' onClick={(e)=> {e.preventDefault(); preOrder(newRoot);}}>PreOrder</button>
        <button className='bg-blue-600 px-4 rounded-xl' onClick={(e)=> {e.preventDefault(); inOrder(newRoot);}}>InOrder</button>
        <button className='bg-green-600 px-4 rounded-xl' onClick={(e)=> {e.preventDefault(); postOrder(newRoot);}}>PostOrder</button>
      </div>
      <p id="errorText"></p>
    </form>
    <svg width="100%" height="100%">
      <g transform="translate(0, 40)">
        <g className="links"></g>
        <g className="nodes"></g>
        <g className="labels"></g>
      </g>
    </svg>
  </div>
  )
}

export default Binary
