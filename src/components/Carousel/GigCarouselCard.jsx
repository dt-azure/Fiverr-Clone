import React from "react";
import "./gigCarouselCard.scss";

const GigCarouselCard = ({img, avatar, name, level, desc, rating, ratingCount, fee}) => {
  return (
    <div className="embla__slide relative">
      <div className="thumbnail">
        <img src={img} className="object-contain rounded-lg" alt="" />
      </div>

      <div className="name flex items-center justify-between mt-4">
        <div className="flex justify-between items-center">
          <img src={avatar} className="carousel__card-avatar" alt="" />
          <a className="text-sm font-bold">{name}</a>
        </div>
        <div className="level">
          <span className="text-sm font-semibold">{level}</span>
        </div>
      </div>

      <div className="desc line-clamp-2 mt-2">
        <a>
          {desc}
        </a>
      </div>

      <div className="rating my-2 flex gap-2 items-center">
        <i className="fa-solid fa-star"></i>
        <span className="font-bold">{rating}</span>
        <span className="rating-count">({ratingCount})</span>
      </div>
      <span className="fee font-semibold">Starting from ${fee}</span>
      <div className="like absolute">

      </div>
    </div>
  );
};

export default GigCarouselCard;
