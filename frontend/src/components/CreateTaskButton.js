import React, { useState, useEffect } from 'react';
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
  const [payload, setPayload] = useState({});
  const CLIENT_ID = '1091433185202-qksll2sqmv2i59b1tbhqh2d9j87h68sn.apps.googleusercontent.com';
  const API_KEY = 'AIzaSyAMscLvQ3SjBd_x3XH7TQ-XlfqUnAld35s';

  // Array of API discovery doc URLs for APIs used by the quickstart
  const DISCOVERY_DOCS = ["https://www.googleapis.com/discovery/v1/apis/calendar/v3/rest"];

  // Authorization scopes required by the API; multiple scopes can be
  // included, separated by spaces.
  const SCOPES = "https://www.googleapis.com/auth/calendar.readonly";

  function openModal() {
    setIsOpen(true);
  }
 
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = '#f00';
  }
 
  function closeModal(){
    setIsOpen(false);
  }

  async function handleSubmit(event) {
    event.preventDefault();
    console.log(payload);
    const userID = window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile().getId();
    payload['userID'] = userID
    setPayload(payload);
    console.log(payload);
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
  }

  function handleClientLoad() {
    window.gapi.load('client:auth2', initClient);
  }

  /**
   *  Initializes the API client library and sets up sign-in state
   *  listeners.
   */
  function initClient() {
    window.gapi.client.init({
      apiKey: API_KEY,
      clientId: CLIENT_ID,
      discoveryDocs: DISCOVERY_DOCS,
      scope: SCOPES
    }).then(function () {
      console.log(window.gapi.auth2.getAuthInstance().currentUser.get().getBasicProfile())
    }, function(error) {
      console.log(error)
    });
  }

  useEffect(() => {
    handleClientLoad()
  }, [])
 
  return (
    <div>
      <button onClick={openModal}>+</button>
      <Modal
        isOpen={modalIsOpen}
        onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}
        style={customStyles}
        contentLabel="Example Modal"
      >

        <h2 ref={_subtitle => (subtitle = _subtitle)}>Hello</h2>
        <button onClick={closeModal}>close</button>
        <div>Create Task</div>
        <form onSubmit={handleSubmit}>
          <label>
            Task Name:
            <input type="text" name="title"onChange={handleInputChange} /><br/>
            Estimated Time:
            <input type="text" name="estimatedTime" onChange={handleInputChange}/><br/>
            Category:
            <input type="text" name="category" onChange={handleInputChange}/><br/>
          </label>
          <input type="submit" value="Submit" onChange={handleInputChange}/>
        </form>
      </Modal>
    </div>
  );
}

export default CreateTaskButton;