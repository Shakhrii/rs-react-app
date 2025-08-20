import { useState } from 'react';
import Modal from '../components/modal/Modal';
import './App.css';

function App() {
  const [isModalOpen, setModalOpen] = useState(false);

  const closeHandler = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
      {isModalOpen && (
        <Modal closeHandler={closeHandler}>
          <div>Modal view</div>
        </Modal>
      )}
    </div>
  );
}

export default App;
