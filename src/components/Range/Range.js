// Styles
import "./Range.scss";

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
    <div className="range-wrapper">
      <select value={range} onChange={handleOnChange}>
        {options.map(({ value, label }, index) => (
          <option value={value} key={index}>
            {label}
          </option>
        ))}
      </select>
    </div>
  );
}

export default RangeWrapper;
