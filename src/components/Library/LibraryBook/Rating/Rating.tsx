import React, { useState, FC, cloneElement } from 'react';
import { ReactComponent as Star } from '../../../../assets/img/star.svg';
import { ReactComponent as FullStar } from '../../../../assets/img/starFull.svg';
import styles from './Rating.module.scss';

interface RatingProps {
  count: number;
  className?: string;
  value: number;
  color?: string;
  hoverColor?: string;
  activeColor?: string;
  edit?: boolean;
  onChange?: (value: number) => void;
  emptyIcon?: React.ReactElement;
  fullIcon?: React.ReactElement;
}

const Rating: FC<RatingProps> = ({
  count,
  className,
  value,
  color = '#ffffff',
  hoverColor = '#ff6b08',
  edit = false,
  onChange,
  emptyIcon = <Star />,
  fullIcon = <FullStar />,
}) => {
  const [hoverValue, setHoverValue] = useState<number | undefined>(undefined);

  const handleMouseMove = (index: number) => {
    if (!edit) {
      return;
    }
    setHoverValue(index);
  };

  const handleMouseLeave = () => {
    if (!edit) {
      return;
    }
    setHoverValue(undefined);
  };

  const handleClick = (index: number) => {
    if (!edit) {
      return;
    }
    if (onChange) {
      onChange(index + 1);
    }
  };

  const getColor = (index: number) => {
    if (hoverValue !== undefined) {
      if (index <= hoverValue) {
        return hoverColor;
      }
    }
    if (value > index) {
      return hoverColor;
    }
    return color;
  };

  const stars = [];

  for (let i = 0; i < count; i++) {
    let star: React.ReactElement;
    if (i < value) {
      star = fullIcon;
    } else {
      star = emptyIcon;
    }

    if (hoverValue !== undefined) {
      if (i <= hoverValue) {
        star = fullIcon;
      }
    }

    stars.push(
      <div
        key={i}
        style={{ cursor: 'pointer' }}
        onMouseMove={() => handleMouseMove(i)}
        onMouseLeave={handleMouseLeave}
        onClick={() => handleClick(i)}
      >
        {cloneElement(star, {
          color: getColor(i),
        })}
      </div>,
    );
  }
  return <div className={`${styles.rating} ${className}`}>{stars}</div>;
};

export default Rating;
