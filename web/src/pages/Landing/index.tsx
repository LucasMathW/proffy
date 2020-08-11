import React, { useState, useEffect } from "react"
import {Link} from "react-router-dom"

import logoImg from "../../assets/images/logo.svg"
import LandingImg from "../../assets/images/landing.svg"
import studyIcon from "../../assets/images/icons/study.svg"
import givClassIcons from "../../assets/images/icons/give-classes.svg"
import purpleHeartIcon from "../../assets/images/icons/purple-heart.svg"

import './styles.css'
import api from "../../services/api"

function Landing(){

    const [totalConnections, setTotalConnections] = useState(0); 

    useEffect(() => {
        api.get('/connections').then(response => {
            console.log(response);

            const {total} = response.data;

            setTotalConnections(total)
        })

    }, [])
    return (
        <div id="page-landing">
            <div id="page-landing-content" className="container">
                <div className="logo-container">
                    <img src={logoImg} alt=""/>
                    <h2>Sua plataforma de estudos gerais.</h2>
                </div>

                <img
                    alt="Plataforma de estudos" 
                    className="hero-image" 
                    src={LandingImg} 
                />

                <div className="buttons-container">
                    <Link to="study" className="study">
                        <img src={studyIcon} alt="Estudar"/>
                        Estudar
                    </Link>

                    <Link to="give-classes" className="give-classes">
                        <img src={ givClassIcons} alt="Estudar"/>
                        Dar aulas
                    </Link>
                </div>

                <span className="total-connections">
                 Total de {totalConnections} coneçxões já realizada <img src={purpleHeartIcon} alt=""/>
                </span>
            </div>
        </div>
    );
}

export default Landing;