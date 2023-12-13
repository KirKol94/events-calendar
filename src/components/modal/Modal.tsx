import { ReactNode, useEffect, useRef } from "react";
import ReactDOM from "react-dom";
import { useModal } from "./useModal";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: ReactNode;
}

export const Modal = ({ isOpen, onClose, title, children }: ModalProps) => {
  const closeButtonRef = useRef<HTMLButtonElement>(null);

  const { handleModalClick, modalElement, handleModalKeyDown } = useModal({
    onClose,
    isOpen,
  });

  useEffect(() => {
    if (isOpen && closeButtonRef.current) {
      closeButtonRef.current.focus();
    }
  }, [closeButtonRef, isOpen]);

  return isOpen
    ? ReactDOM.createPortal(
        <div
          onClick={onClose}
          className="fixed top-0 left-0 bottom-0 right-0 bg-black bg-opacity-50 flex justify-center items-center"
        >
          <div
            className="bg-white p-8 rounded-lg shadow-md w-2/3 max-w-[600px] opacity ease-in-out delay-450"
            onClick={handleModalClick}
            onKeyDown={handleModalKeyDown}
            tabIndex={1}
          >
            <div className="flex justify-between items-center border-black pb-4 mb-4">
              <h2>{title}</h2>
              <button
                ref={closeButtonRef}
                className="text-red-500 text-3xl transition-all duration-300 hover:text-red-700"
                onClick={onClose}
              >
                &times;
              </button>
            </div>
            <div>{children}</div>
          </div>
        </div>,
        modalElement
      )
    : null;
};
