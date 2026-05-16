import React from 'react';
import Banner from './banner';
import Featured from './Featured';
import Contact from './Contact';
import ExtraSections from './ExtraSections';

const Home = () => {
    return (
        <div className=''>
            <Banner/>
            <Featured/>
            <ExtraSections/>
            <Contact/>
        </div>
    );
};

export default Home;