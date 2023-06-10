import '../BodyFormRegistred/style.css'
import '../../style/global.css'

import LogoDimDim from '../../assets/Logo.png'

import InputForms from '../InputForms/index';
import RegistredUser from '../../Api';

import { Link, useNavigate } from 'react-router-dom';
import {  useRef, useState  } from 'react';


function BodyFormRegistred({title}){

    const navigate = useNavigate()
    const buttonRef = useRef(null)
    function capturingRegistrationData(){
        if(!form.nome)
        {
            console.log('O nome é obrigatorio')
        } else
        if(!form.email)
        {
            console.log('O email é obrigatorio')
        } else
        if(!form.senha)
        {
            console.log('A senha é obrigatoria')
        } else
        if(!form.confirmarSenha)
        {
            console.log('A confirmação da senha é obrigatoria')
        } else
        if(form.confirmarSenha !== form.senha || !form.senha || !form.confirmarSenha)
        {
            console.log('Suas senhas não são compativeis')
        } else {
            const data = form 
            const {confirmarSenha, ...jsonData} = data
            const jsonResponse = JSON.stringify(jsonData)
            const response = RegistredUser(jsonResponse)
            response.then(response => {
                if(response){
                    navigate('/')
                }
              })
        }
        
        
    }
       

   const [form, setForm] = useState({
    nome: '',
    email: '',
    senha: '',
    confirmarSenha: ''
   })

   function expressForm(event){ 
    const value = event.target.value
    setForm({...form, [event.target.name]: value})
   }


    return(
    <div >
        <header><img src={LogoDimDim} alt='Logo'/></header>
        <div className='conteiner-formregistred'>
         
            <h1 className='titleregistred'>{title}</h1>
            <InputForms
            titleInput={'Nome'}
            type={'text'}
            value={form.nome}
            onChange={expressForm}
            name='nome'
            />
            <InputForms
            titleInput={'E-mail'}
            type={'email'}
            value={form.email}
            onChange={expressForm}
            name='email'
            />
            
            <InputForms
            titleInput={'Senha'}
            type={'password'}
            value={form.senha}
            onChange={expressForm}
            name='senha'
            />
            <InputForms
            titleInput={'Confirmar Senha'}
            type={'password'}
            value={form.confirmarSenha}
            onChange={expressForm}
            name='confirmarSenha'
            />
            <button 
            ref={buttonRef} 
            onClick={capturingRegistrationData}
            >Cadastrar</button>
            <Link to='/'>
            <div className='alreadyhaveregistration'>Já tem cadastro? Clique aqui!</div>
            </Link>
        </div>
    </div>
)}




export default BodyFormRegistred
