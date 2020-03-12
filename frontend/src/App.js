import React from 'react';
import ScheduleCardBlock from './components/ScheduleCardBlock';
import TaskCardBlock from './components/TaskCardBlock';
import './App.css';
import './tailwind.css'


function App() {
  return (
    <div className="container m-auto">
      <img src="logo on white.svg" className="w-1/5 my-4"/>
      <div className="flex">
        <ScheduleCardBlock />
        <TaskCardBlock />
      </div>
    </div>
  );
}

export default App;
