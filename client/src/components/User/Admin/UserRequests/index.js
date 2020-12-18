import React, { Component } from 'react';
import UserLayout from '../../../../hoc/user';
import {
    getUserRequests,
    deleteContact
} from '../../../../actions/contact_actions'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux';
import ContactBlock from './contact_block'
import { withRouter } from "react-router-dom";
class UserRequests extends Component {
    state = {
        loading: true,
        showSuccess: false
    }
    componentDidMount() {

        this.props.getUserRequests()
    }

    DeleteContact(id) {
        this.props.deleteContact(id)
        this.props.getUserRequests()
    }
    AnswerContact(id) {
        this.props.history.push(`/admin/contact/${id}`);
    }
    render() {
        if (!this.props.user_requests) return 'loading';
        console.log(this.props.user_requests)
        return (
            <UserLayout>
                <div>
                    <h1>User requests</h1>
                    <div className="user_cart">
                        <ContactBlock
                            contacts={this.props.user_requests}
                            answerItem={(id) => this.AnswerContact(id)}
                            removeItem={(id) => this.DeleteContact(id)}

                        />
                    </div>
                </div>
            </UserLayout>
        );
    }
}


const mapStateToProps = (state) => {
    return {
        user_requests: state.contact
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUserRequests: bindActionCreators(getUserRequests, dispatch),
        deleteContact: bindActionCreators(deleteContact, dispatch)
    }
}
export default withRouter(connect(mapStateToProps, mapDispatchToProps)(UserRequests));