import React, { Component } from 'react';
import UserLayout from '../../../hoc/user';
import { connect } from 'react-redux';
import CategoryBlock from './Categories/category_block'
import AddCategory from './Categories/add_category'
import {
    getCategories,
    deleteCategory
}
    from '../../../actions/category_actions'
import { withRouter } from "react-router-dom";
class ManageCategories extends Component {
    state = {
        loading: true,
        showSuccess: false
    }
    componentDidMount() {
        this.props.dispatch(getCategories())
    }
    DeleteCategory(id) {
        this.props.dispatch(deleteCategory(id))
        this.props.dispatch(getCategories())
    }
    ModifyCategory(id) {
        this.props.history.push(`/admin/category/${id}`);
    }
    render() {
        if (!this.props.category) return 'loading or no states defined';
        return (
            <div>
                <UserLayout>
                    <div>
                        <h1>Faculties</h1>
                        <div>
                            <AddCategory
                                updateItems={(id) => this.props.dispatch(getCategories())}
                            />
                        </div>
                        <div className="user_cart">
                            <CategoryBlock
                                categories={this.props.category}
                                removeItem={(id) => this.DeleteCategory(id)}
                                modifyItem={(id) => this.ModifyCategory(id)}
                            />
                        </div>
                    </div>
                </UserLayout >
            </div >
        )
    }
}
const mapStateToProps = (state) => {
    return {
        category: state.category.category
    }
}
export default withRouter(connect(mapStateToProps)(ManageCategories));
