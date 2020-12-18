import React, { Component } from 'react';
import UserLayout from "../../hoc/user";
import FormField from "../utils/Form/formField";
import { connect } from "react-redux";
import { bindActionCreators } from 'redux'
import {
    update,
    populateOptionFields,
} from "../utils/Form/formActions";
import {
    getProductsToShop
} from '../../actions/productAdmin_actions'
class ManageMarks extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formType: "",
        formdata: {
            students: {
                element: "select",
                value: "",
                config: {
                    label: "Select student",
                    name: "category_input",
                    options: [1, 2, 3],
                },
                validation: {
                    required: false,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showlabel: true,
            },
        },
    };
    componentDidMount() {
        const productId = this.props.match.params.id;
        const formdata = this.state.formdata;
        this.props.dispatch(getProductsToShop()).then((response) => {
          const newFormdata = populateOptionFields(
            formdata,
            this.props.products,
            "students"
          );
          console.log(newFormdata);
          this.updateFields(newFormdata);
        });
    }
    updateFields = (newFormdata) => {
        this.setState({
          formdata: newFormdata,
        });
      };
    updateForm = (element) => {
        const formdata = update(element, this.state.formdata, "students");

        this.setState({
            formError: false,
            formdata: formdata,
        });

        //console.log(formdata);
    };

    render() {
        return (
            <UserLayout>
                <FormField
                    id={"students"}
                    formdata={this.state.formdata.students}
                    change={(element) => this.updateForm(element)}
                />
            </UserLayout>

        );
    }
};

const mapStateToProps = (state) => {
    return {
        products: state.productAdmin.toShop
    };
};
const mapDispatchToProps = (dispatch) => {
    return {
        getProductsToShop: bindActionCreators(getProductsToShop, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(ManageMarks);