import Link from 'next/link';

type Props = {
  title: string;
};

const Breadcrumb = ({ title }: Props) => (
  <div className='bg-zinc-600'>
    <div className='flex items-center max-w-7xl m-auto p-4 text-gray-100 text-lg'>
      <Link href='/'>
        <span className='hover:opacity-80 cursor-pointer duration-300'>Accueil</span>
      </Link>
      <span className='block px-2'>|</span>
      <span className='font-bold truncate'>{title}</span>
    </div>
  </div>
);

export default Breadcrumb;