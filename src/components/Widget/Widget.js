// Styles
import "./Widget.scss";

function WidgetComponent({title, children}) {
  return (
    <div className="widget">
      <h3>{title}</h3>
      {children}
    </div>
  );
}

export default WidgetComponent;
