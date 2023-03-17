import Thumbnail from '../Thumbnail/Thumbnail'

type Item = {
  name: string;
};

type Props = {
  imgUrl: string;
  title: string;
  subtitle?: string;
  displayOneList?: Item[];
};

const Card = ({ imgUrl, title, subtitle, displayOneList }: Props) => (
  <div className='h-80'>
    <div className='relative h-full transition-all duration-300 rounded-lg cursor-pointer'>
      <Thumbnail imgUrl={imgUrl} height='h-72' border='border-2 border-zinc-800' />
      <div className='absolute w-full bottom-0 px-4 py-2 rounded-b-xl bg-zinc-800'>
        <h1 className='text-amber-200 font-semibold text-center text-sm capitalize md:uppercase'>{title}</h1>
        {subtitle ? <p className='text-amber-400 text-center text-xs truncate' dangerouslySetInnerHTML={{ __html: subtitle }} /> : null}
        {displayOneList ? (
          <ul className='flex justify-center flex-wrap'>
            {displayOneList.map((item, index) => (
              index < 11 ? (
                <li key={item.name} className='text-amber-400 text-center text-xs p-1'>
                  {item.name}
                </li>
              ) : (
                index === 12 && (
                  <li key={item.name} className='text-amber-400 text-center text-xs p-1'>
                    ...
                  </li>
                )
              )
            ))}
          </ul>
        ) : null}
        <div className='flex justify-center'>
          <button className='flex justify-center w-4/5 md:w-3/5 bg-amber-700 text-sm text-gray-100 font-semibold rounded-lg px-2 py-2 mt-2 hover:bg-amber-800 focus:outline-none focus:ring-2 focus:ring-amber-400 focus:ring-opacity-15'>
            En savoir plus
          </button>
        </div>
      </div>
    </div>
  </div>

);

export default Card;