import React, { useState, useRef } from "react";

type Props = {
    setQuery: React.Dispatch<React.SetStateAction<string>>;
};

// const TIME = 300; // ms

const SearchInput = ({ setQuery }: Props) => {
    const [text, setText] = useState('');
    const [isSearchPerformed, setIsSearchPerformed] = useState(false);
    // const timer = useRef<NodeJS.Timeout>();

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setText(value);

        if (!value) {
            setQuery(value);
            return;
        }

    };

    const handleMouseEnter = (e: React.MouseEvent<HTMLInputElement>) => {
        const value = e.currentTarget.value;
        setText(value);

        if (!value) {
            setQuery(value);
            return;
        }
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setQuery(text);
        setIsSearchPerformed(true);
    };

    const handleReset = () => {
        setText('');
        setQuery('');
        setIsSearchPerformed(false);
    };

    return (
        <div className="relative flex items-center pb-6" data-testid="SearchInput">
            <form onSubmit={handleSubmit} className="flex flex-col md:flex-row items-start md:items-center" role="form">
                <input
                    className="h-10 p-4 text-sm md:text-md w-72 rounded-full bg-zinc-600 text-gray-100 focus:outline-none focus:border focus:border-solid focus:border-zinc-700 placeholder-gray-100"
                    type="text"
                    placeholder="Rechercher un projet par mot clé"
                    value={text} onChange={handleInput} onMouseEnter={handleMouseEnter} />
                <button
                    type="submit"
                    className="text-sm md:text-md bg-zinc-600 hover:bg-zinc-900 text-gray-100 font-bold py-2 px-4 rounded-full ml-0 md:ml-4 mt-4 md:mt-0">
                    <span>Rechercher</span>
                </button>
                {isSearchPerformed && (
                    <button
                        type="button"
                        onClick={handleReset}
                        className="text-sm md:text-md bg-red-800 hover:bg-red-900 text-gray-100 font-bold py-2 px-4 rounded-full ml-0 md:ml-4 mt-4 md:mt-0">
                        <span>Réinitialiser la recherche</span>
                    </button>
                )}
            </form>
        </div>
    )
}

export default SearchInput;