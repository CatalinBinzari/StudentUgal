import React from "react";
import { Link } from "react-router-dom";
import { connect } from "react-redux";

const links = [
  {
    name: "Contul meu",
    linkTo: "/user/dashboard",
  },
  {
    name: "Informatii utilizator",
    linkTo: "/user/user_profile",
  },
  {
    name: "Situatii scolare",
    linkTo: "/user/cart",
  },
];

const admin = [
  //TODO adaugi obiecte si note
  {
    name: "Manage faculties",
    linkTo: "/admin/manage_faculties",
  },
  {
    name: "Users list",
    linkTo: "/admin/users_list",
  },
  {
    name: "User requests",
    linkTo: "/admin/user_requests",
  },
  {
    name: "Add student",
    linkTo: "/admin/add_student",
  },
  {
    name: "Manage marks",
    linkTo: "/admin/manage_marks",
  }
];

const UserLayout = (props) => {
  const generateLinks = (links) =>
    links.map((item, i) => (
      <Link to={item.linkTo} key={i}>
        {item.name}
      </Link>
    ));

  return (
    <div className="container">
      <div className="user_container">
        <div className="user_left_nav">
          {
            props.user.userData ?
            props.user.userData.isAdmin ? 
                (<div>
                  <h2>Admin</h2>
                  <div className="links">{generateLinks(admin)}</div>
                </div>)
              : (
                <div>
                  <h2>My account</h2>
                  <div className="links">{generateLinks(links)}</div>
                </div>)
              
              : null
          }
        </div>
        <div className="user_right">{props.children}</div>
      </div>
    </div>
  );
};

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(UserLayout);
