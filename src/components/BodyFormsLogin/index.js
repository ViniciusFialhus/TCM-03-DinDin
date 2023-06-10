import '../BodyFormsLogin/style.css'
import InputForms from '../InputForms/index';
import { LoginUser, getDataLoggedUser } from '../../Api';
import {  useNavigate } from 'react-router-dom';
import { useState, useRef } from 'react';





function BodyForm({title, onData}){
    const buttonRef = useRef(null)
    const navigate = useNavigate()
    
    const [form, setForm] = useState({
        email: '',
        senha: ''
    }); 
    

    const expressForm = (event) => {
        const value = event.target.value
        setForm({...form, [event.target.name]: value})
    };

 async function capturingLoginData(){
        if(!form.email){ 
            console.log('E-mail obrigatorio')
        } else if (!form.senha) {
            console.log('Senha é obrigatoria')
        } else {     
           const response = await LoginUser(form)
           if(response !== undefined){
           const {usuario} = response
           const {nome, email} = usuario
           if(form.email === email){
            navigate('/LoggedPage')
            localStorage.setItem('LoginName', `${nome}`)
                const token = localStorage.getItem('token')
                const headers =  {headers: {Authorization: `Bearer ${token}` } }
                const responseDataUser =  await getDataLoggedUser(headers)
               
           } 
        }
    }     
 }

 
    
    return(
        <div className='conteiner-form'>
        
            <h1 className='title'>{title}</h1>
            
            <InputForms
            titleInput={'E-mail'}
            type={'email'}  
            value={form.email}
            onChange={expressForm}
            name='email'
            />
            <InputForms
            titleInput={'Password'}
            type={'password'}
            value={form.senha} 
            onChange={expressForm}
            name='senha'
            />
            <button
             ref={buttonRef}
             onClick={capturingLoginData}
             >Entrar</button>
        </div>
    )
}



export default BodyForm
