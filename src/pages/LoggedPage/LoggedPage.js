import LogoDimDim from '../../assets/Logo.png'
import filterIcon from '../../assets/filterVector.svg'
import polygon from '../../assets/Polygon.svg'
import secundaryPolygon from '../../assets/Polygon 2.svg'
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
import ModalUpdatePerfil from './components/modalUpdatePerfil'
import { getCategory, getDataLoggedUser, getExtract, getPerfil } from '../../Api'
import { useNavigate } from 'react-router-dom'
import { useState, useEffect, useRef } from 'react'



function LoggedPage() {

  const perfilName = localStorage.getItem('LoginName')
  const navigate = useNavigate()
  const [modalSetRegister, setModalSetRegister] = useState(false)
  const [modalUpdate, setModalUpdate] = useState(false)
  const [modalDelete, setModalDelete] = useState(false)
  const [modalUpdatePerfil, setModalUpdatePerfil] = useState(false)
  const [categoryList, setCategoryList] = useState([])
  const [date, setDate] = useState('')
  const [listTransation, setListTransation] = useState([])
  const [itemChoice, setItemChoice] = useState([])
  const [activeDeleteIndex, setActiveDeleteIndex] = useState(null);
  const [extract, setExtract] = useState({})
  const [validator, setValidator] = useState(false)
  const [validatorSortByCategory, setValidatorSortByCategory] = useState(false)
  const [selectedItemCategoryFilter, setSelectedItemCategoryFilter] = useState([])
  const [selectedItemCategoryNameFilter, setSelectedItemCategoryNameFilter] = useState([])
  const [perfilInfo, setPerfilInfo] = useState([])

  const refValue = useRef(null)
  const refExponent = useRef(null)
  const refFilter = useRef(null)
  const refFilterCategory = useRef(null)
  const refFilterCategoryContainer = useRef(null)

  function logout() {
    navigate('/')
    localStorage.clear()
  }

  async function showModalRegistre() {


    setModalSetRegister(true)

    const secundaryArray = []
    const token = localStorage.getItem("token")
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    const secundaryResponse = await getCategory(headers);
    for (let index = 0; index < secundaryResponse.length; index++) {
      secundaryArray.push(secundaryResponse[index].descricao)
    }

    const currentDate = new Date();
    const formattedDate = currentDate.toISOString();

    setDate(formattedDate)
    setCategoryList(secundaryArray) 
  }

  async function showModalUpdate(index) {
    setModalUpdate(true)
    const itemChoice = listTransation[index]
    setItemChoice(itemChoice)

    const secundaryArray = []
    const token = localStorage.getItem("token")
    const headers = { headers: { Authorization: `Bearer ${token}` } };
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
        console.log(data)
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

  async function deleteTransactionOn(index) {
    setModalDelete(true)
    setActiveDeleteIndex(index)
  }

  function sortByDate() {
    if (validator === false) {
      setValidator(true)
      refExponent.current.src = `${secundaryPolygon}`
      refExponent.current.style.height = '5px'

    } else if (validator === true) {
      setValidator(false)
      refExponent.current.src = `${polygon}`
    }
  }

  async function sortByCategory(){
    
    if(!validatorSortByCategory){
      const secundaryArray = []
      const token = localStorage.getItem("token")
      const headers = { headers: { Authorization: `Bearer ${token}` } };
      const secundaryResponse = await getCategory(headers);
      for (let index = 0; index < secundaryResponse.length; index++) {
        secundaryArray.push(secundaryResponse[index].descricao)
      }
      setCategoryList(secundaryArray)
      setValidatorSortByCategory(true)
      refFilterCategory.current.style.display = 'flex'
    } else {

      refFilterCategory.current.style.display = 'none'
      setValidatorSortByCategory(false)
    } 
  }

  function selectCategoryFilter (data, index){
    if(selectedItemCategoryFilter.includes(index)){
      return 
    } else {
    
    setSelectedItemCategoryFilter(prevItems => [...prevItems, index])
    } 

    if(selectedItemCategoryNameFilter.includes(data)){
      return
    } else {

      setSelectedItemCategoryNameFilter(prevItems => [...prevItems, data])
    }
  }
  
  useEffect(() => {
    const selectedDivs = document.querySelectorAll('.selected');
  
    selectedDivs.forEach((div) => {
      div.classList.add('selected'); 
    });
  }, [selectedItemCategoryFilter]);

  async function clearFilters(){

    const token = localStorage.getItem('token');
    const headers = { headers: { Authorization: `Bearer ${token}` } };
  await getDataLoggedUser(headers)
      .then((data) => {
        setListTransation(data)
        setSelectedItemCategoryFilter([]); 
        setSelectedItemCategoryNameFilter([]);  
      })
      .catch((error) => {
        console.log(error);
      });
  }

  function orderByCategory(){
    const filteredTransactions = [];
  for (let index = 0; index < listTransation.length; index++) {
    secundaryArrayTwo.push(listTransation[index])
    if(selectedItemCategoryNameFilter.includes(listTransation[index].categoria_nome)){
      filteredTransactions.push(listTransation[index]);   
      setListTransation(filteredTransactions)
    }
  }}

  function updatedPerfil(){
    const token = localStorage.getItem('token');
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    const response = getPerfil(headers)
    response.then((data) => {
      setPerfilInfo(data)
      setModalUpdatePerfil(true)
    })
      .catch((error) => {
        console.log(error);
      });
  }

  const money = extract.entrada - extract.saida
  const secundaryArrayTwo = []
  for (let index = 0; index < listTransation.length; index++) {
    secundaryArrayTwo.push(listTransation[index])
  }
  const dateSort = secundaryArrayTwo.sort((a, b) => new Date(a.data) - new Date(b.data))
  const dateReverse = [...dateSort].reverse()

  
  

  return (
    <>

      {modalUpdate && <ModalUpdateTransition setModalUpdate={setModalUpdate} categoryList={categoryList} updatedTransation={itemChoice} />}
      {modalSetRegister && <ModalAddRegister setModalSetRegister={setModalSetRegister} categoryList={categoryList} />}
      {modalUpdatePerfil && <ModalUpdatePerfil setUpdatePerfil={setModalUpdatePerfil} perfilInfo={perfilInfo}/>}
      <header><img src={LogoDimDim} alt='Logo' />
        <div className='containerLogout'>
          <div className='containerPerfil' onClick={updatedPerfil}>
            <img src={faceVector} className='face' alt='face' />
            <img src={cicleVector} className='cicle' alt='circle' />
          </div>
          <div>{perfilName}</div>
          <img src={logoutVector} className='logout' onClick={logout} alt='LogoutIcon' />
        </div>
      </header>
      <main>
        <section className='transactionPage'>
          <div className='filterIcon' ref={refFilter} onClick={sortByCategory}>
            <img src={filterIcon} alt='filterIcon'/>  
            <div>Filtrar</div>
          </div>
          <div className='containerFilterCategory' ref={refFilterCategory}>
          { categoryList.map((data, index) => {
            return (
            <div id='filterCategory' 
            className={selectedItemCategoryFilter.includes(index) ? 'selected' : ''} 
            ref={refFilterCategoryContainer} 
            onClick={() => selectCategoryFilter(data, index)} 
            key={index}>
              {data}
              <div className='plus'>
              +
              </div>
            </div>)
          })}
           <div className='containerSelectedFilter'>
            <div className='select' onClick={orderByCategory}>
              Aplicar Filtro
            </div>
            <div className='noSelect' onClick={clearFilters}>
             Limpar Filtro
            </div>
           </div>
          </div>  
          <div className='glossary'>
            <div className='exponent' onClick={sortByDate}>
              Data
              <img src={polygon} alt='Polygon' ref={refExponent} className='polygon' />
            </div>
            <div>Dia da Semana</div>
            <div>Descrição</div>
            <div>Categoria</div>
            <div>Valor</div>
          </div>
          <section className='transations'>
          {(validator ? dateSort : dateReverse).map ((data, index) => {
              const formattedDate = new Date(data.data).toLocaleDateString('pt-BR');
              const options = { weekday: 'long' };
              const daysName = new Date(data.data).toLocaleDateString('pt-BR', options);
              return <div className='line' key={index}>
                <div className='transation'>
                  <div className='data'>{formattedDate}</div>
                  <div className='daysName'>{daysName}</div>
                  <div className='description'>{data.descricao}</div>
                  <div className='categoryName'>{data.categoria_nome}</div>
                  <div className={`value ${data.tipo === 'entrada' ? 'prohibited' : 'exit'}`} ref={refValue}>R${data.valor},00  </div>
                  <img src={pencil} alt='pencil' onClick={() => showModalUpdate(index)} />
                  <img src={trash} alt='trash' onClick={() => deleteTransactionOn(index)} />
                  {activeDeleteIndex === index && modalDelete && (
                    <ModalDelete setModalDelete={setModalDelete} listTransation={listTransation} index={activeDeleteIndex} />
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
              <div className='balanceText'>Saldo<div className='money'>R${money},00</div></div>
            </div>
            <button onClick={showModalRegistre} >Adicionar Registro</button>
          </main>
        </section>
      </main>

    </>
  )
}

export default LoggedPage