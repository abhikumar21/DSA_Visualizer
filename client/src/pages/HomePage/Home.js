import React from 'react'
import Card from './Card'
import './Home.css'
// import S1 from './images/s1.png'
import P1 from './images/p1.png'
import P2 from './images/p2.png'
import P3 from './images/p3.png'
import P4 from './images/p4.png'
import P5 from './images/p5.jpg'
import P6 from './images/p6.jpeg'
import P7 from './images/p7.jpg'



const Home = () => {

  const cardsData = [
    {
      id: 1,
      heading: "Sorting",
      imgUrl: P1,
      path: './sorting'
    },
    {
      id: 2,
      heading: "Binary-Tree",
      imgUrl: P3,
      path: './binarytree'
    },
    {
      id: 3,
      heading: "NQueens",
      imgUrl: P4,
      path: './nqueens'
    },
    {
      id: 4,
      heading: "Linked List",
      imgUrl: P5,
      path: './linklist'
    },
    {
      id: 5,
      heading: "Stack",
      imgUrl: P6,
      path: './stack'
    },
    {
      id: 6,
      heading: "Queue",
      imgUrl: P7,
      path: './queue'

    },

  ]

  return (
    <>
    <div className="bg-neutral-800">
      <h1 className='heading text-white text-7xl font-bold py-10 flex align-middle justify-center'>Algorithm Visualizer</h1>
     
<div className="algorithms">
<section className="text-gray-600 body-font">
  <div className="container px-5 py-8 mx-auto flex">
    <div className="flex flex-wrap justify-center gap-5">

      {cardsData.map((card)=> {
        return (
          <>
            <Card cardData = {card}/>
          </>
        )
      })}
{/*       
      <Card/>
      <Card/>
      <Card/>
      <Card/>
      <Card/> */}
    </div>
  </div>
</section>
</div>
    </div>
    </>
  )
}

export default Home
