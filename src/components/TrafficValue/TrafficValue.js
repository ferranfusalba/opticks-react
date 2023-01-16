// Styles
import "./TrafficValue.scss";

function TrafficValue({ color, number, type }) {
  return (
    <div className="traffic-value">
      <aside>
        <div
          className={"traffic-value__ellipse traffic-value__ellipse--" + color}
        ></div>
      </aside>
      <b>{number}</b>
      <p>{type}</p>
    </div>
  );
}

export default TrafficValue;
