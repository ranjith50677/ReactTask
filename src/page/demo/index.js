// // src/components/CalendarBoard.js
// import React, { useContext } from 'react';
// import { DragDropContext, Droppable } from 'react-beautiful-dnd';
// import OrderCard from './order';
// import './demo.css';
// import { AppContext } from '../../context/Appcontext';
// // import { AppContext } from '../../context/Appcontext';

// const CalendarBoard = () => {
//     const lines=[{id:'line-1', name:'Line A'}, {id:'line-2', name:'Line B'}];
//     const dates=['2025-06-11', '2025-06-12', '2025-06-13', '2025-06-14'];
//     const orders=[{id:'order-1', title:'Order 1'}, {id:'order-2', title:'Order 2'}];
    
//     const { state } = useContext(AppContext);
   
//   const [orderMap, setOrderMap] = React.useState(() => {
//        const map = {};
//     lines?.forEach(line => {
//       dates?.forEach(date => {
//         const key = `${line.id}-${date}`;
//         map[key] = [];
//       });
//     });
//     // Sample allocation
//     map['line-1-2025-06-12'].push(orders[0]);
//     map['line-2-2025-06-13'].push(orders[1]);
//     return map;
//   });


  
    
//   const onDragEnd = (result) => {
//     const { destination, source, draggableId } = result;
//     if (!destination || destination.droppableId === source.droppableId) return;

//     const sourceList = Array.from(orderMap[source.droppableId]);
//     const destList = Array.from(orderMap[destination.droppableId]);
//     const movedOrder = sourceList.find(o => o.id === draggableId);

//     sourceList.splice(result.source.index, 1);
//     destList.splice(result.destination.index, 0, movedOrder);

//     setOrderMap({
//       ...orderMap,
//       [source.droppableId]: sourceList,
//       [destination.droppableId]: destList,
//     });
//   };

// console.log(state,"gggg")

//   return (
//     <div className="calendar-container">
//       <div className="calendar-header">
//         <div className="line-header">Line / Date</div>
//         {dates?.map(date => (
//           <div className="date-column" key={date}>{date}</div>
//         ))}
//       </div>
//       <DragDropContext onDragEnd={onDragEnd}>
//         {/* {state.lines?.map(line => (
//           <div className="calendar-row" key={line.id}>
//             <div className="line-name">{line.name}</div>
//             {dates.map(date => {
//               const id = `${line.id}-${date}`;
//               return (
//                 <Droppable droppableId={id} key={id}>
//                   {(provided) => (
//                     <div
//                       className="drop-cell"
//                       ref={provided.innerRef}
//                       {...provided.droppableProps}
//                     >
//                       {orderMap[id].map((order, index) => (
//                         <OrderCard key={order.id} order={order} index={index} />
//                       ))}
//                       {provided.placeholder}
//                     </div>
//                   )}
//                 </Droppable>
//               );
//             })}
//           </div>
//         ))} */}
//       {state.lines.map((u, idx) => (
// <div className="calendar-row" key={idx} >
//         <div className="line-name">
//         {u.name}
//       </div>
// </div>
//       ))}

        
//       </DragDropContext>
//     </div>
//   );
// };

// export default CalendarBoard;



// // // src/components/SchedulerCalendar.jsx
// // import React, { useContext } from 'react';
// // import { AppContext } from '../context/AppContext';
// // import './SchedulerCalendar.css';

// // export default function SchedulerCalendar() {
// //   const { state } = useContext(AppContext);
// //   const days = [...Array(7)].map((_, i) => `Day ${i + 1}`);

// //   return (
// //     <div className="scheduler-container">
// //       <h3>Production Scheduler</h3>
// //       <div className="scheduler-grid">
// //         <div className="grid-header">
// //           <div className="grid-cell header-cell">Line</div>
// //           {days.map((day, idx) => (
// //             <div key={idx} className="grid-cell header-cell">{day}</div>
// //           ))}
// //         </div>

// //         {state.lines.map((line, lineIdx) => (
// //           <div key={lineIdx} className="grid-row">
// //             <div className="grid-cell line-cell">{line.name}</div>
// //             {days.map((_, dayIdx) => (
// //               <div key={dayIdx} className="grid-cell">
// //                 {state.orders
// //                   .filter((o) => o.lines.includes(line.name))
// //                   .map((o, orderIdx) => (
// //                     <div key={orderIdx} className="order-block">
// //                       {o.orderNo} ({o.shift})
// //                     </div>
// //                   ))}
// //               </div>
// //             ))}
// //           </div>
// //         ))}
// //       </div>
// //     </div>
// //   );
// // }




import React, { useContext, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AppContext } from '../../context/Appcontext';
import './demo.css';

const localizer = momentLocalizer(moment);

export default function SchedulerCalendar() {
  const { state } = useContext(AppContext);

  const events = useMemo(() => {
    return state.orders.map((order, idx) => {
      const start = moment(order.deliveryDate).startOf('day').toDate();
      const end = moment(order.deliveryDate).endOf('day').toDate();

      return {
        id: idx,
        title: `${order.orderNo} - ${order.unit} (${order.shift})`,
        start,
        end,
        resource: order,
      };
    });
  }, [state.orders]);

  return (
    <div className="calendar-container">
      <h3>Production Scheduler</h3>
      <Calendar
        localizer={localizer}
        events={events}
        startAccessor="start"
        endAccessor="end"
        style={{ height: 600 }}
        views={["month", "week", "day"]}
        defaultView="week"
        popup
        eventPropGetter={() => ({
          style: {
            backgroundColor: '#007bff',
            color: 'white',
            borderRadius: '6px',
            padding: '4px',
          },
        })}
      />
    </div>
  );
}
