import React, { Component } from 'react';
import HomeSlider from './home_slider';
import HomePromotion from './home_promotions';
import Enroll from './Enroll';
import CardBlock from '../utils/card_block';

import {getProductsBySell, getProductsByArrival} from '../../actions/products_actions';
import { connect } from 'react-redux';

import CircularProgress from '@material-ui/core/CircularProgress';

class Home extends Component {
   

    state = {
        loading: true
    }

    componentDidMount(){
        this.props.dispatch(getProductsBySell());
        this.props.dispatch(getProductsByArrival());
        this.setState({loading:false})
    }

   
   
    render() {

        if(this.state.loading){
            return (
                <div className="main_loader">
                    <CircularProgress style={{color:'#2196F3'}} thickness={7}/> 
                </div>
            )
        } 

        return (
            <div >
                <HomeSlider/>
            </div>

        
        );
    }
}

const mapStateToProps = (state) => {
    return {
        products: state.products
    }
}

export default connect(mapStateToProps)(Home);