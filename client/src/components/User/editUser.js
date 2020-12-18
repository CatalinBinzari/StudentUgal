import React from 'react';
import UserLayout from '../../hoc/user';
import UpdatePerosnalNfo from './update_personal_nfo';

const EditUser = () => {
    return (
        <UserLayout>
            <h1>
                Profile
            </h1>
            <UpdatePerosnalNfo/>
            
        </UserLayout>
    );
};

export default EditUser;