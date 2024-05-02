import styles from './text-image.module.scss';

export interface TextImageClassName {
  holder?: string
  image?: string
  paragraph?: string
}

export interface TextImageStyle {
  holder?: React.CSSProperties
  image?: React.CSSProperties
  paragraph?: React.CSSProperties
}

export interface TextImageProps {
  src: string
  alt: string
  text: string
  className?: TextImageClassName,
  style?: TextImageStyle
}

export function TextImage({ src, alt, text, className, style }: TextImageProps) {
  return (
    <div id='holder' className={`d-flex h-100 w-100 justify-content-left ${className?.holder}`} style={style?.holder} >
      <img 
        id='image' 
        className={`${styles.image} ${className?.image} my-auto ms-1 me-1`} 
        src={src} 
        alt={alt}
        style={style?.image}
      />
      <p id='paragraph' className={`${className?.paragraph} my-auto text-white`} style={style?.paragraph}>
        {text}
      </p>
    </div>
  );
}

export default TextImage;
