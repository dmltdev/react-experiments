import { useRef, useState } from "react";
import { useFocusTrap } from "./use-focus-trap";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
}

function Modal({ isOpen, onClose, title, children }: ModalProps) {
  const modalRef = useRef<HTMLDivElement>(null);
  
  useFocusTrap(isOpen, modalRef);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div
        ref={modalRef}
        className="bg-white rounded-lg p-6 max-w-md w-full mx-4 shadow-xl"
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <div className="flex justify-between items-center mb-4">
          <h2 id="modal-title" className="text-xl font-semibold">
            {title}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 text-xl font-bold"
            aria-label="Close modal"
          >
            ×
          </button>
        </div>
        
        <div className="mb-6">
          {children}
        </div>
        
        <div className="flex gap-2 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 text-gray-600 border border-gray-300 rounded hover:bg-gray-50"
          >
            Cancel
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
}

export function FocusTrapExample() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="p-6 space-y-4">
      <h1 className="text-2xl font-bold">Focus Trap Example</h1>
      
      <p className="text-gray-600">
        Click the button below to open a modal with focus trapping. 
        When the modal is open, try pressing Tab and Shift+Tab to see how 
        focus cycles within the modal and cannot escape to the background.
      </p>
      
      <div className="space-y-2">
        <button
          onClick={() => setIsModalOpen(true)}
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Open Modal
        </button>
        
        <div>
          <input
            type="text"
            placeholder="This input should not be focusable when modal is open"
            className="px-3 py-2 border border-gray-300 rounded w-full max-w-md"
          />
        </div>
        
        <div>
          <button className="px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300">
            Another Button (should not be focusable when modal is open)
          </button>
        </div>
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        title="Focus Trap Demo"
      >
        <div className="space-y-4">
          <p>
            This modal demonstrates focus trapping. Try pressing Tab and Shift+Tab
            to navigate through the focusable elements. Focus should stay within this modal.
          </p>
          
          <div>
            <label htmlFor="demo-input" className="block text-sm font-medium mb-1">
              Demo Input:
            </label>
            <input
              id="demo-input"
              type="text"
              placeholder="Type something here..."
              className="px-3 py-2 border border-gray-300 rounded w-full"
            />
          </div>
          
          <div>
            <label htmlFor="demo-select" className="block text-sm font-medium mb-1">
              Demo Select:
            </label>
            <select
              id="demo-select"
              className="px-3 py-2 border border-gray-300 rounded w-full"
            >
              <option value="">Choose an option</option>
              <option value="1">Option 1</option>
              <option value="2">Option 2</option>
              <option value="3">Option 3</option>
            </select>
          </div>
        </div>
      </Modal>
    </div>
  );
}
