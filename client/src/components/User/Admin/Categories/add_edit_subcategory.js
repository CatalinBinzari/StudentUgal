import React, { Component } from 'react';
import { update, generateData, isFormValid, resetFields } from '../../../utils/Form/formActions';

import FormField from '../../../utils/Form/formField'
class AddEditSubcategory extends Component {
    state = {
        formError: false,
        formSuccess: false,
        formdata: {
            name: {
                element: 'input',
                value: '',
                config: {
                    name: 'name_input',
                    type: 'text',
                    placeholder: 'Enter speciality'
                },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                validationMessage: '',
            },
        }
    }

    showCategoryItems = () => {
        return (this.props.subcategory ?
            this.props.subcategory.map((item, i) => (
                <div className="category_item" key={item}>
                    {item}
                </div>
            ))
            : null)
    }

    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, 'subcategory');
        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }
    deleteSubcategory = (event) => {
        let dataToSubmit = generateData(this.state.formdata, 'subcategory');
        let formIsValid = isFormValid(this.state.formdata, 'subcategory');
        if (formIsValid) {
            this.props.deleteSubcategory(this.props._id, dataToSubmit.name)
                .then(() => {
                    this.props.updateState()
                }).then(
                    this.setState({
                        formSuccess: true,
                    })
                ).then(
                    setTimeout(() => {
                        this.setState({
                            formSuccess: false
                        })
                    }, 3000))
        } else {
            this.setState({
                formError: true,
            });
        }
    }

    addSubcategory = (event) => {
        let dataToSubmit = generateData(this.state.formdata, 'subcategory');
        let formIsValid = isFormValid(this.state.formdata, 'subcategory');
        if (formIsValid) {
            this.props.addSubcategory(this.props._id, dataToSubmit.name)
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
        } else {
            this.setState({
                formError: true,
            });
        }
    }
    render() {
        return (
            <div className="admin_category_wrapper">
                <h1>Speciality</h1>
                <div className="admin_two_column">
                    <div className="left">
                        <div className="brands_container">
                            {this.showCategoryItems()}
                        </div>
                    </div>
                    <div className="right">
                        <FormField
                            id={'name'}
                            formdata={this.state.formdata.name}
                            change={(element) => this.updateForm(element)}
                        />
                        {this.state.formSuccess ? (
                            <div className="form_success">Success</div>
                        ) : null
                        }
                        {this.state.formError ? (
                            <div className="error_label">Please check your data</div>
                        ) : null
                        }
                        <button onClick={(event) => this.addSubcategory(event)}>
                            Add speciality
                            </button>
                        <br />
                        <button onClick={(event) => this.deleteSubcategory(event)}>
                            Delete speciality
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default AddEditSubcategory;