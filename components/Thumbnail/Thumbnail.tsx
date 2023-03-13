import Image, { StaticImageData } from 'next/image';

type Props = {
  imgUrl: string | StaticImageData;
  height?: string;
};

const Thumbnail = ({ imgUrl, height }: Props) => {
  return (
    <>
      <div className={`relative w-full cursor-pointer ${height ? height : 'h-72'}`}>
        <Image
          placeholder='blur'
          blurDataURL='data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAQAAAC1HAwCAAAAC0lEQVR42mNsqgcAAYkBA6rFAegAAAAASUVORK5CYII='
          fill
          sizes='(max-width: 768px) 100vw,
              (max-width: 1200px) 100vw'
          style={{ objectFit: 'cover', objectPosition: 'top center' }}
          src={imgUrl}
          alt='thumbnail'
          loading="lazy"
        />
      </div>
    </>
  );
};


export default Thumbnail;