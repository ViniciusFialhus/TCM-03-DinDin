import './styles.css'
import { useRef, useState } from 'react'
import closeModal from '../../../../assets/x.svg'
import { updatedTransationApi } from '../../../../Api'


function ModalUpdateTransition({setModalUpdate, categoryList, updatedTransation }){
    
    const refProhibited = useRef(null)
    const refExit = useRef(null)
    const refCategory = useRef(null)
    const refDate = useRef(null)
    const [ transactionUpdateForm, setTransactionUpdateForm ] = useState({ 
                tipo: updatedTransation.tipo,
                descricao: updatedTransation.descricao,
                valor: updatedTransation.valor,
                data: updatedTransation.data,
                categoria_id: updatedTransation.categoria_id
            })

            function showProhibited (){
                refProhibited.current.style.backgroundColor = '#3A9FF1'
                refExit.current.style.backgroundColor = '#B9B9B9'
                setTransactionUpdateForm((prevForm) => ({
                    ...prevForm,
                    tipo: 'entrada'
                }))
            }

            function showExit (){
                refExit.current.style.backgroundColor = '#FF576B'
                refProhibited.current.style.backgroundColor = '#B9B9B9'
                setTransactionUpdateForm((prevForm) => ({
                    ...prevForm,
                    tipo: 'saida'
                }))
            }

            function CloseModal(){
                setModalUpdate(false)
            }
            
            function changeAndSetValue (event){
                const value = event.target.value
                setTransactionUpdateForm((prevForm) => ({
                    ...prevForm,
                    valor: Number(value)
                }))              
            }

            function changeAndSetDescription (event){
                const description = event.target.value
                setTransactionUpdateForm((prevForm) => ({
                    ...prevForm,
                    descricao: description
                }))
                
            }

            function handleSubmit (){
                
                if(!transactionUpdateForm.valor){
                    console.log('O valor é obrigatorio')
                } else 
                if (isNaN(transactionUpdateForm.valor)){
                  console.log('O valor deve ser um numero')
                } else 
                if (!transactionUpdateForm.data){
                  console.log('A data é obrigatoria');
                } else 
                if(!transactionUpdateForm.descricao){
                  console.log('A descrição é obrigatoria')
                } else { 
                    const token = localStorage.getItem('token');
                    const headers = { headers: { Authorization: `Bearer ${token}` } };
                    const id = updatedTransation.id
                    const data = transactionUpdateForm
                    console.log(transactionUpdateForm)
                    const response = updatedTransationApi(id, data, headers)
                    response.then( (data) => {
                        console.log(data);  
                        setModalUpdate(false)
                      })
                      .catch(error => {
                        console.log(error);
                      });        
                }
            }

            function chooseCategory(event){
                let selectedIndex = event.target.options.selectedIndex 
                selectedIndex++
                setTransactionUpdateForm((prevForm) => ({
                    ...prevForm,
                    categoria_id: selectedIndex
                }))
            }

            function chooseData(){
                const selectedDate = refDate.current.valueAsDate
                const formattedDate = selectedDate ? selectedDate.toISOString() : ''
                setTransactionUpdateForm((prevForm) => ({
                    ...prevForm,    
                    data: formattedDate
                }))
                
            }
              
            const formattedDate = new Date(updatedTransation.data).toISOString().split('T')[0];
           
            
              
        
    
    return(
    <>
        <div className='backgroundModal'>
            <div className='containerModal'>
                <div className='initText'>
                    Editar Registro
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
                    <input type='text' placeholder='R$200' onChange={changeAndSetValue} defaultValue={updatedTransation.valor}/>
                    <label>Categoria</label>
                    <select onChange={chooseCategory}>
                        {categoryList.map((category, index) => (
                        <option key={index} ref={refCategory} selected={category === updatedTransation.categoria_nome}>
                        {category}
                        </option>
                        ))}     
                    </select>
                    <label>Data</label>
                    <input type='date' ref={refDate} onChange={chooseData} defaultValue={formattedDate}/>
                    <label>Descrição</label>
                    <input type='text' onChange={changeAndSetDescription} defaultValue={updatedTransation.descricao}/>
                    <button type='submit' onClick={handleSubmit}>Confirmar</button>
                </div>
            </div>
        </div>
    </>
    )
}

export default ModalUpdateTransition