// React
import { Link } from "react-router-dom"

// Assets
import dashboard from "../../assets/icons/dashboard.svg"
import fraud from "../../assets/icons/fraud.svg"

// Component
import './Sidebar.scss';

function SidebarElement({ src, name, route }) {
    return (
        <div className="element">
            <Link to={route}>
                <img src={src} alt={name + 'Icon'} />
                <p>{name}</p>
            </Link>
        </div>
    )
}

function SidebarComponent() {
    return (
        <div className="sidebar">
            <p className="sidebar--title">INTELLIGENCE</p>
            <SidebarElement src={dashboard} name={'Dashboard'} route={'/dashboard'} />
            <SidebarElement src={fraud} name={'Fraud Analysis'} route={'/fraud-analysis'} />
        </div>
    )
}

export default SidebarComponent;