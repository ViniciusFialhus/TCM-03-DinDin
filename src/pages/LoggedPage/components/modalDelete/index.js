import './styles.css'
import polygon from '../../../../assets/Polygon 4.png'
import { deleteTransactionApi } from '../../../../Api'

function ModalDelete({setModalDelete, listTransation, index}){
    function closeModal (){
         setModalDelete(false)
    }
    
    async function deleteTransaction(){
    const secundaryArray = []
    for (let index = 0; index < listTransation.length; index++) {
      secundaryArray.push(listTransation[index].id)
    }
    const foundItem = secundaryArray[index]
    const token = localStorage.getItem('token');
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    const response = deleteTransactionApi(foundItem, headers)
    setModalDelete(false)
    }

    return(
    <>
    <img src={polygon} className='poligon'/>
     <div className='containerDelete'>
        Apagar o Item?  
    <div className='containerChoise' onClick={deleteTransaction}>
        <div className='yes'>
            Sim
        </div>
        <div className='no' onClick={closeModal}>
            Não
        </div>
    </div>


     </div>
    </>
    )
}

export default ModalDelete