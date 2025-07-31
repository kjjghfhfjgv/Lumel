import Row from "./Row";

const Table = ({ data, onVarianceInc, onValueInc, total }) => {
  const handleIncVariance = (parentId, id, value) => {
    onVarianceInc(parentId, id, Number(value));
  };

  const handleIncValue = (parentId, id, value) => {
    onValueInc(parentId, id, Number(value));
  };

  return (
    <table className="table">
      <thead>
        <tr>
          {keys.map((key) => (
            <th key={key.id} className="table__head__cell">
              {key.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.map((dataItem) => (
          <Row
            key={dataItem.id}
            handleIncValue={handleIncValue}
            handleIncVariance={handleIncVariance}
            dataItem={dataItem}
          />
        ))}
        <tr>
          <td className="table__body__cell grand__total">Grand Total</td>
          <td className="table__body__cell">{total}</td>
        </tr>
      </tbody>
    </table>
  );
};

const keys = [
  {
    id: "label",
    label: "Label",
  },
  {
    id: "value",
    label: "Value",
  },
  {
    id: "input",
    label: "Input",
  },
  {
    id: "allocationPercentage",
    label: "Allocation %",
  },
  {
    id: "allocationValue",
    label: "Allocation val",
  },
  {
    id: "variancePercentage",
    label: "Variance %",
  },
];

export default Table;
