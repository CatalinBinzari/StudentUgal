import React, { Component } from 'react';
import UserLayout from '../../hoc/user';
import UserProductBlock from '../utils/User/product_block_cart.js'
import { connect } from 'react-redux';
import { getCartItems, removeCartItem, onSuccessBuy } from '../../actions/user_actions';
import Paypal from '../utils/paypal'

class UserCart extends Component {

    state = {
        loading: true,
        total: 0,
        showtotal: false,
        showSuccess: false
    }
    componentDidMount() {
        let cartItems = [];
        let user = this.props.user;
        if (user.userData) {
            if (user.userData.cart.length > 0) {
                user.userData.cart.forEach(item => {
                    cartItems.push(item.id) //push just id's from cart to cartItem
                });

                this.props.dispatch(getCartItems(cartItems, user.userData.cart))
                    .then(() => {
                        if(this.props.user.cartDetail.length > 0 ){
                            this.calculateTotal(this.props.user.cartDetail)
                        }
                    })
            }
        }
    }

    calculateTotal = (cartDetail) =>{
        let total = 0;
        cartDetail.forEach(item=>{
            total +=parseFloat(item.price,10) *item.quantity
        });
        this.setState({
            total,
            showtotal:true
        });
    }

    removeFromCart = (id) => {
        this.props.dispatch(removeCartItem(id)).then(() => {
            if (this.props.user.cartDetail.length <= 0) {
              this.setState({
                showtotal: false,
              });
            } else {
              this.calculateTotal(this.props.user.cartDetail);
            }
        });
    }
    showNoItemMessage = () =>(
        <div className="cart_no_items">
            <div>You have no items</div>
        </div>
    )

    transactionError = (data)=>{
        console.log('paypal error');
    }
    transactionCanceled = ()=>{
        console.log('transaction cancel');

    }
    transactionSuccess = (data)=>{
        this.props.dispatch(onSuccessBuy({
            cartDetail: this.props.user.cartDetail,
            paymentData: data

        })).then(()=>{
            if(this.props.user.successBuy){
                this.setState({
                    showtotal: false,
                    showSuccess: true
                })
            }
           
        })


        
    }

    render() {
        if (!this.props.user.userData) return 'loading';
        return (
            <UserLayout>
                <div>
                    <h1>Note</h1>
                    <div className="user_cart">
                        
                        
                    </div>
                </div>
            </UserLayout>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}
export default connect(mapStateToProps)(UserCart); 