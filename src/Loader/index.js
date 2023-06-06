import React from 'react';
import './Loader.css';
import loader from "../Assets/gif/Spinner-1s-200px.gif"

const Loader = () => {
    return (
        <>
            <div className="loader-container">
                <img src={loader} alt='Loading...' />
            </div>
        </>
    );
};

export default Loader;
