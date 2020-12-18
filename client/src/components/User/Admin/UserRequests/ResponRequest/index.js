import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux'
import { getUserRequest } from '../../../../../actions/contact_actions'
import UserLayout from '../../../../../hoc/user'
import ViewUserRequests from './view_user_requests'
class UserRequests extends Component {
    id = this.props.match.params.id //get the id from params
    componentDidMount() {
        this.props.getUserRequest(this.id)
    }
    updateState() {
        //this.props.getUserRequest(this.id)
    }
    componentWillUnmount() {
        //this.props.clearEditCategory()
    }
    sendResponse(response) {
        console.log(response)
    }
    removeRequest() {

    }
    render() {
        if (!this.props.user_requests) return 'loading';
        console.log(this.props.user_requests[0])
        return (
            <div>
                <UserLayout>
                    <div>
                        <ViewUserRequests
                            info={this.props.user_requests[0]}
                            sendResponse={(response) => this.sendResponse(response)}
                            updateState={() => this.updateState()}
                            removeRequest={() => this.removeRequest()}

                        />
                    </div>
                </UserLayout>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user_requests: state.contact.user_requests
    }
}
const mapDispatchToProps = (dispatch) => {
    return {
        getUserRequest: bindActionCreators(getUserRequest, dispatch),
        //deleteContact: bindActionCreators(deleteContact, dispatch)
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(UserRequests);