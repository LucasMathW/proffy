import React, {useState, FormEvent} from "react"
import {useHistory} from "react-router-dom"

//Importação da API
import api from "../../services/api";

//Importação da folha de estilo
import "./styles.css"

//Importação dos componentes
import PageHeader from "../../components/PageHeader"
import Input from "../../components/input";
import waringIcon from "../../assets/images/icons/warning.svg"
import Textarea from "../../components/Textarea";
import Select from "../../components/Select";


function TeacherForm() {

    const history = useHistory()

    const [name, setName] =useState('')
    const [avatar, setAvatar] =useState('')
    const [whatsApp, setWhatsApp] =useState('')
    const [bio, setBio] =useState('')

    const [subject, setSubject] =useState('')
    const [cost, setCost] =useState('')

    const [scheduleItems, setScheduleItems] = useState([
        { week_day: 0, from: '', to: ''}
    ]);

    function addNewScheduleItem(){
        setScheduleItems([
            ...scheduleItems,
            { week_day: 0, from: '', to: ''}
        ]);
    }
    
    function setNewScheduleItemValue(position: number, field: string, value:  string){
        const newArray = scheduleItems.map( (scheduleItem, index) => {
                
                if(index === position){
                    return {...scheduleItem, [field]:value };
                }

                return scheduleItem;
        } )


        console.log(newArray);
        setScheduleItems(newArray)
}

    function handleCreateClass(e: FormEvent){

        e.preventDefault();

        api.post('/classes', {
             name,
             avatar,
             whatsApp,
             bio,
             subject,
             cost: Number(cost),
             schedule: scheduleItems
        }).then(()=> {
            alert("Cadastro realizado com Sucesso!");

            history.push('/');
        }).catch(()=>{
            alert("Erro no Formulário!")
        })

        console.log({
             name,
             avatar,
             whatsApp,
             bio,
             subject,
             cost,
             scheduleItems
         })
    }

    return (
        <div id="page-teacher-form" className="container">
             <PageHeader 
             title="Que incrível que você quer dar aulas"
             description="O primeiro passo é preencher esse formulário de inscrição"
             />

             <main>

                <form onSubmit={handleCreateClass}>
                 <fieldset>
                    <legend>Seus dados</legend>

                    <Input 
                     name="name"
                     label="Nome completo"
                     value={name}
                     onChange={(e) => { setName(e.target.value)}}

                     />
                     
                    <Input 
                    name="avatar"
                    label="Avatar"
                    value={avatar}
                    onChange={(e) => { setAvatar(e.target.value)}}
                
                    />

                    <Input 
                    name="whatsApp" 
                    label="WhatsApp"
                    value={whatsApp}
                    onChange={(e) => { setWhatsApp(e.target.value)}}
                   
                    />

                    <Textarea 
                    name="bio" 
                    label="Biografia"
                    value={bio}
                    onChange={(e) => { setBio(e.target.value)}}
                    
                    />
                    
                 </fieldset>

                 <fieldset>

                    <legend>Sobre a aula</legend>

                    <Select 
                    name="subject" 
                    label="Matéria"
                    value={subject}
                    onChange={(e)=>{ setSubject(e.target.value)}}
                    options={[  
                        {value: 'Artes', label: 'Artes'},
                        {value: 'Biologia', label: 'Biologia'},
                        {value: 'Ciências', label: 'Ciências'},
                        {value: 'Edu. Física', label: 'Edu. Física'},
                        {value: 'Física', label: 'Física'},
                        {value: 'Geografia', label: 'Geografía'},
                        {value: 'História', label: 'História'},
                        {value: 'Português', label: 'Português'},
                        {value: 'Quimica', label: 'Química'}
                    ]}
                    />

                    <Input name="cost" 
                    label="Custu da aula"
                    value={cost}
                    onChange={(e)=>{ setCost(e.target.value)}}
                    />

                 </fieldset> 

                 <fieldset>
                     <legend>Horários disponíveis
                        <button type="button" onClick={addNewScheduleItem}>
                            + Novo horário
                        </button>
                     </legend>

    
                    {
                        scheduleItems.map((scheduleItem, index) => {
                            return (
                                <div key={ scheduleItem.week_day } className="schedule-item">
                                    <Select 
                                        name="subject" 
                                        label="Matéria"
                                        value={scheduleItem.week_day}
                                        onChange={ e => {setNewScheduleItemValue(index, `week_day`, e.target.value)}}
                                        options={[  

                                            {value: '0', label: 'Domingo'},
                                            {value: '1', label: 'Segunda-feira'},
                                            {value: '2', label: 'Terça-Feira'},
                                            {value: '3', label: 'Quarta-Feira'},
                                            {value: '4', label: 'Quinta-Feira'},
                                            {value: '5', label: 'Sexta-feira'},
                                            {value: '6', label: 'Sabado-feira'},
                                           
                                        ]}
                                    />

                                    <Input 
                                    name="from" 
                                    label="Dás" 
                                    value={scheduleItem.from}
                                    type="time"
                                    onChange={e => { setNewScheduleItemValue(index, `from`, e.target.value) }}
                                    
                                    />
                                    <Input 
                                    name="to"
                                    label="Até" 
                                    type="time"
                                    value={scheduleItem.to}
                                    onChange={ e => { setNewScheduleItemValue(index, `to`, e.target.value)}}
                                    />

                                </div> 
                            )
                        })
                    }
                    
                 </fieldset>

                 <footer>

                     <p>
                         <img src={waringIcon} alt="Aviso Importânte"/> 
                         Inportante! <br/>

                         Preencha todos os dados
                     </p>

                     <button type="submit">
                         Salvar cadastro
                     </button>

                 </footer>
                </form>
             </main>
        </div>
    );
}


export default TeacherForm;