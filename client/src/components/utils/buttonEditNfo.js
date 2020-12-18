import React from 'react';
import { Link } from 'react-router-dom';

const MyButtonEdit = (props) => {

    const button = () => {
        let template = '';

        switch(props.type){
            case "default":
                template = <Link
                    className={!props.altClass ? 'link_default': props.altClass }   
                    to={props.linkTo}
                    {...props.addStyles}
                >
                    {props.title}
                </Link>
            break;
            default:
                template='';
        }
        return template
    }


    return (
        <div className="my_link">
             {button()}   
        </div>
    );
};

export default MyButtonEdit;