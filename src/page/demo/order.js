// src/components/OrderCard.js
import React from 'react';
import { Draggable } from 'react-beautiful-dnd';
import './demo.css';

const OrderCard = ({ order, index }) => (
  <Draggable draggableId={order.id} index={index}>
    {(provided) => (
      <div
        className="order-card"
        {...provided.draggableProps}
        {...provided.dragHandleProps}
        ref={provided.innerRef}
      >
        {order.title}
      </div>
    )}
  </Draggable>
);

export default OrderCard;