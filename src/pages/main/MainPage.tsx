import { useState } from 'react';
import Modal from '../../components/modal/Modal';
import UncontrolledForm from '../../components/forms/uncontrolled/UncontrolledForm';

function MainPage() {
  const [isModalOpen, setModalOpen] = useState(false);

  const closeHandler = () => {
    setModalOpen(false);
  };
  return (
    <div>
      <button onClick={() => setModalOpen(true)}>Open Modal</button>
      {isModalOpen && (
        <Modal closeHandler={closeHandler}>
          <UncontrolledForm />
        </Modal>
      )}
    </div>
  );
}

export default MainPage;
