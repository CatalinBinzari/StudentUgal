import React from "react";

import UserLayout from '../../hoc/user';
import MyButtonEdit from '../utils/buttonEditNfo';
import moment from "moment";
import FontAwesomeIcon from '@fortawesome/react-fontawesome';
import { faCalendarAlt } from '@fortawesome/fontawesome-free-solid';


import CircularProgress from '@material-ui/core/CircularProgress';
import UserHistoryBlock from '../utils/User/history_block';

import 'bootstrap-css-only/css/bootstrap.min.css';
import 'mdbreact/dist/css/mdb.css';


const UserDashboard = ({ user }) => {

  if (!user || (user && (user.userData === null || user.userData === undefined))) {
    return <div className="main_loader">
      <CircularProgress style={{ color: '#2196F3' }} thickness={7} />
    </div>
  }

 var time = moment(user && user.userData ? user.userData.createdAt : null).fromNow(true)
 
 
if(user ){
  return (
      <div>
        <UserLayout>
          <div style={{ width: "100%", display: "block" }}>
            <div className="user_nfo_panel">
              <h1>Bun venit, {user && user.userData ? user.userData.name : null}!</h1>
            </div>
            <div className="user_history">
              <div className="user_nfo_panel"
                style=
                {{
                  float: 'left',
                  width: '50%', height: "160px"
                }}
              >
                <div>
                 <h1>Date curente</h1>
                  <span>{user.userData ? user.userData.name : null}</span>
                  <span>{user.userData ? user.userData.lastname : null}</span>
                  <span>{user.userData ? user.userData.email : null}</span>
                </div>
              </div>
            </div>
          </div>
        </UserLayout>
      </div>

    );
  }

};

export default UserDashboard;
