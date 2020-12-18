import React, { Component } from 'react';
import MyButton from './button';

import { connect } from 'react-redux';


class Card extends Component {

    constructor(props) {
        super(props);

        this.renderCardImage = this.renderCardImage.bind(this);
    }



    renderCardImage(images) {
        if (images.length > 0) {
            return images[0].url
        } else {
            return '/images/image_not_available.png'
        }
    }


    render() {
        console.log(this.props);
        return (
            <div className={`card_item_wrapper`} style={{
                flexGrow: 0
            }}>
                <div
                    className="image"
                    style={{
                        background: `url(${this.renderCardImage(this.props.images)}) no-repeat`
                    }} >  </div>
                <div className="action_container">
                    <div className="tags">
                        <div className="brand">{this.props.category ? this.props.category.name : null}</div>
                        <div className="name" style={{ minHeight: "65px" }}>{this.props.name}</div>
                        <div className="price">${this.props.price}</div>
                    </div>


                    <div className="actions">
                        <div className="button_wrapp">
                            <MyButton
                                type="default"
                                altClass="card_link"
                                title="View product"
                                linkTo={`/product_detail/${this.props.cardId}`}
                                addStyles={{
                                    margin: '10px 0 0 0'
                                }} />
                        </div>
                        <div className="button_wrapp">
                            <MyButton
                                type="bag_link"
                                runAction={() => {
                                    console.log('added to cart')
                                }} />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Card);
