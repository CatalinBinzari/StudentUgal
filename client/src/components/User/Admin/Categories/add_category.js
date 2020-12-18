import React, { Component } from 'react';
import FormField from '../../../utils/Form/formField'
import {
    update,
    generateData,
    isFormValid,
} from "../../../utils/Form/formActions";
import { addCategory } from '../../../../actions/category_actions'
class AddCategory extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            name: {
                element: "input",
                value: "",
                config: {
                    label: "Faculty name",
                    name: "name_input",
                    type: "text",
                    placeholder: "Enter faculty name",
                },
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
                validationMessage: "",
                showlabel: true,
            }
        }
    }
    addCategory() {
        let dataToSubmit = generateData(this.state.formdata, "category");
        let formIsValid = isFormValid(this.state.formdata, "category");
        if (formIsValid) {
            addCategory(dataToSubmit);
            this.props.updateItems();
            this.setState({
                formSuccess: true,
            });
            setTimeout(() => {
                this.setState({
                    formSuccess: false
                })
            }, 3000)
        }
        else {
            this.setState({
                formError: true,
            });
        }
    }
    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, "category");

        this.setState({
            formError: false,
            formdata: newFormdata,
        });
    };
    render() {
        return (
            <div>
                <div>
                    <FormField
                        id={"name"}
                        formdata={this.state.formdata.name}
                        change={(element) => this.updateForm(element)}
                    />
                </div>
                <div>
                    <button onClick={() => this.addCategory()}>
                        Add faculty
                </button>
                    <br /><br />
                </div>
            </div>
        );
    }
}

export default AddCategory;