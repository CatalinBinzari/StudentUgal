import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import PageTop from '../utils/page_top'
import { price, shipping } from '../utils/Form/fixed_categories'
import CollapseRadio from '../utils/collapseRadio'
import CollapseCheckbox from '../utils/collapseCheckbox'
import {
    getCategories,
} from '../../actions/category_actions'
import {
    getProductsToShop
} from '../../actions/productAdmin_actions'
import FontAwesomeIcon from '@fortawesome/react-fontawesome'
import faBars from '@fortawesome/fontawesome-free-solid/faBars'
import faTh from '@fortawesome/fontawesome-free-solid/faTh'
import LoadmoreCards from './loadmoreCards';
class Shop extends Component {
    state = {
        grid: '',
        limit: 600,
        skip: 0,
        filters: {
            price: [],
            shipping: [],
            category: [],
            subcategory: []
        }
    }
    componentDidMount() {
        this.props.getCategories()
        this.props.getProductsToShop(
            this.state.skip,
            this.state.limit,
            this.state.filters
        )
    }
    handleFilters = (filters, category) => {
        const newFilters = { ...this.state.filters }
        newFilters[category] = filters;


        if (category === "price") {
            let priceValues = this.handlePrice(filters)// filters are prices id: 1,2,3,4,5
            newFilters[category] = priceValues
        }
        this.showFilteredResults(newFilters)
        this.setState({
            filters: newFilters
        })
    }
    handlePrice = (value) => { //if value is 1, function return [0, 299]
        const data = price;
        let array = [];
        for (let key in data) {
            if (data[key]._id === parseInt(value, 10)) {
                array = data[key].array
            }
        }
        return array
    }
    showFilteredResults = (filters) => {
        this.props.getProductsToShop( //reset to 0 the results evey time user choose smth
            0,
            this.state.limit, //6
            filters
        ).then(() => {
            this.setState({
                skip: 0
            })
        })
    }
    showProductsItems = () => {
        if (this.props.products.toShop) {
            //console.log(this.props.products.toShop)
            return (this.props.products ?
                this.props.products.toShop.map((item, i) => (
                    <div key={item._id}>
                        {item.name}
                    </div>
                ))
                : null)
        } else {
            return null;
        }
    }

    handleGrid = () => {
        this.setState({
            grid: !this.state.grid ? 'grid_bars' : ''
        })
    }
    loadMoreCards = () => {
        //when we load more,  we dont want to replace that six with another six, we want to bring six more
        // we have to change the skip to 6
        let skip = this.state.skip + this.state.limit// 0 + 6 and if click again, will be 6 + 6
        this.props.getProductsToShop(
            skip,
            this.state.limit,
            this.state.filters,
            this.props.products.toShop //to keep current state of 6 and if we want 6 more, we merge old six with new six
        ).then(() => {
            this.setState({
                skip
            })
        })
    }
    subcategoriesFromCategories = (category_ids) => { //never read this function
        let subcategories = []
        this.props.category.map((category) => {
            if (category_ids.includes(category._id)) {
                subcategories.push(...category.subcategory)
            }
        })
        return subcategories; //return array with all subcategories from our checked category
    }
    render() {
        if (!this.props.category) return 'loading'; // TODO MODIFY!!
        const products = this.props.products
        const category = this.props.category
        return (

            <div>
                <PageTop
                    title="STUDENTI"
                />
                <div className="container">
                    <div className="shop_wrapper">
                        <div className="left">
                            <CollapseCheckbox
                                initState={true} //collapse 
                                title="Facultati"
                                list={category}
                                handleFilters={(filters) => this.handleFilters(filters, 'category')}
                            />
                            <CollapseCheckbox
                                initState={this.state.filters.category !== []}
                                title="Specialitati"
                                list={this.subcategoriesFromCategories(this.state.filters.category)}
                                handleFilters={(filters) => this.handleFilters(filters, 'subcategory')}
                            />
                            <CollapseRadio
                                initState={true}
                                title="An de studii"
                                list={price}
                                handleFilters={(filters) => this.handleFilters(filters, 'price')}
                            />
                            <CollapseCheckbox
                                initState={false}
                                title="Bursier"
                                list={shipping}
                                handleFilters={(filters) => this.handleFilters(filters, 'shipping')}
                            />
                        </div>
                        <div className="right">
                            <div className="user_nfo_panel">
                                <div className="user_product_block_wrapper"></div>
                                <div className="history_blocks">
                                <table>
                                    <tr>
                                        <th>Nume</th>
                                        <th>Prenume</th>
                                        <th>Facultate</th>
                                        <th>Nota</th>
                                    </tr>


                                    <LoadmoreCards
                                        grid={this.state.grid}
                                        limit={this.state.limit}
                                        size={products.toShopSize}
                                        products={products.toShop}
                                        loadMore={() => this.loadMoreCards()}
                                    />
                                </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );

    }
}

const mapStateToProps = (state) => {
    return {
        category: state.category.category,
        products: state.productAdmin
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCategories: bindActionCreators(getCategories, dispatch),
        getProductsToShop: bindActionCreators(getProductsToShop, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(Shop);