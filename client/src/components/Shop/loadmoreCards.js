import React from 'react';
import CardBlockShop from '../utils/card_block_shop'
const LoadmoreCards = (props) => {
    return (
            <CardBlockShop
            grid={props.grid}
            list={props.products}
            />
    );
};

export default LoadmoreCards;