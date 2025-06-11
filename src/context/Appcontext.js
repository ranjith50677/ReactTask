import React, { createContext, useReducer } from 'react';

const initialState = {
  units: [],
  lines: [],
  shifts: [],
  orders: [],
  schedule: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'ADD_UNIT':
      return { ...state, units: [...state.units, action.payload] };
    case 'ADD_LINE':
      return { ...state, lines: [...state.lines, action.payload] };
    case 'ADD_SHIFT':
      return { ...state, shifts: [...state.shifts, action.payload] };
    case 'ADD_ORDER':
      return { ...state, orders: [...state.orders, action.payload] };
    case 'UPDATE_SCHEDULE':
      return { ...state, schedule: action.payload };
    case 'DELETE_UNIT':
      return { ...state, units: state.units.filter((_, i) => i !== action.payload) };
    case 'DELETE_LINE':
      return { ...state, lines: state.lines.filter((_, i) => i !== action.payload) };
    case 'DELETE_SHIFT':
      return { ...state, shifts: state.shifts.filter((_, i) => i !== action.payload) };
    case 'EDIT_UNIT':
      const updatedUnits = [...state.units];
      updatedUnits[action.payload.index] = { name: action.payload.name };
      return { ...state, units: updatedUnits };
    case 'EDIT_LINE':
      const updatedLines = [...state.lines];
      updatedLines[action.payload.index] = { name: action.payload.name };
      return { ...state, lines: updatedLines };
    case 'EDIT_SHIFT':
      const updatedShifts = [...state.shifts];
      updatedShifts[action.payload.index] = {
        name: action.payload.name,
        StarTime: action.payload.StarTime,
        EndTime: action.payload.EndTime,
      };
      return { ...state, shifts: updatedShifts };
    default:
      return state;
  }
};

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  return <AppContext.Provider value={{ state, dispatch }}>{children}</AppContext.Provider>;
};
