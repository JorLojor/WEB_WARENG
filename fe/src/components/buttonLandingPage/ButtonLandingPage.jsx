// import './ButtonLandingPage.css'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'

const ButtonLandingPage =({title,path})=>{
    
    return(
        <>
            <div className="button-landing-page">
                <Link to={`/${path}`} className='link-no-underline-btn'>
                    <h3 >{title}</h3>
                </Link>
            </div>
        </>
    )
}


ButtonLandingPage.propTypes={
    title:PropTypes.string,
    path:PropTypes.string
}

export default ButtonLandingPage;
