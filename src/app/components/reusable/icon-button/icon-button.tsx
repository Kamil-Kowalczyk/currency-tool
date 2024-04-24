import { useRef } from 'react';
import styles from './icon-button.module.scss';
import { IconDefinition, SizeProp } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export interface IconButtonProps {
  icon: IconDefinition
  onClick?: () => void
  className?: string
  isLongPress?: boolean
  size?: SizeProp
}

export function IconButton({ icon, className, onClick, isLongPress = true, size = 'lg' }: IconButtonProps) {
  const timer = useRef<NodeJS.Timer>()
  const interval = 200

  const handleMouseDown = () => {
    timer.current = setInterval(() => {
      handleClick()
    }, interval)
  }

  const handleMouseUp = () => {
    clearInterval(timer.current)
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
        onMouseDown={isLongPress? handleMouseDown : undefined}
        onMouseUp={isLongPress? handleMouseUp : undefined}
        onClick={handleClick}
      />
  )
}

export default IconButton;
