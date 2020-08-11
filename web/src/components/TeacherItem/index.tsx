import React from "react"
import whatsappIcon from "../../assets/images/icons/whatsapp.svg"
import "./styles.css"

export interface Teacher{
    
        id: number,
        avatar: string,
        bio: string,
        cost: number,
        name: string,
        subject: string,
        whatsApp: string
}

interface TeacherItemProps {
    teacher: Teacher;

}

const TeacherItem:React.FC<TeacherItemProps> =({teacher})=> {
    return(
        <article className="teacher-item">
            <header>
                <img src={teacher.avatar} alt="Lucas Matheus"/>
                <div>
                    <strong>{teacher.name}</strong>
                    <span>{teacher.subject}</span>
                </div>   
            </header>

            <p>
                {teacher.bio}
            </p>

            <footer>
                <p>
                    Preço/hora
                    <strong> {teacher.cost} </strong>
                </p>

                <a href={`https://wa.me/${teacher.whatsApp}`}>
                    <img src={whatsappIcon} alt="whatsapp"/>
                    Entrar em contato
                </a>
            </footer>
        </article>
    );
}

export default TeacherItem;