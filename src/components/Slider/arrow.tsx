import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Typography } from '@mui/material';
import { CSSProperties } from 'react';

export const NextArrowSlider = (props: {
  className?: 'string';
  style?: CSSProperties;
  onClick?: () => void;
}) => {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{
        ...style,
      }}
      onClick={onClick}
    >
      <Typography color="#082346">
        <FontAwesomeIcon icon={faAngleRight} />
      </Typography>
    </div>
  );
};

export const PrevArrowSlider = (props: {
  className?: 'string';
  style?: CSSProperties;
  onClick?: () => void;
}) => {
  const { className, style, onClick } = props;

  return (
    <div
      className={className}
      style={{
        ...style,
      }}
      onClick={onClick}
    >
      <Typography color="#082346">
        <FontAwesomeIcon icon={faAngleLeft} />
      </Typography>
    </div>
  );
};
