import React from "react";
import useEmblaCarousel from "embla-carousel-react";
import "./basicCarousel.scss";
import CarouselNavBtn from "./CarouselNavBtn";

const SingleCarousel = ({ loop = false, content, backToTop = false }) => {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    watchDrag: false,
    loop: loop,
  });


  // Carousel content will be passed as an Array
  // When backToTop is enabled, clicking next at the last slide will move to the first slide and vice versa for the first slide
  const handlePrevClick = () => {
    if (!emblaApi.canScrollPrev() && backToTop) {
      emblaApi.scrollTo(content.length);
    } else {
      emblaApi.scrollPrev();
    }
  };

  const handleNextClick = () => {
    console.log(emblaApi.selectedScrollSnap())
    if (!emblaApi.canScrollNext() && backToTop) {
      emblaApi.scrollTo(0);
    } else {
      emblaApi.scrollNext();
    }
  };

  return (
    <div className="relative">
      <div className="embla" ref={emblaRef}>
        <div className="embla__container single-carousel">{content.map((item) => item)}</div>
      </div>
      <CarouselNavBtn
        btnClass="carousel-nav prev-btn flex items-center justify-center"
        onClick={handlePrevClick}
        icon={<i class="fa-solid fa-chevron-left"></i>}
      />
      <CarouselNavBtn
        btnClass="carousel-nav next-btn flex items-center justify-center"
        onClick={handleNextClick}
        icon={<i class="fa-solid fa-chevron-right"></i>}
      />
    </div>
  );
};

export default SingleCarousel;
