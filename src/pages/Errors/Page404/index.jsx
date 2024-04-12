import React from 'react';
import { NavLink } from 'react-router-dom';

const Page404 = () => {
    return (
        <div>
            <h1>Oops!</h1>
            <p>Page not found!</p>
            <NavLink to={'/'}>Return to Homepage</NavLink>
        </div>
    );
};

export default Page404;