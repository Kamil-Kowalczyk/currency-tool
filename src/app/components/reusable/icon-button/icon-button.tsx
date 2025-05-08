import { useEffect, useRef } from 'react';
import styles from './icon-button.module.scss';
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IconButtonProps {
  icon: IconDefinition
  onClick?: () => void
  className?: string
  isLongPress?: boolean
  size?: SizeProp
  style?: React.CSSProperties
}

export function IconButton({ icon, className, onClick, isLongPress = true, size = 'lg', style }: IconButtonProps) {
  const timer = useRef<NodeJS.Timer | null>(null)
  const interval = 175

  useEffect(() => {
    const stop = () => clearTimer();

    if (isLongPress) {
      window.addEventListener('mouseup', stop);
      window.addEventListener('mouseleave', stop);
    }

    return () => {
      window.removeEventListener('mouseup', stop);
      window.removeEventListener('mouseleave', stop);
    };
  }, [isLongPress]);

  const clearTimer = () => {
    if (timer.current) {
      clearInterval(timer.current);
      timer.current = null;
    }
  };

  const handleMouseDown = () => {
    handleClick()
    timer.current = setInterval(() => {
      handleClick()
    }, interval)
  }

  const handleClick = () => {
    if (onClick)
      onClick()
  }

  return (
      <FontAwesomeIcon 
        icon={icon} 
        size={size} 
        className={className} 
        onMouseDown={isLongPress ? handleMouseDown : handleClick}
        onMouseUp={isLongPress ? clearTimer : undefined}
        onMouseLeave={isLongPress ? clearTimer : undefined}
        onClick={(e) => e.preventDefault()}
        style={style}
      />
  )
}

export default IconButton;
