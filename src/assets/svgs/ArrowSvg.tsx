import { FC } from 'react'

interface ArrowSvgProps {
    color: string;
    direction: 'left'|'right';
}
const ArrowSvg: FC<ArrowSvgProps> = ({color, direction}) => {
  if (direction === 'right') {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color}>
        <path d="M15.6315 12L10.8838 3.03212L9.11622 3.9679L13.3685 12L9.11622 20.0321L10.8838 20.9679L15.6315 12Z"></path>
    </svg>
    )
  } else {
    return (
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill={color}>
        <path d="M8.36853 12L13.1162 3.03212L14.8838 3.9679L10.6315 12L14.8838 20.0321L13.1162 20.9679L8.36853 12Z"></path>
      </svg>
    )
  }
}

export default ArrowSvg