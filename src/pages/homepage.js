import '../style/homepage.css'
import '../style/global.css'
import BodyFormLogin from '../components/BodyFormsLogin/index'
import LogoDimDim from '../assets/Logo.png'

import { Link } from 'react-router-dom';

function HomePage() {
  return (
    
    <div className="HomePage">
      <header><img src={LogoDimDim}/></header>

      <div className='main-part'>
       <div className='text-part'>
          <h1>Controle suas <span>finança</span>, sem planilha chata.</h1>
          <div className='lead'>Organizar as suas finanças nunca foi tão fácil, com o DINDIN, você tem tudo num único lugar e em um clique de distância.</div>
            <Link to='/Register'>
              <button className='TextButton'>Cadastre-se</button>
            </Link>
        </div> 
        <div className='part-form'>
          <BodyFormLogin 
          title={'Login'}
          to={'/Register'}>
          </BodyFormLogin> 
        </div>
      </div>
    </div>
    
  
  );
}

export default HomePage;
