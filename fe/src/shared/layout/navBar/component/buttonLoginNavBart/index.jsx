import login from "../../assets/LogoLoginNavbar.png";
import { Link } from "react-router-dom";
const TombolLoginNav = () => {

    return(
        <>
            <Link to ="/login">
                <button className='bg-danger d-flex gap-3 align-items-center'><img className='Login-Button' src={login} alt="" />Login</button>
            </Link>
        </>
    )
}


export default TombolLoginNav;
