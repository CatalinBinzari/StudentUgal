import React from "react";

const UserProductBlock = ({ products, removeItem, editProduct }) => {
  const rederCartImage = (images) => {
    if (images.length > 0) {
      return images[0].url;
    } else {
      return "/images/image_not_availble.png";
    }
  };

  const showLessCaracters = (str) => {
    if (str.length > 25) {
      str = str.substr(0, 25);
      return `${str}...`;
    } else {
      return str;
    }
  };

  const renderItems = () =>
    products.getProduct
      ? products.getProduct.map((product) => (
          <div className="user_product_block" key={product._id}>
            <div className="item">
              <div
                className="image"
                style={{
                  background: `url(${rederCartImage(
                    product.images
                  )}) no-repeat`,
                }}
              ></div>
            </div>
            <div className="item">
              <h4>Product name</h4>
              <div>{showLessCaracters(product.name)}</div>
            </div>
            <div className="item">
              <h4>Category</h4>
              <div>{product.category.name}</div>
            </div>
            <div className="item">
              <h4>Price</h4>
              <div>$ {product.price}</div>
            </div>
            <div className="item btn">
              <div
                className="cart_edit_btn"
                onClick={() => editProduct(product._id)}
              >
                Edit
              </div>
              <div
                className="cart_remove_btn"
                onClick={() => removeItem(product._id)}
              >
                Remove
              </div>
            </div>
          </div>
        ))
      : null;

  return <div>{renderItems()}</div>;
};

export default UserProductBlock;
