import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { AnimatePresence } from 'framer-motion';

export default function SafeDndBoard({ onDragEnd, children }) {
  return (
    <DragDropContext onDragEnd={onDragEnd}>
      {children}
    </DragDropContext>
  );
}

export { Droppable, Draggable, AnimatePresence };