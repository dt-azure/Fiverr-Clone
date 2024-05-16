import React from 'react'

const CarouselNavBtn = (props) => {
  return (
    <button className={props.btnClass} onClick={props.onClick}>
        {props.icon}
    </button>
  )
}

export default CarouselNavBtn