import React from 'react';
import Card from '../utils/card_v2';
const CardBlockShop = (props) => {
    const renderCards = () => (
        props.list ?
            props.list.map(card => (
                <Card
                    key={card._id}
                    {...card}
                />
            ))
            : null
    )

    return (
        <>
        {props.list ?
            props.list.length === 0 ?
                <div className="no_result">
                    Sorry, no results
                </div>
            : null
        : null}
        {renderCards(props.list)}  
        </>
    );
};

export default CardBlockShop;