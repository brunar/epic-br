'use client';
import { useState } from 'react';
import { createPortal } from 'react-dom';

function Modal({
  title,
  content,
  handleClose,
}: {
  title: string;
  content: string;
  handleClose: () => void;
}) {
  return createPortal(
    <div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
      onClick={handleClose}
    >
      <div
        className="bg-white p-6 rounded shadow-lg"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-xl font-bold mb-4">{title}</h2>
        <p className="mb-4">{content}</p>
        <button
          className="px-4 py-2 bg-red-600 text-white rounded"
          onClick={handleClose}
        >
          Close Modal
        </button>
      </div>
    </div>,
    document.body,
  );
}

function IntroPortals() {
  const [showModal, setShowModal] = useState(false);

  return (
    <div>
      <h2>Intro Portals</h2>
      <p>
        With createPortal, we can render components outside of their parent
        element DOM hierarchy. Like in the body.
      </p>
      <button
        className="mt-4 mb-4 px-4 py-2"
        onClick={() => setShowModal(true)}
      >
        Show Modal
      </button>
      {showModal && (
        <Modal
          title="My Modal"
          content="This is a content modal rendered using React Portals."
          handleClose={() => setShowModal(false)}
        />
      )}
    </div>
  );
}

export default IntroPortals;
