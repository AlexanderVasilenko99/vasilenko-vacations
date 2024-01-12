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
                <div><img className="profile-pic" src={require('../../Assets/Images/UtilityImages/me_square.jpeg')} /></div>
                <h2>👋🏻Hi There! I'm</h2>
                <h3>Alexander <span>JR</span> Vasilenko</h3>
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
                    <h1>About This Project</h1>
                    <p><span>Vasilenko Car Rental</span> is my first original project I wrote for fun and in order to practice recently
                        learned skills and wishfully learn new ones in the process - which I successfully have.<br /><br />
                        This website vas written in <span>ReactTS</span> with great emphasis on self written code. One can very rarely
                        see the use of external libraries in this project, especially regarding the styling and behavior of components.
                        I have however used very popular libraries such as <span>Redux, React-Router, and Axios</span> to achieve it's
                        functionality.<br /><br />In this project I put effort into 'clean' coding without repetition of code, object
                        oriented programming, correct file structuring and responsiveness.<br /><br />As of December 2023, the website
                        is still work in progress🙂</p>
                </div>
            </div>
            {/* <a href="This is my CV" download={cvFile}>CV</a> */}
        </div>
    );
}

export default AboutArea;
