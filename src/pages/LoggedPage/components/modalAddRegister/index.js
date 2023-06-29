import './style.css'

import closeModal from '../../../../assets/x.svg'
import { postTransition } from '../../../../Api'
import { useRef, useState } from 'react'


        function ModalAddRegister ({ setModalSetRegister, categoryList}){


            const refProhibited = useRef(null)
            const refExit = useRef(null)
            const refCategory = useRef(null)
            const refDate = useRef(null)
            const [ transactionRegistrationForm, setTransactionRegistrationForm ] = useState({ 
                tipo: "entrada",
                descricao: "",
                valor: Number(0),
                data: "",
                categoria_id: 1 
            })
            
            
            function showProhibited (){
                refProhibited.current.style.backgroundColor = '#3A9FF1'
                refExit.current.style.backgroundColor = '#B9B9B9'
                setTransactionRegistrationForm((prevForm) => ({
                    ...prevForm,
                    tipo: 'entrada'
                }))
            }

            function showExit (){
                refExit.current.style.backgroundColor = '#FF576B'
                refProhibited.current.style.backgroundColor = '#B9B9B9'
                setTransactionRegistrationForm((prevForm) => ({
                    ...prevForm,
                    tipo: 'saida'
                }))
            }

            function CloseModal(){
                setModalSetRegister(false)
            }
            
            function changeAndSetValue (event){
                const value = event.target.value
                setTransactionRegistrationForm((prevForm) => ({
                    ...prevForm,
                    valor: Number(value)
                }))              
            }

            function changeAndSetDescription (event){
                const description = event.target.value
                setTransactionRegistrationForm((prevForm) => ({
                    ...prevForm,
                    descricao: description
                }))
                
            }

            function handleSubmit (){
                
                if(!transactionRegistrationForm.valor){
                    console.log('O valor é obrigatorio')
                } else 
                if (isNaN(transactionRegistrationForm.valor)){
                  console.log('O valor deve ser um numero')
                } else 
                if (!transactionRegistrationForm.data){
                  console.log('A data é obrigatoria');
                } else 
                if(!transactionRegistrationForm.descricao){
                  console.log('A descrição é obrigatoria')
                } else { 
                    const token = localStorage.getItem('token')
                    const headers = {headers: {Authorization: `Bearer ${token}` } }
                    const response = postTransition(transactionRegistrationForm, headers)
                    response.then( (data) => {
                        window.location.reload()
                        setModalSetRegister(false)
                      })
                      .catch(error => {
                        console.log(error);
                      });        
                }
            }

            function chooseCategory(event){
                let selectedIndex = event.target.options.selectedIndex 
                selectedIndex++
                console.log(selectedIndex)
                setTransactionRegistrationForm((prevForm) => ({
                    ...prevForm,
                    categoria_id: selectedIndex
                }))
            }

            function chooseData(){
                const selectedDate = refDate.current.valueAsDate
                const formattedDate = selectedDate ? selectedDate.toISOString() : ''
                setTransactionRegistrationForm((prevForm) => ({
                    ...prevForm,
                    data: formattedDate
                }))
            }

            

            return(
                <>
                    <div className='backgroundModal'>
                        <div className='containerModal'>
                            <div className='initText'>
                                Adicionar Registro
                                <img src={closeModal} onClick={CloseModal} alt='closeModal'/>
                                <div className='typeOfTransaction'>
                                    <div 
                                    className='Prohibited' 
                                    ref={refProhibited} 
                                    onClick={showProhibited}
                                    >
                                        Entrada
                                    </div>
                                    <div 
                                    className='Exit' 
                                    ref={refExit} 
                                    onClick={showExit}
                                    >
                                        Saida
                                    </div>  
                                </div>
                                <label>Valor</label>
                                <input type='text' placeholder='R$200' onChange={changeAndSetValue}/>
                                <label>Categoria</label>
                                <select onChange={chooseCategory}>
                                    {categoryList.map((categorys ,index) => {
                                        return <option key={index}  ref={refCategory}>{categorys}</option>
                                        })}
                                </select>
                                <label>Data</label>
                                <input type='date' ref={refDate} onChange={chooseData}/>
                                <label>Descrição</label>
                                <input type='text' onChange={changeAndSetDescription}/>
                                <button type='submit' onClick={handleSubmit}>Confirmar</button>
                            </div>
                        </div>
                    </div>
                </>

            )
        }

        export default ModalAddRegister