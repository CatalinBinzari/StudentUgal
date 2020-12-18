import React, { Component } from 'react';
import { connect } from 'react-redux';

class Card extends Component {
    render() {
        const props = this.props;
        return (
            <tr>
                <td>{props.name}</td>
                <td>{props.lastname}</td>
                <td>{props.subcategory[0]}</td>
                <td>{props.media}</td>
            </tr>
        );
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps)(Card);
