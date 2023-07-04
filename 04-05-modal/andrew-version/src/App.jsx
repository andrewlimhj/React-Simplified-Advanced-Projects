/* eslint-disable react/prop-types */
import { forwardRef, useEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';

function App() {
  const [customShow, setCustomShow] = useState(false);
  const [dialogShow, setDialogShow] = useState(false);
  const keyRef = useRef(false);
  const dialogRef = useRef(false);
  const CustomModal = forwardRef(ModalComponent);
  const DialogModal = forwardRef(DialogComponent);

  useEffect(() => {
    if (customShow === true) keyRef.current.focus();
    if (dialogShow === true) dialogRef.current.focus();
  }, [customShow, dialogShow]);

  return (
    <>
      <button onClick={() => setCustomShow(true)}>Show Custom Modal</button>
      <br />
      <button onClick={() => setDialogShow(true)}>Show Dialog Modal</button>
      <CustomModal
        show={customShow}
        onClose={() => setCustomShow(false)}
        ref={keyRef}
        onKeyDown={(e) => e.key === 'Escape' && setCustomShow(false)}
      />

      <DialogModal
        onOpen={dialogShow}
        onKeyDown={(e) => e.key === 'Escape' && setDialogShow(false)}
        onClose={() => setDialogShow(false)}
        ref={dialogRef}
      />
    </>
  );
}

export default App;

function ModalComponent({ show, onKeyDown, onClose }, ref) {
  return createPortal(
    <>
      <div
        ref={ref}
        tabIndex={0}
        className={`modal-overlay ${show ? 'show' : null}`}
        onKeyDown={onKeyDown}
      >
        <div className='modal'>
          <p>
            This is a <strong>CUSTOM</strong> modal
          </p>
          <button onClick={onClose}>Close</button>
        </div>
      </div>
    </>,
    document.querySelector('#pop-up')
  );
}

function DialogComponent({ onOpen, onClose, onKeyDown }, ref) {
  return createPortal(
    <dialog open={onOpen} onKeyDown={onKeyDown} onClose={onClose} ref={ref}>
      <p>
        This is a <strong>DIALOG</strong> modal
      </p>
      <button onClick={onClose}>Close</button>
    </dialog>,
    document.querySelector('#pop-up')
  );
}
