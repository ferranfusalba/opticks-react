// React
import { Link, useLocation } from "react-router-dom";

// Assets
import dashboard from "../../assets/icons/dashboard.svg";
import fraud from "../../assets/icons/fraud.svg";

// Component
import "./Sidebar.scss";

function SidebarElement({ src, name, route, routeStatus }) {
  return (
    <div className={"element element--" + routeStatus}>
      <div className="element--statusbar"></div>
      <Link to={route}>
        <img src={src} alt={name + "Icon"} />
        <p>{name}</p>
      </Link>
    </div>
  );
}

function SidebarComponent() {
  const location = useLocation();

  return (
    <div className="sidebar">
      <p className="sidebar--title">INTELLIGENCE</p>
      <SidebarElement
        src={dashboard}
        name={"Dashboard"}
        route={"/dashboard"}
        routeStatus={location.pathname === '/dashboard' ? 'active' : 'unactive'}
      />
      <SidebarElement
        src={fraud}
        name={"Fraud Analysis"}
        route={"/fraud-analysis"}
        routeStatus={location.pathname === '/fraud-analysis' ? 'active' : 'unactive'}
      />
    </div>
  );
}

export default SidebarComponent;
