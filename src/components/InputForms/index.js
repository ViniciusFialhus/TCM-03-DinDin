import '../InputForms/style.css'



function InputForms({titleInput, type, onChange, name}){
    return(
        <div className='containerForm'>
          <div className='titleForm'>{titleInput}</div>
          <input type={type} onChange={onChange} name={name}/>
        </div>
    )
}

export default InputForms