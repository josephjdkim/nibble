import React, { useState, useReducer, useEffect } from 'react';
import ScheduleCard from './ScheduleCard';
import HeaderText from './HeaderText';

function ScheduleCardBlock() {
  // const initialState = {
  //   data: null,
  //   error: null,
  //   loaded: false,
  //   fetching: false,
  // }
  // const reducer = (state, newState) => ({ ...state, ...newState })
  // const [state, setState] = useReducer(reducer, initialState);

  // async function fetchData() {
  //   const response = await fetch('ioijobnba.com');
  //   const { data, status } = {
  //     data: await response.json(),
  //     status: response.status
  //   }

  //   // error? 
  //   if (status !== 200) {
  //     return setState({
  //       data,
  //       error: true,
  //       loaded: true,
  //       fetching: false,
  //     })
  //   }

  //   // no error 
  //   setState({
  //     data,
  //     error: null,
  //     loaded: true,
  //     fetching: false,
  //   })
  // }

  // useEffect(() => {
  //   fetchData()
  // }, [])


  // const { error, data } = state
  return (
    <div className="container w-2/5">
      <HeaderText title="Schedule"/>
      <ScheduleCard />
      <ScheduleCard />
      <ScheduleCard />
    </div>
  );
}

export default ScheduleCardBlock;