import React, { Component } from "react";
import Loader from "react-loader-spinner";

import UserLayout from "../../../../hoc/user";

import { connect } from "react-redux";
import { getSubscribers } from "../../../../actions/subscribersList_actions";

class ListSubsribers extends Component {
  state = {
    loading: true,
  };
  componentDidMount() {
    this.props.dispatch(getSubscribers()).then(() => {
      this.setState({
        loading: false,
      });
    });
  }

  renderUsers = () =>
    this.props.getSubscribers.getSubscribers
      ? this.props.getSubscribers.getSubscribers.map((subscriber, i) => (
          <tr key={i}>
            <td className="text_align_center">{subscriber.email}</td>
          </tr>
        ))
      : null;

  render() {
    return (
      <UserLayout>
        {this.state.loading ? (
          <div className='text_align_center'>
            <Loader type="ThreeDots" color="#272723" height={80} width={80} />
          </div>
        ) : null}
        <div className="user_nfo_panel">
          <h1 className="text_align_center">List of subscribers</h1>
          <div className="user_product_block_wrapper"></div>
          <div className="history_blocks" className="text_align_center">
            <table>
              <thead className="text_align_center">
                <tr>
                  <th>Email</th>
                </tr>
              </thead>
              <tbody className="text_align_center">
                {this.renderUsers()}
              </tbody>
            </table>
          </div>
        </div>
      </UserLayout>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    getSubscribers: state.getSubscribers,
  };
};

export default connect(mapStateToProps)(ListSubsribers);
