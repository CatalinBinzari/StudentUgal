import React, { Component } from "react";
import Loader from "react-loader-spinner";

import UserLayout from "../../../../hoc/user";

import { connect } from "react-redux";
import { getUsers } from "../../../../actions/usersList_actions";

class ListUsers extends Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    this.props.dispatch(getUsers()).then(() => {
      this.setState({
        loading: false,
      });
    });
  }

  renderUsers = () =>
    this.props.getUsers.getUsers
      ? this.props.getUsers.getUsers.map((user, i) => (
          <tr key={i}>
            <td>{user.name}</td>
            <td>{user.lastname}</td>
            <td>{user.email}</td>
            <td>{user.role}</td>
          </tr>
        ))
      : null;

  render() {
    return (
      <UserLayout>
        {this.state.loading ? (
          <div style={{ textAlign: "center" }}>
            <Loader type="ThreeDots" color="#272723" height={80} width={80} />
          </div>
        ) : null}
        <div className="user_nfo_panel">
          <h1>List of users</h1>
          <div className="user_product_block_wrapper"></div>

          <div className="history_blocks">
            <table>
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Lastname</th>
                  <th>Email</th>
                  <th>Role</th>
                </tr>
              </thead>

              <tbody>{this.renderUsers()}</tbody>
            </table>
          </div>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getUsers: state.getUsers,
  };
};

export default connect(mapStateToProps)(ListUsers);
