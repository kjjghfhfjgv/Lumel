import Row from "./Row";

const Table = ({ data, onVarianceInc, onValueInc }) => {
  const handleIncVariance = (parentId, id, value) => {
    onVarianceInc(parentId, id, Number(value));
  };

  const handleIncValue = (parentId, id, value) => {
    onValueInc(parentId, id, Number(value));
  };

  return (
    <table className="table">
      <thead>
        <tr className="table__header">
          {keys.map((key) => (
            <th key={key.id} className="table__head__cell">
              {key.label}
            </th>
          ))}
        </tr>
      </thead>
      <tbody className="table__body">
        {data.map((dataItem) => (
          <Row
            key={dataItem.id}
            handleIncValue={handleIncValue}
            handleIncVariance={handleIncVariance}
            dataItem={dataItem}
          />
        ))}
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
