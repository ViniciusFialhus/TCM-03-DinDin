import './styles.css'
import { useRef, useState } from 'react'
import closeModal from '../../../../assets/x.svg'
import { updatedPerfil } from '../../../../Api'


function ModalUpdatePerfil({setUpdatePerfil, perfilInfo}){

    const [perfil, setPerfil] = useState({
        id: perfilInfo.id,
        nome: perfilInfo.nome,
        email: perfilInfo.email,
        senha: ""
    })
    const refSenha = useRef(null)
    const refSenhaConfirmada = useRef(null)

    function closeModalFunction (){
        setUpdatePerfil(false)
    }

    function changeSetName(event){
        const value = event.target.value
        setPerfil((prevForm) => ({ ...prevForm, nome: value}))        
    }

    function changeSetEmail(event){
        const value = event.target.value
        setPerfil((prevForm) => ({ ...prevForm, email: value}))        
    }
    function changeSetSenha(event){
        const value = event.target.value
        setPerfil((prevForm) => ({ ...prevForm, senha: value}))        
    }

  async  function handleSubmit(){
        if(!perfil.nome){
            console.log('O nome é obrigatorio')

        } else if (!perfil.email){
            console.log('O e-amil é obrigatorio')

        } else if (refSenha.current.value !== refSenhaConfirmada.current.value){
            console.log('As Senhas não coincidem')
        } else {
            const token = localStorage.getItem('token');
            const headers = { headers: { Authorization: `Bearer ${token}` }}
            await updatedPerfil(perfil, headers)
            window.location.reload()
            setUpdatePerfil(false)        
        }
    }

    return(
    <>
        <div className='backgroundModal'>
            <div className='containerModal'>
                <div className='initText'>
                    Editar Perfil
                    <img src={closeModal} className='imgClose' alt='closeModal' onClick={closeModalFunction}/>
                    <div className='containerSubmit'>
                      <label>Nome</label>
                      <input type='text' defaultValue={perfilInfo.nome} onChange={changeSetName}/>
                      <label className='e-mail'>E-mail</label>
                      <input type='text' defaultValue={perfilInfo.email} onChange={changeSetEmail}/>
                      <label>Senha</label>
                      <input type='password' ref={refSenha} onChange={changeSetSenha}/>
                      <label>Confirmar Senha</label>
                      <input type='password' ref={refSenhaConfirmada}/>
                      <button type='submit' onClick={handleSubmit}>Confirmar</button>
                    </div>
                </div>
            </div>
        </div>
    </>
    )
}

export default ModalUpdatePerfil