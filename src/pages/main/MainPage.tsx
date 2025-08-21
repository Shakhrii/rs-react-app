import { useState } from 'react';
import Modal from '../../components/modal/Modal';
import UncontrolledForm from '../../components/forms/uncontrolled/UncontrolledForm';

function MainPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const closeHandler = () => {
    setModalOpen(false);
  };

  const saveHandler = () => {
    closeHandler();
  };

  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
      {isModalOpen && (
        <Modal closeHandler={saveHandler}>
          <UncontrolledForm saveHandler={closeHandler} />
        </Modal>
      )}
    </div>
  );
}

export default MainPage;
