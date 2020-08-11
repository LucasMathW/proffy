import React from "react"
import {BrowserRouter, Route} from "react-router-dom"
import Landing from "./pages/Landing";
import teacherList from "./pages/TeacherList";
import teacherForm from "./pages/TeacherForm";

function Routes(){
    return (
        <BrowserRouter>
            <Route path="/" exact component={Landing}/>
            <Route path="/study" component={teacherList}/>
            <Route path="/give-classes" component={teacherForm}/>
        </BrowserRouter>

    );
}


export default Routes; 