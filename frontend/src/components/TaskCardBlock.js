import React, { useState, useReducer, useEffect } from 'react';
import TaskCard from './TaskCard';
import HeaderText from './HeaderText';
import CreateTaskButton from './CreateTaskButton';
import axios from 'axios';

function TaskCardBlock() {
  const apiServer = 'http://localhost:5001/'
  const initialState = {
    data: null,
    error: null,
    loaded: false,
    fetching: false,
  }
  const reducer = (state, newState) => ({ ...state, ...newState })
  const [state, setState] = useReducer(reducer, initialState);

  async function fetchData() {
    const response = await axios.get(`${apiServer}getTasks`)
    const { data, status } = {
      data: response.data,
      status: response.status
    }
    console.log(data[0])
    
    // error? 
    if (status !== 200) {
      return setState({
        data,
        error: true,
        loaded: true,
        fetching: false,
      })
    }

    // no error 
    setState({
      data,
      error: null,
      loaded: true,
      fetching: false,
    })
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="container w-3/5">
      <div className="container flex">
        <HeaderText title="Tasks"/>
        <CreateTaskButton updateTasks={fetchData}/>
      </div>
      {state.loaded ? state.data.map(cur => {
        return <TaskCard task={cur}/>
      }) : null}
    </div>
  );
}

export default TaskCardBlock;