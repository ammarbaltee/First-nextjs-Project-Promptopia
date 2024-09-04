// ModalContainer.jsx
import React from 'react';
import { createPortal } from 'react-dom';

const ModalContainer = ({ isOpen, onClose }) => {
  if (!isOpen) return null; // Don't render anything if the modal is not open

  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
        <p className="mb-4">This is modal content.</p>
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          onClick={onClose}
        >
          Close Modal
        </button>
      </div>
    </div>,
    document.getElementById('modal-root')
  );
};

export default ModalContainer;
