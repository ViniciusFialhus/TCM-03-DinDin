import LogoDimDim from '../../assets/Logo.png'
import filterIcon from '../../assets/filterVector.svg'
import polygon from '../../assets/Polygon.svg'
import faceVector from '../../assets/faceVector.png'
import cicleVector from '../../assets/circleVector.png'
import logoutVector from '../../assets/logoutVector.png'
import pencil from '../../assets/Vectorpencil.svg'
import trash from '../../assets/Vectorlixo.svg'

import '../../style/global.css'
import './LoggedPage.css'

import ModalAddRegister from './components/modalAddRegister'
import ModalUpdateTransition from './components/modalUpdateTransation'
import ModalDelete from './components/modalDelete'
import { getCategory, getDataLoggedUser, getExtract} from '../../Api'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'



function LoggedPage(){

  const perfilName = localStorage.getItem('LoginName')
  const navigate = useNavigate()
  const [modalSetRegister, setModalSetRegister] = useState(false)
  const [modalUpdate, setModalUpdate ] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [categoryList, setCategoryList] = useState([])
  const [ date, setDate] = useState('')
  const [listTransation, setListTransation] = useState([])
  const [itemChoice, setItemChoice] = useState([])
  const [activeDeleteIndex, setActiveDeleteIndex] = useState(null);
  const [extract, setExtract] = useState({})
  const refValue = useRef(null)
   

  function logout(){
    navigate('/')
    localStorage.clear()
  }

  async function showModalRegistre(){
    setModalSetRegister(true)

    const secundaryArray = []
    const token = localStorage.getItem("token")
    const headers = {headers: {Authorization: `Bearer ${token}` } };
    const secundaryResponse = await getCategory(headers);
    for (let index = 0; index < secundaryResponse.length; index++) {
      secundaryArray.push(secundaryResponse[index].descricao)
    } 

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    setDate(formattedDate)
    setCategoryList(secundaryArray)
  }

  async function showModalUpdate(index){
    setModalUpdate(true)
    const itemChoice = listTransation[index]
    setItemChoice(itemChoice)

    const secundaryArray = []
    const token = localStorage.getItem("token")
    const headers = {headers: {Authorization: `Bearer ${token}` } };
    const secundaryResponse = await getCategory(headers);
    for (let index = 0; index < secundaryResponse.length; index++) {
      secundaryArray.push(secundaryResponse[index].descricao)
    } 
    setCategoryList(secundaryArray)
    
  }

  useEffect(() => {

    const token = localStorage.getItem('token');
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    getDataLoggedUser(headers)
      .then((data) => {
        setListTransation(data)
      })
      .catch((error) => {
        console.log(error);
      }); 
  }, []);

  useEffect(() => {

    const token = localStorage.getItem('token');
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    const response = getExtract(headers)
    response.then((data) => {
      setExtract(data)
    })
    .catch((error) => {
      console.log(error);
    });
    
  }, []);

  async function deleteTransactionOn(index){
    setModalDelete(true)
    setActiveDeleteIndex(index)
  }
  
  const money = extract && extract.entrada && extract.saida ? extract.entrada - extract.saida : 0;
 
  return(
    <>
     
    {modalUpdate && <ModalUpdateTransition setModalUpdate={setModalUpdate} categoryList={categoryList} updatedTransation={itemChoice}/>}
    {modalSetRegister && <ModalAddRegister setModalSetRegister={setModalSetRegister} categoryList={categoryList}/>}
        <header><img src={LogoDimDim} alt='Logo'/>  
          <div className='containerLogout'>
            <img src={faceVector} className='face' alt='face'/>
            <img src={cicleVector} className='cicle' alt='circle'/>
            <div>{perfilName}</div>
            <img src={logoutVector} className='logout' onClick={logout} alt='LogoutIcon'/>
          </div>
        </header>
        <main>
          <section className='transactionPage'>
            <div className='filterIcon'> 
              <img src={filterIcon} alt='filterIcon'/> 
              <div>Filtrar</div>
            </div>
            <div className='glossary'>
              <div className='exponent'>
                Data 
                <img src={polygon} alt='Polygon'/>
              </div>
              <div>Dia da Semana</div>
              <div>Descrição</div>
              <div>Categoria</div>
              <div>Valor</div>
            </div>
           <section className='transations'>
            {listTransation.map((data, index) => {   
               const formattedDate = new Date(data.data).toLocaleDateString('pt-BR'); 
               const options = { weekday: 'long' }; 
               const daysName = new Date(data.data).toLocaleDateString('pt-BR', options);
  return <div className='line'  key={index}>
              <div className='transation'>
                <div className='data'>{formattedDate}</div>    
                <div className='daysName'>{daysName}</div>    
                <div className='description'>{data.descricao}</div>  
                <div className='categoryName'>{data.categoria_nome}</div>  
                <div className={`value ${data.tipo === 'entrada' ? 'prohibited' : 'exit'}`} ref={refValue}>R${data.valor},00  </div>    
                <img src={pencil} alt='pencil' onClick={() => showModalUpdate(index)}/>
                <img src={trash} alt='trash' onClick={() => deleteTransactionOn(index)}/>
                {activeDeleteIndex === index && modalDelete && ( 
            <ModalDelete setModalDelete={setModalDelete} listTransation={listTransation} index={activeDeleteIndex}/>
          )}

              </div>           
          </div>
            })}
           </section>
        </section>
          <section className='balanceSummary'>
            <main> 
              <div className='summary'>
                <div className='summaryText'>Resumo</div>
                <div className='prohibitedText'>Entrada <div className='lost'>R${extract.entrada},00</div></div>
                <div>Saida <div className='gain'>R${extract.saida},00</div></div>
                <div className='balanceText'>Saldo <div className='money'>R${money},00</div></div>
              </div>
              <button onClick={showModalRegistre} >Adicionar Registro</button>
            </main>
          </section>
        </main>

    </>
  )
}

export default LoggedPage