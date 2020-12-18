import React, { Component } from 'react';
// import '@fortawesome/fontawesome-free/css/all.min.css';
// import 'bootstrap-css-only/css/bootstrap.min.css';
// import 'mdbreact/dist/css/mdb.css';
import { MDBContainer, MDBRow, MDBCol, MDBIcon, MDBBtn, MDBInput } from "mdbreact";
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import {
    addUserContactMessage
} from '../../actions/contact_actions'
const validEmailRegex =
    RegExp(/^(([^<>()\[\]\.,;:\s@\"]+(\.[^<>()\[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i);
class Contact extends Component {
    constructor(props) {
        super(props);
        this.state = {
            name: '',
            email: '',
            subject: '',
            message: '',
            errors: {
                name: '',
                email: '',
                subject: '',
                message: '',

            },
            form: ''
        };

        this.handleChange = this.handleChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleChange(event) {
        const target = event.target;
        let errors = this.state.errors;

        const name = target.name;
        const value = target.value

        switch (name) { //validation
            case 'name':
                errors.name =
                    value.length < 4
                        ? 'Full Name must be 4 characters long!'
                        : '';
                break;
            case 'email':
                errors.email =
                    validEmailRegex.test(value)
                        ? ''
                        : 'Email is not valid!';
                break;
            case 'subject':
                errors.subject =
                    value.length < 5
                        ? 'Subject must be 5 characters long!'
                        : '';
                break;
            case 'message':
                errors.message =
                    value.length < 10
                        ? 'Message must be 10 characters long!'
                        : '';
                break;
            default:
                break;
        }

        this.setState({
            errors,
            [name]: value
        });
    }


    validateForm = (errors) => {
        let valid = true;
        Object.values(errors).forEach(
            // if we have an error string set valid to false
            (val) => val.length > 0 && (valid = false)
        );

        //bug fix
        this.state.name == '' ? valid = false : console.log('valid name');
        this.state.email == '' ? valid = false : console.log('valid email');
        this.state.subject == '' ? valid = false : console.log('valid subject');
        this.state.message == '' ? valid = false : console.log('valid message');

        return valid;
    }

    handleSubmit(event) {
        const dataToSubmit = (({ name, email, subject, message }) => ({ name, email, subject, message }))(this.state); //subset from this.states
        console.log(dataToSubmit)
        event.preventDefault();
        if (this.validateForm(this.state.errors)) {
            this.props.addUserContactMessage(dataToSubmit)
                .then(
                    this.setState({

                        form: 'Message has been sent'
                    })
                ).then(
                    this.resetForm()
                )

        } else {
            this.setState({
                form: 'Invalid Form'
            })
        }

    }
    resetForm = () => {
        this.setState({
            name: '',
            email: '',
            subject: '',
            message: '',
            errors: {
                name: '',
                email: '',
                subject: '',
                message: '',

            },
        })
    }
    render() {
        let { errors, form } = this.state;
        return (
            <div className='use-bootstrap'>
                <MDBContainer>
                    <h2 className="h1-responsive font-weight-bold text-center my-5">
                        Contacteaza-ne
                </h2>
                    <p className="text-center w-responsive mx-auto pb-5">
                    Direcţia Generală Secretariat <br />
                    Incepe mesajul cu 'Buna'
                </p>
                    <MDBRow>
                        <MDBCol md="9" className="md-0 mb-5">
                            <form onSubmit={this.handleSubmit}>
                                <MDBRow>
                                    <MDBCol md="6">
                                        <div className="md-form mb-0">
                                            <MDBInput
                                                name='name'
                                                type="text"
                                                label="Nume"
                                                value={this.state.name}
                                                onChange={this.handleChange}
                                            />
                                            {errors.name.length > 0 && <span className='error'>{errors.name}</span>}
                                        </div>
                                    </MDBCol>
                                    <MDBCol md="6">
                                        <div className="md-form mb-0">
                                            <MDBInput
                                                type="text"
                                                name="email"
                                                label="Email"
                                                value={this.state.email}
                                                onChange={this.handleChange}
                                            />
                                            {errors.email.length > 0 && <span className='error'>{errors.email}</span>}
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol md="12">
                                        <div className="md-form mb-0">
                                            <MDBInput
                                                type="text"
                                                name="subject"
                                                label="Subiect"
                                                value={this.state.subject}
                                                onChange={this.handleChange}
                                            />
                                            {errors.subject.length > 0 && <span className='error'>{errors.subject}</span>}
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                <MDBRow>
                                    <MDBCol md="12">
                                        <div className="md-form mb-0">
                                            <MDBInput
                                                type="textarea"
                                                name="message"
                                                label="Mesaj"
                                                value={this.state.message}
                                                onChange={this.handleChange}
                                            />
                                            {errors.message.length > 0 && <span className='error'>{errors.message}</span>}
                                        </div>
                                    </MDBCol>
                                </MDBRow>
                                <div className="text-center text-md-left">
                                    <MDBBtn color="primary" size="md" type="submit" >
                                        TRIMITE
                                </MDBBtn>
                                </div>
                                {form.length > 0 && <span className='error'>{form}</span>}
                            </form>

                        </MDBCol>
                        <MDBCol md="3" className="text-center">
                            <ul className="list-unstyled mb-0">
                                <li>
                                    <MDBIcon icon="phone" size="2x" className="blue-text mt-4" />
                                    <p>(+40) 336 130 108</p>
                                </li>
                                <li>
                                    <MDBIcon icon="envelope" size="2x" className="blue-text mt-4" />
                                    <p>secretariat@ugal.ro</p>
                                </li>
                            </ul>
                        </MDBCol>
                    </MDBRow>
                </MDBContainer>
            </div>
        );
    }
}


const mapDispatchToProps = (dispatch) => {
    return {
        addUserContactMessage: bindActionCreators(addUserContactMessage, dispatch),
    }
}
export default connect(null, mapDispatchToProps)(Contact);
