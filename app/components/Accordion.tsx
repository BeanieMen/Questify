import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Item {
  title: string;
  content: string;
}

interface AccordionProps {
  items: Item[];
}

const Accordion: React.FC<AccordionProps> = ({ items }) => {
  const [activeIndex, setActiveIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="w-full">
      {items.map((item, index) => (
        <div key={index} className="border border-[#253249] rounded-2xl mb-2">
          <div
            className="flex justify-between items-center px-4 py-3 ml-3 cursor-pointer select-none"
            onClick={() => handleClick(index)}
          >
            <div className="font-semibold text-xl">{item.title}</div>
            <motion.svg
              className="w-5 h-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              initial={{ rotate: 0 }}
              animate={{ rotate: activeIndex === index ? 180 : 0 }}
              transition={{ duration: 0.1 }}
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M9 5l7 7 7-7"
              />
            </motion.svg>
          </div>
          <AnimatePresence>
            {activeIndex === index && (
              <motion.div
                className="overflow-hidden"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.1, ease: "easeInOut" }}
              >
                <div className="px-4 py-3 ml-3 text-xl">
                  <p className="text-gray-400">{item.content}</p>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
};

export default Accordion;
