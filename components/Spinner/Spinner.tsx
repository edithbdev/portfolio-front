const Spinner = () => (
  <div className='flex items-center justify-center mt-2 w-full'>
    <button type="button" className="w-4/5 flex justify-center items-center text-gray-400 font-bold py-2 px-4" data-testid="Spinner">
      <svg className="animate-spin h-6 w-6 mr-3" viewBox="0 0 1 44" fill='none' xmlns='http://www.w3.org/2000/svg'>
        <path
          fillRule='evenodd'
          clipRule='nonzero'
          d='M21.946 22C21.9818 21.5047 22 21.0045 22 20.5C22 9.17816 12.8218 0 1.5 0C0.995537 0 0.495329 0.0182214 0 0.0540418V5.07165C0.493604 5.02425 0.99397 5 1.5 5C10.0604 5 17 11.9396 17 20.5C17 21.006 16.9757 21.5064 16.9284 22H21.946Z'
          fill='#D9D9D9'
        />
      </svg>
      Chargement...
    </button>
  </div>
);

export default Spinner;