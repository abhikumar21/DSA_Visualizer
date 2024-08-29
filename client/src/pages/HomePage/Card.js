import React from 'react'
import {Link} from 'react-router-dom'


const Card = ({cardData}) => {
  // console.log(cardData.heading)
  return (
    <>
      <Link to={cardData.path} className="card m-6 md:w-[25%] bg-orange-200 rounded-xl overflow-hidden">
        <div className="h-full border-2 border-gray-200 border-opacity-60">
          <img className="lg:h-72 md:h-36 w-full object-cover object-center p-2" src={cardData.imgUrl} alt="blog"/>
          <div className="p-6 text-white">
            <h1 className="title-font text-lg font-medium text-black mb-3">{cardData.heading}</h1>
          </div>
        </div>
      </Link>
    </>
  )
}

export default Card
