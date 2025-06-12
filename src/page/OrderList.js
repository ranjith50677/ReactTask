import React, { useContext, useState } from 'react';
import { AppContext } from '../context/Appcontext';

export default function OrderList() {
  const { state } = useContext(AppContext);
  // const [schedulerDate,setSchedulerDate]=useState("");
console.log(state,"state in scheduler calendar")
  return (
    <div style={{ overflowX: 'auto', marginTop: '20px' }}>
      <h3>OrderList</h3>
      <table border="1" cellPadding="10" style={{ minWidth: '600px' }}>
        <thead>
          <tr>
            <th>No</th>
            <th>Unit</th>
            <th>Line</th>
            <th>Shift</th>
            <th>Order No</th>
            <th>Style</th>
            <th>Quantity</th>
            <th>Delivery Date</th>
            {/* <th> SchedulerCalendar</th> */}
          </tr>
          </thead>
        <tbody> 
          {state.orders.map((order, idx) => (
            <tr key={idx}>
              <td>{idx+1}</td>
              <td>{order.unit}</td>
              <td>{order.lines.join(', ')}</td>
              <td>{order.shift}<span style={{color:"blue"}}> {order.start}-{order.end} </span></td>
              <td>{order.orderNo}</td>
              <td>{order.style}</td>
              <td>{order.qty}</td>
              <td>{new Date(order.deliveryDate).toLocaleDateString()}</td>
              {/* <td><input name="schedulerDate" value={schedulerDate} onChange={(e)=>setSchedulerDate(e.target.value)} type="date" /></td> */}
            </tr>
          ))}
</tbody>
      </table>
    </div>
  );
}
