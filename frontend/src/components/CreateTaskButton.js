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
  const [payload, setPayload] = useState({});
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