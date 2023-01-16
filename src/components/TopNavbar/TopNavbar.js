// Component
import './TopNavbar.scss';

// Assets
import logo from "../../assets/images/logo_opticks.svg";

function TopNavbarComponent() {
    return (
        <nav>
            <img src={logo} alt={"Opticks logo"}/> 
            <p>user.name@company - (Company Name SL)</p>
        </nav>
    )
}

export default TopNavbarComponent;