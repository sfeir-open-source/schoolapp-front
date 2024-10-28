import React, { useEffect, useRef } from 'react';
import { School } from '@schoolApp/shared/interfaces/schools.interface';
import { AiFillDelete, AiOutlineClose } from 'react-icons/ai';
import Button from './Button';

interface ConfirmationModalProps {
  visible: boolean;
  setVisible: (visible: boolean) => void;
  school: School;
  onConfirm: (school: School) => void;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ visible, setVisible, school, onConfirm }) => {
  const modalRef = useRef<HTMLDivElement>(null);

  const handleConfirm = () => {
    setVisible(false);
    onConfirm(school);
  };

  const handleClose = () => {
    setVisible(false);
  };

  useEffect(() => {
    document.body.classList.toggle('no-scroll', visible);
  }, [visible]);

  if (!visible) return null;

  return (
    <div
      onClick={e => {
        if (modalRef.current?.contains(e.target as Node)) return;
        setVisible(false);
      }}
      className='fixed left-0 right-0 top-0 z-50 flex h-full w-full items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-60'
    >
      <div className='relative flex h-full w-full max-w-lg items-center p-4'>
        <div ref={modalRef} className='relative rounded-lg bg-white p-4 text-center shadow sm:p-5 dark:bg-gray-800'>
          <button
            onClick={handleClose}
            type='button'
            className='absolute right-2.5 top-2.5 ml-auto inline-flex items-center rounded-lg bg-transparent p-1.5 text-sm text-gray-400 hover:bg-gray-200 hover:text-gray-900 dark:hover:bg-gray-600 dark:hover:text-white'
            data-modal-toggle='deleteModal'
          >
            <AiOutlineClose />
            <span className='sr-only'>Close modal</span>
          </button>
          <AiFillDelete className='mx-auto mb-3.5 h-11 w-11 text-gray-400 dark:text-gray-500' />
          <p className='mb-4 text-gray-500 dark:text-gray-300'>
            Est-ce que vous êtes sûr de supprimer cette school ? <b>({school.title})</b>
          </p>
          <div className='flex items-center justify-center space-x-4'>
            <Button variant='secondary' onClick={handleClose}>
              Non, annuler
            </Button>
            <Button variant='danger' onClick={handleConfirm}>
              Oui je suis sûr
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationModal;
