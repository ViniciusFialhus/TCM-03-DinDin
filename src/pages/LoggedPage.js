import '../style/global.css'
import '../style/LoggedPage.css'
import LogoDimDim from '../assets/Logo.png'
import filterVector from '../assets/filterVector.svg'
import poligon from '../assets/Polygon.svg'
import faceVector from '../assets/faceVector.png'
import circleVector from '../assets/circleVector.png'
import logout from '../assets/logoutVector.png'
import poligon2 from '../assets/Polygon 2.svg'
import x from '../assets/x.svg'
import { getCategory, postTransition } from '../Api'
import {  useNavigate } from 'react-router-dom';
import { useState, useRef, useEffect} from 'react'




function LoggedPage (){

    const LoginName = localStorage.getItem('LoginName')
    const Navigate = useNavigate()
    const modalBackground = useRef(null)
    const buttonEntrada =  useRef(null)
    const buttonSaida = useRef(null)
    const polygonRef = useRef(null)
    const modalRef = useRef(null)
    const modalInput = useRef(null)
    const modalInputValor = useRef(null)
    const modalInputDescricao = useRef(null)
    const modalbuttonTransit = useRef(null)

   

    const [category, setCategory] = useState([])
    const [inputCategory, setInputCategory] = useState('')
    let type = 'saida'
    const [form, setForm] = useState({  
    tipo: type,
    descricao: "",
    valor: 0,
    data: "",
    categoria_id: 0
    })  
    const [idrequest, setIdRequest]  = useState('')

  function removeToken(){
        localStorage.removeItem("token")
        Navigate('/')
  }

  function addTagsModal(){
      modalBackground.current.style.display = 'flex'
      modalBackground.current.style.justifyContent = 'center'
      modalBackground.current.style.alignItems = 'center'  
  }

  function removeTagModal(){
      modalBackground.current.style.display = 'none'
  }

  function changeColorSaida (){
      buttonSaida.current.style.backgroundColor = '#FF576B'
      buttonEntrada.current.style.backgroundColor = '#B9B9B9'
      type = 'saida'
      console.log(type)
      
  }

  function changeColorEntrada (){
      buttonSaida.current.style.backgroundColor = '#B9B9B9'
      buttonEntrada.current.style.backgroundColor = '#3A9FF1'
      type = 'entrada'
      console.log(type)
     

  }


  async function modalCategory(){
    const token = localStorage.getItem('token')
    const headers = {headers: {Authorization: `Bearer ${token}` } };
    const response = await getCategory(headers);
    const textArray = response.map(objeto => objeto.descricao);

    setCategory(textArray)

    modalRef.current.style.display = 'block'
    }

 function closeModalList (description, index){
    modalInput.current.value = description
    modalRef.current.style.display = 'none'
    
  }

 function onChangeValor(event){
        const value = event.target.value
        setForm((prevForm) => ({
          ...prevForm,
          valor: prevForm.valor = Number(value),
          data: prevForm.data = formato,
          tipo: prevForm.tipo = type,
        }));    
        console.log(form.tipo)
        

        
 }

 function onChangeDescricao (event){
  const value = event.target.value
        setForm((prevForm) => ({
          ...prevForm,
          descricao: prevForm.descricao = value,
        }));    

 }

 async function ChangeAsync(){



  
  if(!form.valor){
    console.log('O valor é obrigatorio')
  } else 
  if (form.categoria_id === ''|| form.categoria_id === NaN){
    console .log('A categoria é obrigatoria')
  } else 
  if (form.data === ''){
    console.log('A data é obrigatoria');
  } else 
  if(!form.descricao){
    console.log('A descrição é obrigatoria')
  } else {
    const token = localStorage.getItem('token')
    const headers = {headers: {Authorization: `Bearer ${token}` } }
    postTransition(form, headers)
    console.log(form.categoria_id)
  }
}


const dataAtual = new Date();

const ano = dataAtual.getFullYear();
const mes = String(dataAtual.getMonth() + 1).padStart(2, '0');
const dia = String(dataAtual.getDate()).padStart(2, '0');
const hora = String(dataAtual.getHours()).padStart(2, '0');
const minuto = String(dataAtual.getMinutes()).padStart(2, '0');
const segundo = String(dataAtual.getSeconds()).padStart(2, '0');

const formato = `${ano}-${mes}-${dia}T${hora}:${minuto}:${segundo}.000Z`;

    return(
     <div className='containerDiv'>
     <div className='containerModal' ref={modalBackground}>
    <div className='modal'>
      <div className='addReg'>
        Adicionar Registro 
        <img src={x} onClick={removeTagModal}/>
      </div>
      <div className='containerButton'>
        <button className='entrada' ref={buttonEntrada} onClick={changeColorEntrada}>Entrada</button>
        <button className='saida' ref={buttonSaida} onClick={changeColorSaida}>Saida</button>
      </div>
      <div className='formConteiner'>
        <div className='entrada'>
          <div className='InputContainer'> 
            <h1>Valor</h1>
            <input placeholder='R$' ref={modalInputValor} onChange={onChangeValor} />
          </div>
          <div className='InputContainer'> 
            <h1>Categoria</h1>
            <input ref={modalInput} className='inputCategory'/>
            <img src={poligon2} ref={polygonRef} onClick={modalCategory}/>
            <div className='modalCategory' ref={modalRef}>
              {category.map(
                (categorys, index) => {
                  return <div key={index} onClick={() => closeModalList(categorys, index)}>{categorys}</div>
              })}
            </div>
          </div>
          <div className='InputContainer'> 
            <h1>Data</h1>
            <input value={formato} className='inputData'/>
          </div>
          <div className='InputContainer'> 
            <h1>Descrição</h1>
            <input ref={modalInputDescricao} onChange={onChangeDescricao}/>
          </div>
          <button onClick={ChangeAsync}>Confirmar</button>
        </div>
      </div>
    </div>
     </div>
      <header>
        <img src={LogoDimDim}/>
        <div className='containerLogout'> 
        <img src={faceVector} className='faceVector'/>
        <img src={circleVector} className='circleVector'/>
        <img src={logout} className='logout' onClick={removeToken}/>
        <h1 className='h1LoginName'>{LoginName}</h1>
        </div>
        </header>
      <div className='base'>
        <div className='transitionLists'>
         <div className='containerFilter'>
          <img src={filterVector}></img>
          <h1>Filtrar</h1>
         </div>
         <div className='containerTransitionList'>
          <header>
            <div className='data'>
              Data
              <img src={poligon}/>
            </div>
            <div className='diadaSemana'>Dia da Semana</div>
            <div className='descricao'>Descricão</div>
            <div className='categoria'>Categoria</div>
            <div className='valor'>Valor</div>
          </header>
          {/* <div className='transitionList'>
           <div className='data'>XXX</div  >
           <div className='diadaSemana'>XXX</div>
           <div className='descricao'>XXX</div>
           <div className='categoria'>XXX</div>
           <div className='valor'>XXX</div>
          </div> */}
         </div>
        </div>
        <div className='containeNewTransition'>
          <div className='childreNewContainerTransition'>
            <div className='resumo'>Resumo</div>
            <div className='entrada'>Entradas</div>
            <div className='saidas'>Saídas</div>
            <hr/>
            <div className='saldo'>Saldo</div>
          </div>
          <button className='buttonTransition' onClick={addTagsModal} ref={modalbuttonTransit}>Adicionar Registro</button>
        </div>
      </div>
     </div>
    )

}

export default LoggedPage


