import { useState } from "react";

const Row = ({ dataItem, handleIncVariance, handleIncValue }) => {
  const [value, setValue] = useState("");

  const handleChange = (inputVal) => {
    console.log(Number(inputVal));
    if (isNaN(Number(inputVal))) {
      alert(
        "Attempting to enter non-numeric characters. Only numerics allowed"
      );
      return;
    }
    setValue(inputVal);
  };

  return (
    <tr className="table__body__row">
      {Object.keys(dataItem).map((key) => {
        if (!excludedKeys.has(key)) {
          return (
            <td key={key} className="table__body__cell">
              {dataItem[key]}
            </td>
          );
        }
      })}
      <td className="table__body__cell">
        <input
          type="text"
          value={value}
          onChange={(e) => handleChange(e.target.value)}
        />
      </td>
      <td className="table__body__cell">
        <button
          onClick={() => {
            if (!value.length) return;
            setValue("");
            handleIncVariance(dataItem.parentId, dataItem.id, value);
          }}
        >
          Inc %
        </button>
      </td>
      <td className="table__body__cell">
        <button
          onClick={() => {
            if (!value.length) return;
            setValue("");
            handleIncValue(dataItem.parentId, dataItem.id, value);
          }}
        >
          Inc Value
        </button>
      </td>
      <td className="table__body__cell">{dataItem.variance.toFixed(2)}%</td>
    </tr>
  );
};

const excludedKeys = new Set(["id", "parentId", "variance", "depth"]);

export default Row;
