import React, { useContext, useState } from "react";
import { AppContext } from "../context/Appcontext";
import "./style.css";
// import { useNavigation } from "react-router";

export default function UnitMaster() {
  const { state, dispatch } = useContext(AppContext);

  const [unitName, setUnitName] = useState("");
  const [lineName, setLineName] = useState("");
  const [shiftName, setShiftName] = useState("");
  const [Starttime, setStarttime] = useState("");
  const [Endtime, setEndtime] = useState("");
  const [unitbdrop, setUnitbdrop] = useState("");

  const [edit, setEdit] = useState({ type: "", index: null });

  // const nav=useNavigation()

  const handleAdd = (type) => {
    if (type === "unit" && unitName) {
      dispatch({ type: "ADD_UNIT", payload: { name: unitName } });
      setUnitName("");
    } else if (type === "line" && lineName) {
      dispatch({ type: "ADD_LINE", payload: { name: lineName,unitName:unitbdrop } });
      setLineName("");
      setUnitbdrop("");
    } else if (type === "shift" && shiftName && Starttime && Endtime) {
      dispatch({
        type: "ADD_SHIFT",
        payload: { name: shiftName, StarTime: Starttime, EndTime: Endtime },
      });
      setShiftName("");
      setStarttime("");
      setEndtime("");
    }
  };

  const handleEdit = (type, index, item) => {
    setEdit({ type, index });
    if (type === "unit") setUnitName(item.name);
    if (type === "line") setLineName(item.name);
    if (type === "shift") {
      setShiftName(item.name);
      setStarttime(item.StarTime);
      setEndtime(item.EndTime);
    }
  };

  const handleSave = () => {
    if (edit.type === "unit") {
      dispatch({ type: "EDIT_UNIT", payload: { index: edit.index, name: unitName } });
      setUnitName("");
    } else if (edit.type === "line") {
      dispatch({ type: "EDIT_LINE", payload: { index: edit.index, name: lineName } });
      setLineName("");
    } else if (edit.type === "shift") {
      dispatch({
        type: "EDIT_SHIFT",
        payload: {
          index: edit.index,
          name: shiftName,
          StarTime: Starttime,
          EndTime: Endtime,
        },


      });
      // nav("/orders")
      setShiftName("");
      setStarttime("");
      setEndtime("");
    }
    setEdit({ type: "", index: null });
  };

  const handleDelete = (type, index) => {
    dispatch({ type: `DELETE_${type.toUpperCase()}`, payload: index });
    if (edit.index === index && edit.type === type) {
      setEdit({ type: "", index: null });
    }
  };

  return (
    <div className="master-container">
      {/* UNIT MASTER */}
      <div className="master-card">
        <h3>Unit Master</h3>
        <input
          placeholder="Unit Name"
          value={unitName}
          onChange={(e) => setUnitName(e.target.value)}
        />
        {edit.type === "unit" ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <button onClick={() => handleAdd("unit")} >Add Unit</button>
        )}
        <ul>
          {state.units.map((u, idx) => (
            <li key={idx} className="animated-item">
              {u.name}
              <button style={{marginRight:"27px"}} onClick={() => handleEdit("unit", idx, u)}>✏️</button>
              <button onClick={() => handleDelete("unit", idx)}>❌</button>
            </li>
          ))}
        </ul>
      </div>

      {/* LINE MASTER */}
      <div className="master-card">
        <h3>Line Master</h3>
        <input
          placeholder="Line Name"
          value={lineName}
          onChange={(e) => setLineName(e.target.value)}
        />

<select className="selectdrop" name="unit" value={unitbdrop} onChange={(e)=>setUnitbdrop(e.target.value)}>
        <option value="" disabled>Select Unit</option>
        {state.units.map((u, idx) => (
          <option key={idx} value={u.name}>
            {u.name}
          </option>
        ))}
      </select>

        {edit.type === "line" ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <>
         {unitName ==="" ? null: <button onClick={() => handleAdd("line")} disabled={unitName!==""}>Add Line</button>}
          </>
        )}
        <ul>
          {state.lines.map((l, idx) => (
            <li key={idx} className="animated-item">
              {l.name} -<span style={{marginRight:"27px"}}>{l.unitName}</span>

              <button style={{marginRight:"27px"}} onClick={() => handleEdit("line", idx, l)}>✏️</button>
              <button onClick={() => handleDelete("line", idx)}>❌</button>
            </li>
          ))}
        </ul>
      </div>

      {/* SHIFT MASTER */}
      <div className="master-card">
        <h3>Shift Master</h3>
        <input
          placeholder="Shift Name"
          value={shiftName}
          onChange={(e) => setShiftName(e.target.value)}
        />
        <input
          name="Starttime"
          type="time"
          value={Starttime}
          onChange={(e) => setStarttime(e.target.value)}
        />
        <input
          name="Endtime"
          type="time"
          value={Endtime}
          onChange={(e) => setEndtime(e.target.value)}
        />
        {edit.type === "shift" ? (
          <button onClick={handleSave}>Save</button>
        ) : (
          <>
          {unitName ==="" || lineName==="" ?null: <button onClick={() => handleAdd("shift")}>Add Shift</button>}
          </>
         )}
        <ul>
          {state.shifts.map((s, idx) => (
            <li key={idx} className="animated-item">
              {s.name} <span>{s.StarTime} - {s.EndTime}</span>
              <button style={{marginRight:"27px"}} onClick={() => handleEdit("shift", idx, s)}>✏️</button>
              <button onClick={() => handleDelete("shift", idx)}>❌</button>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
