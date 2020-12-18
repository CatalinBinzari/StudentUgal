import React, { Component } from 'react';
import { connect } from 'react-redux';
import { testServer } from '../../actions/user_actions';
import {
    getCategories,
    deleteCategory,
    modifyCategory,
    addCategory,
    addSubcategory
} from '../../actions/category_actions'
class TestUtils extends Component {
    // state = {
    //     info: "test"
    // }
    componentDidMount() {


        //this.props.dispatch(testServer());
        this.props.dispatch(getCategories());
        this.props.dispatch(addSubcategory('5f2e67d9a1c4bf24a44eea0d', '1101'))
        //this.props.dispatch(deleteCategory('cars'));
        //this.props.dispatch(deleteCategory('girls'));
        //this.props.dispatch(deleteCategory('planets'));
        //this.props.dispatch(modifyCategory('hightec', 'toys'));
        //let existingCategory = ['humans', 'toys']
        //let dataToSubmit = "test1"
        // this.props.dispatch(addCategory(dataToSubmit, existingCategory)).then(response => {
        //     if (response.payload.success) {
        //         console.log('succes')
        //     } else {
        //         console.log('not succes');
        //     }
        // })
        //let existingCategory = this.props
        //console.log('test')
        //console.log(existingCategory);
    }
    showCategoryItems = () => ( //grab what we have inside props
        this.props.category ?
            this.props.category.map((item, i) => (
                <div className="category_item" key={item._id}>
                    {item.name}
                </div>
            ))
            : null
    )
    checkAddCategoryWorking = () => {
        let existingCategory = this.props.category
        //console.log(existingCategory)
        let arr_category_name = []
        this.props.category ?
            this.props.category.map((item, i) => {
                arr_category_name.push(item.name)
            })
            :
            console.log('not working')
        //console.log(arr_category_name);

        //let existingCategory = ['humans', 'toys']
        let dataToSubmit = { 'name': 'data4' }
        this.props.dispatch(addCategory(dataToSubmit, existingCategory)).then(response => {
            if (response.payload.success) {
                console.log('succes')
            } else {
                console.log('not succes');
            }
            console.log(response)
        })
    }
    render() {
        return (
            <div className="APP">
                Pagina de testari, se va sterge in curand!
                <br />
                Category items
                {this.showCategoryItems()}
                {this.checkAddCategoryWorking()}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        category: state.category.category
    }
}
export default connect(mapStateToProps)(TestUtils);