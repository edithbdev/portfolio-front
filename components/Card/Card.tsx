import Thumbnail from '../Thumbnail/Thumbnail'
import Spinner from '../Spinner/Spinner';
import { useState, useEffect } from 'react'

type Item = {
  name: string;
};

type Props = {
  imgUrl: string;
  title: string;
  subtitle?: string;
  displayOneList?: Item[];
};

const Card = ({ imgUrl, title, subtitle, displayOneList }: Props) => {
  const [loading, setLoading] = useState(false);
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setLoading(true);
  };

  useEffect(() => {
    if (loading && clicked) {
        setLoading(false);
      };
  }, [loading, clicked]);


  return (
    <div className='h-80' onClick={handleClick} data-testid="Card">
      <div className='relative h-full transition-all duration-300 rounded-lg cursor-pointer'>
        <Thumbnail imgUrl={imgUrl} height='h-72' border='border-2 border-zinc-800' />
        <div className='absolute w-full h-full max-h-40 bottom-0 px-4 py-2 rounded-b-xl bg-zinc-800'>
          <h1 className='text-amber-200 font-semibold text-center text-sm capitalize md:uppercase'>{title}</h1>
          {subtitle ? (
            <p
              className='text-amber-400 text-center text-xs truncate'
              dangerouslySetInnerHTML={{ __html: subtitle }}
            />
          ) : null}
          {displayOneList && (
            <ul className='flex flex-wrap'>
              {displayOneList.map((item, index) => (
                <li key={index} className='text-amber-400 text-center text-xs p-1'>
                  {index < 10 ? item.name : index === 11 && '...'}
                </li>
              ))}
            </ul>
          )}
          {clicked ?  (
             <Spinner />
            ) : (
              <div>
                <button className='absolute inset-x-20 bottom-3 h-8 bg-amber-700 text-xs text-gray-100 font-semibold hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-15'>
                  En savoir plus
                </button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};




export default Card;