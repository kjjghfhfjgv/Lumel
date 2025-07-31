import { useState } from "react";
import Table from "./components/Table";
import data from "./data.json";

import "./App.css";

function App() {
  const flattened = flattenList(data.rows);
  const [dataSet, setDataSet] = useState(flattened);

  const updateParent = (parentId, newData) => {
    const parentIdx = dataSet.findIndex((item) => item.id === parentId);
    if (parentIdx !== -1) {
      const allChildren = newData.filter((item) => item.parentId === parentId);
      const childTotalValue = allChildren.reduce(
        (acc, curr) => (acc += curr.value),
        0
      );
      const prevVal = newData[parentIdx].value;
      newData[parentIdx].value = childTotalValue;
      newData[parentIdx].variance =
        ((newData[parentIdx].value - prevVal) * 100) / prevVal;
    }

    return newData;
  };

  const updateChildren = (id, newData, currItem) => {
    newData.forEach((item) => {
      if (item.parentId === id) {
        const prevVal = item.value;
        item.value += (prevVal * 100) / currItem.value;
        item.value = Number(item.value.toFixed(4));
        item.variance = ((item.value - prevVal) * 100) / prevVal;
      }
    });

    return newData;
  };

  const onVarianceInc = (parentId, id, value) => {
    const currItemIdx = dataSet.findIndex((item) => item.id === id);
    let newData = [...dataSet];

    if (currItemIdx !== -1) {
      const prevVal = newData[currItemIdx].value;
      newData[currItemIdx].value = (prevVal * (100 + value)) / 100;
      newData[currItemIdx].variance =
        ((newData[currItemIdx].value - prevVal) * 100) / prevVal;
    }

    newData = updateParent(parentId, newData);
    if (parentId === null && currItemIdx !== -1) {
      newData = updateChildren(id, newData, newData[currItemIdx]);
    }

    setDataSet(newData);
  };

  const onValueInc = (parentId, id, value) => {
    const currItemIdx = dataSet.findIndex((item) => item.id === id);
    let newData = [...dataSet];

    if (currItemIdx !== -1) {
      const prevVal = dataSet[currItemIdx].value;
      dataSet[currItemIdx].value += value;
      dataSet[currItemIdx].variance =
        ((dataSet[currItemIdx].value - prevVal) * 100) / prevVal;
      setDataSet([...dataSet]);
    }

    newData = updateParent(parentId, newData);
    if (parentId === null && currItemIdx !== -1) {
      newData = updateChildren(id, newData, newData[currItemIdx]);
    }

    setDataSet(newData);
  };

  return (
    <Table
      data={dataSet}
      onValueInc={onValueInc}
      onVarianceInc={onVarianceInc}
    />
  );
}

const flattenList = (obj) => {
  const flat = [];
  const flattener = (obj, parentId) => {
    for (const arr of obj) {
      flat.push({
        id: arr.id,
        label: parentId !== null ? "-- " + arr.label : arr.label,
        value: arr.value,
        parentId,
        variance: 0,
      });

      if (arr.children) {
        flattener(arr.children, arr.id);
      }
    }
  };

  flattener(obj, null);

  return flat;
};

export default App;
