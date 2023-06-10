import axios from "axios"





const Api = axios.create({
    baseURL: 'https://desafio-backend-03-dindin.pedagogico.cubos.academy',
    timeout: 1000,
    headers: { 'Content-Type': 'Application/json' }
})

 async function RegistredUser (form){
    try{
    const registerUser = await Api.post("/usuario", form) 
    console.log(registerUser)  
    return true
  } catch (error) { 
      console.error(error); 
      return false
    }
    
}

export async function LoginUser (form){
  try{ 
    const loginUser = await Api.post("/login", form)
    const { data } = loginUser
    const {token} = data
    localStorage.setItem('token', `${token}`)
    return loginUser.data
 } catch (error) {
        console.error(error)
    }
}

export async function getCategory( headers){
  try{  
  const getCategory = await Api.get('/categoria', headers)
  return getCategory.data
   } catch (error){
    console.log(error)
 }
}

export async function postTransition(data, headers){
  try{
    const postTransition = await Api.post('/transacao', data,  headers)
    
    return postTransition.data
  } catch (error) {
    console.log(error)
  }
} 

export async function getDataLoggedUser(headers){
  try{
    const getDataLoggedUser = await Api.get('/transacao', headers)
    
    return getDataLoggedUser.data
  } catch (error) { 
    console.log(error)
  }
}   

export async function deleteTransactionApi(id, headers ){
  try{
    const deleteTransaction = await Api.delete(`/transacao/${id}`, headers)

    return deleteTransaction
  } catch (error) { 
    console.log(error)
  }
} 

export async function  updatedTransationApi(id, data, headers ){
  try{
    const deleteTransaction = await Api.put(`/transacao/${id}`, data, headers)

    return deleteTransaction
  } catch (error) { 
    console.log(error)
  }
} 

export async function getExtract(headers){
  try{
    const getExtract = await Api.get(`/transacao/extrato`, headers )

    return getExtract.data
  } catch (error) { 
    console.log(error)
  }
} 


export default RegistredUser

