import React from "react";

import {Link} from "react-router-dom"
import LogoImage from '../../assets/images/logo.svg'
import backIcon from '../../assets/images/icons/back.svg'

import "./styles.css"

//PROPRIEDADES QUE ESSE COMPONENTE VAI ACEITAR
interface PageHeaderProps {
    title: string;
    description?: string;
}

const PageHeader: React.FC<PageHeaderProps> =({ title, description, children })=> {
    return (
        <header className="page-header">

            <div className="top-bar-container">
                <Link to="/">
                    <img src={backIcon} alt="voltar"/>
                </Link>

                <img src={LogoImage} alt="proffy"/> 
            </div>

            <div className="header-content"> 
                <strong>{title}</strong>
                { description && <p>{ description }</p> }

                { children }         
            </div>

        </header>
    );
}

export default PageHeader