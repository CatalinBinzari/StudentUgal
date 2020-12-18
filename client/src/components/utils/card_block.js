import React from 'react';
import Card from './card';

const CardBlock = (props) => {


    const renderCards = () =>{
        console.log(props.list);
        
        if(props.list && props.list.length > 0){
            return props.list.map((card,i)=>(
                <Card
                key={i}
                category={card.category}    
                name= {card.name}
                price={card.price}
                images={card.images}
                cardId={card._id} 
                     />
             ))
        }

        return null }


    return (
        <div className="card_block">
            <div className="container">
                {
                    props.title ?
                        <div className="title">
                            {props.title}
                        </div>
                    :null
                }
                <div className="row" style={{
                    display:'flex',
                    flexWrap:'wrap'
                }}>
                    { renderCards(props.list)}
                </div>

            </div>
        </div>
    );
};

export default CardBlock;