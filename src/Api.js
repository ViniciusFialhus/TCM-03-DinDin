import axios from "axios"
import { useState } from "react"




const Api = axios.create({
    baseURL: 'https://desafio-backend-03-dindin.pedagogico.cubos.academy',
    timeout: 1000,
    headers: { 'Content-Type': 'Application/json' }
})

 async function RegistredUser (form){
    try{
    const registerUser = await Api.post("/usuario", form)   
    const token = registerUser.data
    const {nome, email, id, senha} = token
    localStorage.setItem(`${senha}`, `${email}`)
    localStorage.setItem(`${nome}`, `${email}`)
    return true
  } catch (error) { 
      console.error('Erro ao enviar solicitação para a API:', error.response.data); 
      return false
    }
    
}

export async function LoginUser (form){
  try{ 
    const loginUser = await Api.post("/login", form)
    const { data } = loginUser
    const {token, usuario } = data
    localStorage.setItem('token', `${token}`)
    return loginUser.data
 } catch (error) {
        console.error(error.response.data)
    }
}

export async function getCategory( headers){
  try{  
  const getCategory = await Api.get('/categoria', headers)
  return getCategory.data
   } catch (error){
    console.log(error.response.mensagem)
 }
}

export async function postTransition(body, headers){
  try{
    const postTransition = await Api.post('/transacao', body, headers)
    return postTransition.data
  } catch (error) {
    console.log(error.response.data)
  }
} 

export default RegistredUser

