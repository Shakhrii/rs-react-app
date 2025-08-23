import { useState } from 'react';
import Modal from '../../components/modal/Modal';
import UncontrolledForm from '../../components/forms/uncontrolled/UncontrolledForm';
import Header from '../../components/header/Header';
import ControlledForm from '../../components/forms/controlled/ControlledForm';

function MainPage() {
  const [isModalOpen, setModalOpen] = useState(false);
  const [isControlled, setControlled] = useState(false);

  const closeHandler = () => {
    setModalOpen(false);
  };

  const saveHandler = () => {
    closeHandler();
  };

  const controlledClickHandler = () => {
    setControlled(true);
    setModalOpen(true);
  };

  const uncontrolledClickHandler = () => {
    setControlled(false);
    setModalOpen(true);
  };

  return (
    <div>
      <Header
        controlledClickHandler={controlledClickHandler}
        uncontrolledClickHandler={uncontrolledClickHandler}
      />
      {isModalOpen && (
        <Modal closeHandler={saveHandler}>
          {isControlled ? (
            <UncontrolledForm saveHandler={closeHandler} />
          ) : (
            <ControlledForm saveHandler={saveHandler} />
          )}
        </Modal>
      )}
    </div>
  );
}

export default MainPage;
