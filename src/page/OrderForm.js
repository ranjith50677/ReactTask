import React, { useContext, useState } from "react";
import Select from "react-select";
import { AppContext } from "../context/Appcontext.js";
import "./style.css";
// import { useNavigate } from "react-router";
// import { useNavigation } from "react-router";

export default function OrderForm() {
  const { state, dispatch } = useContext(AppContext);
  const [form, setForm] = useState({
    orderNo: "",
    style: "",
    qty: "",
    deliveryDate: "",
    unit: "",
    lines: [],
    shift: ""
  });

  // const nav=useNavigation()
  const lineOptions = state.lines.map((line) => ({
    value: line.name + " - " + line.unitName,
    label:line.name + " - " + line.unitName,
  }));

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleLineChange = (selected) => {
    setForm({
      ...form,
      lines: selected ? selected.map((item) => item.value) : [],
    });
  };

  const handleSubmit = () => {
    // console.log(form.shift,"dddd")
    let start=""
    let end=""
    state.shifts.map((i)=>{
      if(i.name===form.shift){

        start=i.StarTime;
        end=i.EndTime;
      }
    })
    // console.log(start,end,"start and end time")
   if (!form.orderNo || !form.style || !form.qty || !form.deliveryDate || !form.unit || form.lines.length === 0 || !form.shift) {
     alert("!please check")
  }else{
     dispatch({ type: "ADD_ORDER", payload: { ...form,start,end } });
    setForm({
      orderNo: "",
      style: "",
      qty: "",
      deliveryDate: "",
      unit: "",
      lines: [],
      shift: "",
    });
    // nav("/OrderList")
  }
  };

  return (
    <div className="order-form">
      <h3>Create Order</h3>
      <input name="orderNo" value={form.orderNo} onChange={handleChange} placeholder="Order No" />
      <input name="style" value={form.style} onChange={handleChange} placeholder="Style" />
      <input name="qty" value={form.qty} onChange={handleChange} placeholder="Quantity" />
      <input name="deliveryDate" value={form.deliveryDate} onChange={handleChange} type="date" />

      <select name="unit" value={form.unit} onChange={handleChange}>
        <option value="">Select Unit</option>
        {state.units.map((u, idx) => (
          <option key={idx} value={u.name}>
            {u.name} 
          </option>
        ))}
      </select>

      <Select
        isMulti
        name="lines"
        options={lineOptions}
        className="react-select-container"
        classNamePrefix="react-select"
        value={lineOptions.filter((opt) => form.lines.includes(opt.value))}
        onChange={handleLineChange}
        placeholder="Select Lines"
      />

      <select name="shift" value={form.shift} onChange={handleChange}>
        <option value="">Select Shift</option>
        {state.shifts.map((s, idx) => (
          <option key={idx} value={s.name}>
            {s.name} <span style={{color:"blue"}}>({s.StarTime} - {s.EndTime})</span>
          </option>
        ))}
      </select>

      <button onClick={handleSubmit}>Add Order</button>
    </div>
  );
}
