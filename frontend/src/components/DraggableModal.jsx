import React from 'react';
import { useSpring, animated } from 'react-spring';
import { useDrag } from 'react-use-gesture';
import { XmarkIcon } from '@/assets/Svgs';

const DraggableModal = ({ isOpen, onClose }) => {
  const [{ y }, set] = useSpring(() => ({
    y: isOpen ? 0 : window.innerHeight,
    config: { tension: 300, friction: 30 },
  }));

  const bind = useDrag(
    ({ down, movement: [, my], cancel, canceled }) => {
      const clampedY = Math.max(my, 0); // جلوگیری از حرکت بالاتر از حد مجاز
      if (my > 100 && !down && !canceled) {
        onClose(); // وقتی مودال به پایین کشیده می‌شود، بسته شود
        cancel();
      }
      set({ y: down ? clampedY : (isOpen ? 0 : window.innerHeight), immediate: down });
    },
    { filterTaps: true, axis: 'y', bounds: { top: 0 }, rubberband: false }
  );

  React.useEffect(() => {
    set({ y: isOpen ? 0 : window.innerHeight });
  }, [isOpen, set]);

  return (
    <div className={`fixed inset-0 flex items-end justify-center bg-black bg-opacity-50 z-50 ${!isOpen ? 'pointer-events-none' : ''}`} onClick={onClose}>
      <animated.div
        {...bind()}
        style={{
          transform: y.to((y) => `translateY(${y}px)`),
          touchAction: 'none',
        }}
        className="bg-white rounded-t-lg p-6 shadow-lg w-full max-w-md mx-4 sm:mx-0 cursor-grab"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="flex items-center justify-between border-b pb-2 mb-4">
          <div className="flex items-center space-x-2 cursor-grab">
            <div className="w-8 h-1 bg-gray-300 rounded-full"></div>
          </div>
          <button 
            className="text-gray-500 hover:text-gray-800"
            onClick={onClose}
          >
            <XmarkIcon className="w-6 h-6" />
          </button>
        </div>
        <h2 className="text-xl font-semibold mb-4">Modal Title</h2>
        <p>Drag down from the top bar to close this modal.</p>
      </animated.div>
    </div>
  );
};

export default DraggableModal;

{/* <button
className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
onClick={() => setModalOpen(true)}
>
Open Modal
</button>
<DraggableModal isOpen={isModalOpen} onClose={() => setModalOpen(false)} /> */}