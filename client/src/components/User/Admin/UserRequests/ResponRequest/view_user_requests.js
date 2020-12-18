import React, { Component } from 'react';
import FormField from './../../../../utils/Form/formField'
import {
    update,
    generateData,
    isFormValid,
} from "../../../../utils/Form/formActions"
class ViewUserRequests extends Component {
    state = {
        formError: false,
        formSuccess: false,
        sendResponse: false,
        buttonName: 'RESPOND',
        formdata: {
            name: {
                element: "input",
                value: "",
                config: {
                    label: "User name",
                    name: "name_input",
                    type: "text",
                },
                validation: {
                    required: false,
                },
                valid: true,
                touched: false,
                validationMessage: "",
                showlabel: true,
            },
            email: {
                element: "input",
                value: "",
                config: {
                    label: "User email",
                    name: "email_input",
                    type: "text",
                },
                validation: {
                    required: false,
                },
                valid: true,
                touched: false,
                validationMessage: "",
                showlabel: true,
            },
            subject: {
                element: "input",
                value: "",
                config: {
                    label: "Subject",
                    name: "subject_input",
                    type: "text",
                },
                validation: {
                    required: false,
                },
                valid: true,
                touched: false,
                validationMessage: "",
                showlabel: true,
            },
            message: {
                element: "textarea",
                value: "",
                config: {
                    label: "Message name",
                    name: "message_input",
                    type: "text",
                },
                validation: {
                    required: false,
                },
                valid: true,
                touched: false,
                validationMessage: "",
                showlabel: true,
            },
            response: {
                element: "textarea",
                value: "",
                config: {
                    label: "Response",
                    name: "response_input",
                    type: "text",
                },
                validation: {
                    required: true,
                },
                valid: true,
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
                value: this.props.info.name
            },
            email: {
                ...this.state.formdata.email,
                value: this.props.info.email
            },
            subject: {
                ...this.state.formdata.subject,
                value: this.props.info.subject
            },
            message: {
                ...this.state.formdata.message,
                value: this.props.info.message
            },
            response: {
                ...this.state.formdata.response
            }
        }
        this.setState({
            formdata: newData
        })
    }
    updateForm = (element) => {
        const newFormdata = update(element, this.state.formdata, "response");

        this.setState({
            formError: false,
            formdata: newFormdata,
        });
    };
    updateNothing() {

    }
    respond() {
        this.state.sendResponse ?
            this.setState({
                sendResponse: false,
                buttonName: 'RESPOND'
            })
            :
            this.setState({
                sendResponse: true,
                buttonName: 'ANULATE RESPONSE'
            })
    }
    sendResponseToUser = (event) => {

        let dataToSubmit = this.state.formdata.response.value
        //console.log(dataToSubmit)

        if (true) { //to validate form data
            this.props.sendResponse(dataToSubmit)

            this.props.updateState()


            this.setState({
                formSuccess: true,
            })

            setTimeout(() => {
                this.setState({
                    formSuccess: false
                })
            }, 3000)

        } else {
            this.setState({
                formError: false,
            });
        }
    };
    render() {
        console.log(this.props)
        return (
            <div>
                <h1>Edit category</h1>
                <div>
                    <FormField
                        id={"name"}
                        formdata={this.state.formdata.name}
                        change={(element) => this.updateNothing(element)}
                    />
                    <FormField
                        id={"email"}
                        formdata={this.state.formdata.email}
                        change={(element) => this.updateNothing(element)}
                    />
                    <FormField
                        id={"subject"}
                        formdata={this.state.formdata.subject}
                        change={(element) => this.updateNothing(element)}
                    />
                    <FormField
                        id={"message"}
                        formdata={this.state.formdata.message}
                        change={(element) => this.updateNothing(element)}
                    />
                    {
                        this.state.sendResponse ?
                            <div>
                                <FormField
                                    id={"response"}
                                    formdata={this.state.formdata.response}
                                    change={(element) => this.updateForm(element)}
                                />
                                <button onClick={(event) => this.sendResponseToUser(event)}>
                                    Send response to user
                                 </button>
                            </div>
                            :
                            null
                    }



                    <div>
                        {this.state.formSuccess ? (
                            <div className="form_success">Success</div>
                        ) : null}
                        {this.state.formError ? (
                            <div className="error_label">Please check your data</div>
                        ) : null}

                        <button onClick={(event) => this.respond(event)}>
                            {this.state.buttonName}
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

export default ViewUserRequests;