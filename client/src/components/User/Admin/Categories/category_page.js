import React, { Component } from 'react';
import UserLayout from '../../../../hoc/user';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {
    getCategory,
    addSubcategory,
    deleteSubcategory,
    clearEditCategory,
    modifyCategory
} from '../../../../actions/category_actions'
//import FileUpload from '../../utils/Form/fileupload';
import AddEditCategory from './add_edit_category'
import AddEditSubcategory from './add_edit_subcategory'
class CategoryPage extends Component {
    state = {
        _id: null,
        name: '',
        image: [],
        subcategory: []
    }
    id = this.props.match.params.id //get the id from params
    componentDidMount() {
        this.props.getCategory(this.id)
    }
    updateState() {
        this.props.getCategory(this.id)
    }
    componentWillUnmount() {
        this.props.clearEditCategory()
    }
    render() {
        if (!this.props.category) return null;
        return (
            <div>
                {console.log(this.props)}
                <UserLayout>
                    <div>
                        <AddEditCategory
                            _id={this.props.category[0]._id}
                            name={this.props.category[0].name}
                            modifyCategory={(name, new_name) => this.props.modifyCategory(name, new_name)}
                            updateState={() => this.updateState()}

                        />

                        <AddEditSubcategory
                            _id={this.props.category[0]._id}
                            subcategory={this.props.category[0].subcategory}
                            addSubcategory={(id, name) => this.props.addSubcategory(id, name)}
                            deleteSubcategory={(id, name) => this.props.deleteSubcategory(id, name)}
                            updateState={() => this.updateState()}
                        />
                    </div>
                </UserLayout>
            </div >
        );
    }
}
const mapStateToProps = (state) => {
    return {
        category: state.category.modify_category
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getCategory: bindActionCreators(getCategory, dispatch),
        addSubcategory: bindActionCreators(addSubcategory, dispatch),
        deleteSubcategory: bindActionCreators(deleteSubcategory, dispatch),
        clearEditCategory: bindActionCreators(clearEditCategory, dispatch),
        modifyCategory: bindActionCreators(modifyCategory, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(CategoryPage);