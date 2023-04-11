import React from 'react';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
import styles from './Slider.module.scss';

const responsive = {
  superLargeDesktop: {
    breakpoint: { max: 4000, min: 1280 },
    items: 1,
  },
  desktop: {
    breakpoint: { max: 1280, min: 769 },
    items: 1,
  },
  tablet: {
    breakpoint: { max: 768, min: 321 },
    items: 1,
  },
  mobile: {
    breakpoint: { max: 320, min: 0 },
    items: 1,
  },
};

interface Props {
  children: JSX.Element | JSX.Element[];
}

const Slider: React.FC<Props> = ({ children }) => {
  return (
    <Carousel
      swipeable={true}
      draggable={true}
      showDots={true}
      infinite={true}
      transitionDuration={500}
      keyBoardControl={true}
      removeArrowOnDeviceType={['mobile', 'tablet']}
      responsive={responsive}
      autoPlay={true}
      autoPlaySpeed={10000}
      containerClass={styles.carouselContainer}
      itemClass={styles.carouselItem}
    >
      {children}
    </Carousel>
  );
};

export default Slider;
