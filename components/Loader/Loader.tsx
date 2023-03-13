// https://www.npmjs.com/package/react-loading
import React from 'react';
import ReactLoading, { LoadingType } from 'react-loading';

type Props = {
    type: LoadingType | undefined,
    color: string,
    height: number,
    width: number,
}

const Loader = ({ type, color, height, width }: Props) => {
    const defaultType = 'spinningBubbles';

    return (
        <ReactLoading className='mx-auto' type={type || defaultType} color={color} height={height} width={width} />
    )
}

export default Loader;