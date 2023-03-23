type Props = {
  text: string;
  className?: string;
};

const Pill = ({ className, text }: Props) => (
  <div className={`bg-zinc-600 text-gray-100 text-xs md:text-sm font-medium px-3 py-1 m-2 w-max md:w-auto rounded-full inline-block ${className}`}>
    {text}
  </div>
);

export default Pill;