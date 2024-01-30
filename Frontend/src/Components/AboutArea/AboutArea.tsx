import UseTitle from "../../Utils/UseTitle";
import Header from "../Common/header/header";
import Tooltip from '@mui/material/Tooltip';
import React, { useEffect, useRef } from "react";
import { NavLink, useParams } from "react-router-dom";
import { HashLink } from "react-router-hash-link";
import "./AboutArea.css";

// function AboutArea(): JSX.Element {
//     UseTitle("Vasilenko Vacations | About");
//     return (
//         <div className="AboutArea">
//             <Header {...{ title: "About Me & This Project" }} />
//         </div>
//     );
// }

// export default AboutArea;


// import { default as cvFile, default as myCV } from "../../../../Assets/Files/Downloads/Alexander-Vasilenko-CV.pdf";

function AboutArea(): JSX.Element {
    UseTitle("Vasilenko Vacations | About");
    const isFirstScroll = useRef(true);
    function handleScrollChange(): void {
        console.log("eventlistener triggered");
        if (isFirstScroll.current) {
            isFirstScroll.current = false;
            console.log("scrolling to section...");
            window.scrollTo({ top: 840, behavior: "smooth" })
            window.removeEventListener('scroll', handleScrollChange);
        }
    }
    window.addEventListener('scroll', handleScrollChange);
    let hashlink = React.useRef();

    class myLinksModel {
        public imageName: string;
        public link: string;
        constructor(imageName: string, link: string) {
            this.imageName = imageName;
            this.link = link;
        }
    }
    // require('../../Assets/Images/UtilityImages/')
    const myContacts: myLinksModel[] = [
        new myLinksModel("giticon.png", "https://github.com/AlexanderVasilenko99"),
        new myLinksModel("linkedinicon.png", "https://www.linkedin.com/in/alexander-vasilenko-323a21299/"),
        new myLinksModel("phoneicon.png", "050-814-5431"),
        new myLinksModel("emailicon.png", "alexandervjr1@gmail.com"),
    ];
    return (
        <div className="AboutArea">
            <div className="first-section">
                <h1 className="h1">About Me & This Project</h1>
                <div>
                    <NavLink to="https://www.linkedin.com/in/alexander-vasilenko-323a21299/" target="_blank">
                        <img className="profile-pic" src={require('../../Assets/Images/UtilityImages/me_square.jpeg')} />
                    </NavLink>
                </div>
                <h2>👋🏻Hi There! I'm</h2>
                <h3>
                    Alexander
                    <span> JR </span>
                    Vasilenko</h3>
                <h4>Full Stack Developer</h4>
                <h5>
                    {myContacts.map(c =>
                        <Tooltip title={c.link} arrow>
                            <NavLink to={c.link} target="_blank">
                                <img className="icon" src={require(`../../Assets/Images/UtilityImages/${c.imageName}`)} />
                            </NavLink>
                        </Tooltip>
                    )}
                    <Tooltip title="My CV" arrow>
                        <NavLink to="#"// download={myCV}
                            target="_blank">
                            <img className="icon" src={require(`../../Assets/Images/UtilityImages/cv.png`)} />
                        </NavLink>
                    </Tooltip>
                </h5>
                <div className="chevron-holder">
                    <HashLink smooth to="#about-grid-container" ref={hashlink}>
                        <div className="scroll-down"></div>
                    </HashLink>
                </div>
            </div>

            <div className="about-grid-container" id="about-grid-container">
                <div>
                    <h1>About Me</h1>
                    <p>Hi again and welcome! My name is <span>Alexander Vasilenko</span> and I am a 24 year old student currently on my
                        path to become a full stack developer.
                        <br /><br />Besides studying and working, I spend most of my time constantly
                        learning new things, reading about new technologies and love exploring new fields. I am very into coding and
                        technology overall, a big fan of motorics who finds it very pleasing to work and wrench on motorcycles and
                        scooters and learning the mechanics of how they work. To say I am also a big fan of physical
                        activities and absolutely love hiking and working out would be an absolute understatement as I work out at least
                        five
                        times a week and take great pride in my physical achievements.
                        <br /><br />
                        The oldest child to two amazing parents, an older brother, a partner, your honest friend, a determined creator,
                        and an aspiring individual with vast interests fields and many dreams and milestones yet to be achieved. An
                        ambitious man with a unique personality constantly seeking to improve and better himself and his surrounding.
                    </p>
                </div>
                <div>
                    <h1>About This Project</h1><p>

                        <span>Vasilenko Vacations</span> is my first full-scale full stack project, one of many web projects
                        overall over the past few years, and my third and final project as part of my studies at John Bryce to
                        become a full stack web developer.

                        <br /><br /><span>Frontend - </span>
                        the client side was written in <span>ReactTS</span> according to <span>OOP principals</span> while
                        integrating popular programming libraries and technologies such as <span> Redux, React-Router, and Axios
                        </span> just to name a few.<br /> The front-end was thought-over, written and styled with great emphasis
                        on self made and coded content - Almost everything regarding structure, features, style and functionality
                        was thought through, written and implemented by yours truly, me.😁 <br />

                        I also put much effort into 'clean' coding aiming to avoid unnecessary repetition of code, correct file
                        structuring and page responsiveness to mention a few.

                        <br /><br /><span>Backend - </span>
                        the server side was written in <span>NodeJS</span> with the use of <span>Express
                        </span> and structured according to best practice <span>REST API principals.</span>

                        <br /><br /><span>Database - </span> the DB is relational. It contains multiple
                        tables that are interconnected in one-one, one-many, and many-many relationships.

                        <br /><br /><span>Security - </span>
                        regarding <span>Security</span>, various steps were taken to implement various of secure coding and
                        preventing various types of malicious safety exploitations. Namely, <span> preventing SQL injection,
                            XXS attacks, IDOR attacks, using JWT, as well as hashing and salting sensitive information and
                            much more.</span>

                        <br /><br />As of January 2024, the website is still work in progress🙂</p><br />
                </div>
            </div>
            {/* <a href="This is my CV" download={cvFile}>CV</a> */}
        </div >
    );
}

export default AboutArea;
