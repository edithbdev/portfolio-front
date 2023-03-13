import Image, { StaticImageData } from 'next/image';

type Props = {
    imgUrl: string | StaticImageData;
    title: string;
    text: string;
    quote?: string;
    quoteAuthor?: string;
}

const Leading = ({ imgUrl, title, text, quote, quoteAuthor }: Props) => {
    return (
        <div className='relative w-full h-5/6'>
            <div className='relative flex flex-col-reverse h-full w-full z-10 pb-12 text-center md:text-left md:max-w-7xl md:flex-row'>
                <div className='text-gray-100 max-w-xl px-3 mt-8 md:mt-1 md:px-0 m-auto ml-0 md:ml-6'>
                    <h1 className='text-xl md:text-3xl mt-8 mb-4 font-bold uppercase shadow-md shadow-amber-200/50'>{title}</h1>
                    <p className='text-lg md:text-xl font-bold text-justify leading-relaxed'>{text}</p>
                </div>
            </div>
            <div className='top-0 z-0 left-0 w-full h-full absolute brightness-40'>
                <Image
                    priority
                    fill
                    sizes="(max-width: 768px) 100vw,
                        (max-width: 1200px) 50vw,
                        33vw"
                    src={imgUrl}
                    style={{ objectFit: 'cover', objectPosition: 'top left' }}
                    alt='fond-image' />
                <div className='absolute bottom-0 w-full m-auto text-center'>
                    <blockquote className='text-gray-100 text-lg md:text-2xl font-bold italic mt-8'>{quote}
                        <figcaption className='text-gray-100 text-sm md:text-base font-bold italic mb-4'>- {quoteAuthor}</figcaption>
                    </blockquote>
                </div>
            </div>
        </div>
    )
}

export default Leading;