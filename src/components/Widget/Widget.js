// Styles
import "./Widget.scss";

function WidgetComponent({title, children}) {
  return (
    <div className="widget">
      <h3>{title}</h3>
      <div className="widget--content">
        {children}
      </div>
    </div>
  );
}

export default WidgetComponent;
