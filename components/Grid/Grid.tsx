import SearchInput from '../SearchInput/SearchInput';

type Props = {
    title: string;
    children: React.ReactNode;
    className?: string;
    setQuery?: React.Dispatch<React.SetStateAction<string>>;
}


const Grid = ({ title, children, className, setQuery }: Props) => {
    return (
        <>
            <div className={className}>
                <h1 className='text-lg md:text-3xl text-gray-400 font-bold pb-6 text-zinc-700'>{title}</h1>
                {setQuery && (
                    <SearchInput setQuery={setQuery} />
                )}
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6' data-testid="ChildrenCard">
                    {children}
                </div>
            </div>
        </>
    )
}

export default Grid;