import React, { useState } from 'react';
import Modal from 'react-modal';
import axios from 'axios';
 
const customStyles = {
  content : {
    top                   : '50%',
    left                  : '50%',
    right                 : 'auto',
    bottom                : 'auto',
    marginRight           : '-50%',
    transform             : 'translate(-50%, -50%)'
  }
};
 
// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement')
 
function CreateTaskButton({updateTasks}){
  var subtitle;
  const apiServer = 'http://localhost:5001/'
  const [modalIsOpen,setIsOpen] = useState(false);
  const initialPayload = {
    title: '',
    category: '',
    estimatedTime: 0
  }
  const [payload, setPayload] = useState(initialPayload);

  const [showError, setError] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorsList, setErrorsList] = useState({})
  // let showError = false;
  // let errorMsg = '';

  function openModal() {
    setIsOpen(true);
  }
 
  function closeModal(){
    setIsOpen(false);
    setError(false);
    setErrorMsg('');
  }

  function checkPayload() {
    const { estimatedTime, title, category} = payload;
    let errList = {}
    if (estimatedTime && estimatedTime > 120) {
      setError(true);
      // setErrorMsg("That's too much time! Estimated time should be less than 2 hours for best work quality!")
      errList['estimatedTime'] = "That's too much time! Estimated time should be less than 2 hours for best work quality!"
    }
    else if (estimatedTime && estimatedTime == 0) {
      setError(true);
      errList['estimatedTime'] = "Please set your estimated time for this task!";
    }
    else {
      setError(false)
    }
    console.log(errList);
    setErrorsList(errList);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(payload);
    const userID = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId();
    payload['userID'] = userID
    setPayload(payload);
    console.log(payload);
    if (!showError)
      await axios.post(`${apiServer}createTask`, JSON.stringify(payload), {
        headers: {
          'Content-Type': 'application/json',
        }
      })
    closeModal();
    updateTasks();
  }

  function handleInputChange(event) {
    const target = event.target;
    const value = target.value;
    const name = target.name;
    payload[name] = value;
    setPayload(payload);
    console.log(payload);
    checkPayload();
  }
 
  return (
    <div>
      <button className="text-yellow-500 hover:text-yellow-600 font-bold text-4xl leading-5" onClick={openModal}>+</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal" // change name of this?
      >
        <div className="block uppercase tracking-wide text-gray-900 text-xl font-bold mb-2">Create Task</div>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-wrap -mx-3 mb-6">
            <div className="w-full px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Task Name
              </label>
              <input name="title" onChange={handleInputChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" />
            </div>
            <div className="w-3/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Category
              </label>
              <input name="category" onChange={handleInputChange} className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500" id="grid-first-name" type="text" />
            </div>
            <div className="w-1/4 px-3 mb-6 md:mb-0">
              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" for="grid-first-name">
                Est. Time (min)
              </label>
              <input
                name="estimatedTime"
                onChange={handleInputChange}
                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 mb-3 leading-tight focus:outline-none focus:bg-white focus:border-gray-500 "
                id="grid-first-name"
                type="text"
                />
            </div>
          </div>
          { 
            showError &&
            Object.entries(errorsList).map( ([errors, errMsg]) => {
              return <div className="bg-red-300 p-4 mb-2">
                {console.log(errors, errMsg)}
                {errMsg}
              </div>
            })
          }
          <input 
            type="submit"
            value="Create"
            onChange={handleInputChange}
            // className={showError ? 
            //   "bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded" :
            //   "bg-yellow-300 text-white font-bold py-2 px-4 rounded"
            // }
            className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
            disabled={showError}
            />
        </form>

      </Modal>
    </div>
  );
}

export default CreateTaskButton;