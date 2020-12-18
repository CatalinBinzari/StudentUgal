import React, { Component } from "react";
import { connect } from "react-redux";
import {
  getProduct,
  deleteProduct,
} from "../../../actions/productAdmin_actions";
import UserLayout from "../../../hoc/user";
import UserProductBlock from "../../utils/User/product_block";
import Loader from "react-loader-spinner";

class ShowProducts extends Component {
  state = {
    loading: true,
  };

  componentDidMount() {
    this.props.dispatch(getProduct()).then(() => {
      this.setState({
        loading: false,
      });
    });
  }

  removeFromList = (id) => {
    this.props
      .dispatch(deleteProduct(id))
      .then(this.props.dispatch(getProduct()));
  };
  editProductFromList = (id) => {
    this.props.history.push(`/admin/add_student/${id}`);
  };
  render() {
    //console.log(this.props.products.getProduct);
    return (
      <UserLayout>
        <div>
          <h1>Product list</h1>
          <div className="user_cart">
            {this.state.loading ? (
              <div style={{ textAlign: "center" }}>
                <Loader
                  type="ThreeDots"
                  color="#272723"
                  height={80}
                  width={80}
                />
              </div>
            ) : null}
            <UserProductBlock
              products={this.props.products}
              type="cart"
              removeItem={(id) => this.removeFromList(id)}
              editProduct={(id) => this.editProductFromList(id)}
            />
          </div>
        </div>
      </UserLayout>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    products: state.productAdmin,
  };
};

export default connect(mapStateToProps)(ShowProducts);
