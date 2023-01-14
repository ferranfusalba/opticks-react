import "./Range.scss";

// Assets
import calendar_selected from "../../assets/icons/calendar_selected.svg";

function RangeWrapper({range, setRange}) {
  const handleOnChange = (e) => {
    setRange(e.target.value);
  };

  const options = [
    { value: "today", label: "Today" },
    { value: "yesterday", label: "Yesterday" },
    { value: "last_7_days", label: "Last 7 days" },
    { value: "last_30_days", label: "Last 30 days" },
  ];

  return (
    <>
      {/* <img src={calendar_selected} alt={"Calendar Selected Icon"} /> */}
      <select value={range} onChange={handleOnChange}>
        {options.map(({ value, label }, index) => (
          <option value={value} key={index}>
            {label}
          </option>
        ))}
      </select>
    </>
  );
}

export default RangeWrapper;
