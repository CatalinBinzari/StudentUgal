import React from 'react';
import MyButton from '../../../utils/button'
const CategoryBlock = ({ categories, removeItem, modifyItem }) => {
    const renderCartImage = () => { //to do: import images for category
        return '/images/image_not_available.png'
    }

    const renderItems = () => (
        categories ?
            categories.map(category => (
                <div className="user_product_block" key={category._id}>
                    <div className="item">
                        <div className="image"
                            style={{ background: `url(${renderCartImage()}) no-repeat` }}
                        ></div>
                    </div>
                    <div className="item">
                        <h4>Faculty name</h4>
                        <div>
                            {category.name}
                        </div>
                    </div>
                    <div className="item">
                        <h4>Faculty ID</h4>
                        <div>
                            {category._id}
                        </div>
                    </div>
                    <div className="item btn">
                        <MyButton
                            type="modify_category"
                            title="Modify"
                            linkTo={`/admin/category/${category._id}`}

                        />
                        <div className="cart_modify_btn"
                            onClick={() => modifyItem(category._id)}
                        >
                            Modify
                        </div>
                    </div>
                    <div className="item btn">

                        <div className="cart_remove_btn"
                            onClick={() => removeItem(category._id)}
                        >
                            Remove
                        </div>
                    </div>
                </div >
            ))
            : null
    )
    return (
        <div>
            {renderItems()}
        </div>
    );
};

export default CategoryBlock;