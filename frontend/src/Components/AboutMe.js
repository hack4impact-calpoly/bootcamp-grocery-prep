import React from 'react';

import Styles from './AboutMe.module.css';

import me from "../imgs/me.jpg"

class AboutMe extends React.Component{
    render(){
        return(
            <div className={Styles.header}>
                <h1> 
                    Tis I, Samuel Sehnert!
                    Coder and chef extraordinaire!
                </h1>
                <p>
                    <img src={me} height="350" width="200" alt="pic of me"></img>
                </p>
                <ol>
                    <li>My name is Sam</li>
                    <li>I am not actually that good at cooking</li>
                    <li>I like to read books and go on hikes!</li>
                    <li>Always happy to learn new skills and broaden my horizons!</li>
                </ol>
            </div>
        )
    }
}

export default AboutMe;