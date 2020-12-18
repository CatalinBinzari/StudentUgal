import React from 'react';
import moment from 'moment';

const UserHistoryBlock = (props) => {

    const renderBlocks = () => (
        props.products ?
            props.products.map((product,i)=>(
                <tr key={i}>
                    <td>{moment(product.dateOfPurchase).format('MM-DD-YYYY')}</td>
                    <td>{product.brand} {product.name}</td>
                    <td>${product.price}</td>
                    <td>{product.quantity}</td>

                </tr>
            ))
        :null
    )

    return (
        <div className="history_blocks">
            <thead>
                <tr>
                    <th>Date of purhcase</th>
                    <th>Product</th>
                    <th>Price paid</th>
                    <th>Quantity</th>

                </tr>
            </thead>
            <tbody>
                {renderBlocks()}
            </tbody>
        </div>
    );
};

export default UserHistoryBlock;