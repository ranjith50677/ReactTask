import React, { useContext, useMemo } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { AppContext } from '../../context/Appcontext';
import './SchedulerCalendar.css';

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
        // defaultView="week"
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
