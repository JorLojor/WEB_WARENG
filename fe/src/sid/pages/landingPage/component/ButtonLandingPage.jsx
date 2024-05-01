import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ButtonLandingPage =({title,path})=>{
    
    return(
        <>
            <button className="ms-2 mb-2 btn button-landing-page py-0 pt-2" style={{color:'white',border:'1px solid #00917C',borderRadius:'1.05vw'}}>
                <Link to={`/${path}`} style={{ textDecoration: 'none' }}> 
                    <h3 className="" style={{color:'white',fontSize:'20px',fontWeight
                :'bold'}}>{title}</h3>
                </Link>
            </button>
        </>
    )
}

ButtonLandingPage.propTypes={
    title:PropTypes.string,
    path:PropTypes.string
}

export default ButtonLandingPage;
