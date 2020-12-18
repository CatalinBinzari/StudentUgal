import React from 'react';
import MyButton from '../../../utils/button'
const ContactBlock = ({ contacts, answerItem, removeItem }) => {

    const renderItems = () => (
        contacts.user_requests ?
            contacts.user_requests.map(contact => (
                <div className="user_product_block" key={contact._id}>
                    <div className="item">
                        <h4>Contact name</h4>
                        <div>
                            {contact.name}
                        </div>
                    </div>
                    <div className="item">
                        <h4>Contact Subject</h4>
                        <div>
                            {contact.subject}
                        </div>
                    </div>
                    <div className="item btn">
                        <MyButton
                            type="modify_category"
                            title="Modify"
                            linkTo={`/admin/contact/${contact._id}`}

                        />
                        <div className="cart_modify_btn"
                            onClick={() => answerItem(contact._id)}
                        >
                            View
                        </div>
                    </div>
                    <div className="item btn">

                        <div className="cart_remove_btn"
                            onClick={() => removeItem(contact._id)}
                        >
                            Remove
                        </div>
                    </div>
                </div >
            ))
            : null
    )
    return (
        <div>
            {renderItems()}
        </div>
    );
};

export default ContactBlock;