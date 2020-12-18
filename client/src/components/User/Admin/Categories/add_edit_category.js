import React, { Component } from 'react';
import FormField from '../../../utils/Form/formField'
import {
    update,
    generateData,
    isFormValid,
} from "../../../utils/Form/formActions";
class AddEditCategory extends Component {

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

    componentDidMount() {
        const newData = {
            name: {
                ...this.state.formdata.name,
                value: this.props.name
            }
        }
        this.setState({
            formdata: newData
        })

    }
    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, "category");

        this.setState({
            formError: false,
            formdata: newFormdata,
        });
    };
    modifyCategory = (event) => {

        let dataToSubmit = generateData(this.state.formdata, "category");
        let formIsValid = isFormValid(this.state.formdata, "category");

        if (formIsValid) {
            this.props.modifyCategory(this.props.name, dataToSubmit.name)
                .then(() => {
                    this.props.updateState()
                }
                ).then(
                    this.setState({
                        formSuccess: true,
                    })
                ).then(
                    setTimeout(() => {
                        this.setState({
                            formSuccess: false
                        })
                    }, 3000))
        }
        else {
            this.setState({
                formError: true,
            });
        }
    };

    render() {
        return (
            <div>
                <h1>Edit faculty</h1>
                <div>
                    <FormField
                        id={"name"}
                        formdata={this.state.formdata.name}
                        change={(element) => this.updateForm(element)}
                    />


                    <div>
                        {this.state.formSuccess ? (
                            <div className="form_success">Success</div>
                        ) : null}
                        {this.state.formError ? (
                            <div className="error_label">Please check your data</div>
                        ) : null}

                        <button onClick={(event) => this.modifyCategory(event)}>
                            Modify faculty
                             </button>
                    </div>
                </div>
            </div>
        );
    }
}
export default AddEditCategory;