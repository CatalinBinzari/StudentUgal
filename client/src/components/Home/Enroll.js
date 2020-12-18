import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import FormField from '../utils/Form/formField';
import { validate } from '../utils/misc';
import {connect} from 'react-redux';
import {subscribeUser} from '../../actions/user_actions';

class Enroll extends Component {
    
    state = {
        formError:false,
        formSuccess:'',
        formdata:{
            email:{
                element:'input',
                value:'',
                config:{
                    name:'email_input',
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                validation:{
                    required: true,
                    email: true
                },
                valid: false,
                validationMessage:''
            }
        
        }

    }

    
    updateForm(element){
        const newFormdata = {...this.state.formdata}
        const newElement = { ...newFormdata[element.id]}

        newElement.value = element.event.target.value;

         let validData = validate(newElement)
         newElement.valid = validData[0];
         newElement.validationMessage = validData[1]
        newFormdata[element.id] = newElement;
        console.log(newFormdata);

        this.setState({
            formError: false,
            formdata: newFormdata
        })
    }


    resetFormSuccess(type){
        const newFormdata = {...this.state.formdata}

        for(let key in newFormdata){
            newFormdata[key].value = '';
            newFormdata[key].valid = false;
            newFormdata[key].validationMessage = '';
        }

        this.setState({
            formError:false,
            formdata: newFormdata,
            formSuccess: type ? 'Congratulations' : 'Already on the database'
        });
        this.successMessage();
    }

    successMessage(){
        setTimeout(()=>{
            this.setState({
                formSuccess:''
            })
        },2000)
    }



    submitForm(event){
        event.preventDefault();
        
        let dataToSubmit = {};
        let formIsValid = true;

        for(let key in this.state.formdata){
            dataToSubmit[key] = this.state.formdata[key].value;
            formIsValid = this.state.formdata[key].valid && formIsValid;
        }

        if(formIsValid){
            this.props.dispatch(subscribeUser(dataToSubmit))
            .then(response =>{ 
                if(response.payload.success){
                    this.setState({
                        formError: false,
                        formSuccess: true
                    });
                    this.resetFormSuccess("success")
                } else {
                    this.setState({formError: true})
                    this.resetFormSuccess()
                }

                

            }).catch(e => {
                this.setState({formError: true})
            })
            
            
        } else {
            this.setState({
                formError: true
            })
        }
    }

    
    
    render() {
        return (
            <Fade>
            <div className="enroll_wrapper">
                <form onSubmit={ (event)=> this.submitForm(event)}>
                    <div className="enroll_title">
                        Enter your email:
                    </div>
                    <div className="enroll_input">
                        { <FormField
                            id={'email'}
                            formdata={this.state.formdata.email}
                            change={(element)=> this.updateForm(element)}
                        /> }

                        { this.state.formError ? 
                             <div className="error_label">Something is wrong, try again.</div>
                            :null
                        }
                        <div className="success_label">{this.state.formSuccess}</div>
                                             
                        <button onClick={(event)=> this.submitForm(event)}  >
                           Subscribe
                            
                        </button>
                        
                        <div className="enroll_discl">
                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
                        </div>
                    </div>
                </form>
            </div>
        </Fade>
        );
    }
}

export default connect()(Enroll);