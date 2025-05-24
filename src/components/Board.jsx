import TaskCard from './TaskCard';
import { Container, Row, Col, Button, Badge } from 'react-bootstrap';
import { AnimatePresence } from 'framer-motion';
import { DragDropContext, Droppable, Draggable } from '@hello-pangea/dnd';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Board({ tasks, onDelete, onStatusChange, onShowForm, onEdit, onReorder }) {
  const statuses = ['todo', 'in-progress', 'done'];
  const statusTitles = {
    'todo': 'To Do',
    'in-progress': 'In Progress',
    'done': 'Done',
  };

  const statusColors = {
    'todo': 'bg-primary bg-opacity-10 border-primary',
    'in-progress': 'bg-warning bg-opacity-10 border-warning',
    'done': 'bg-success bg-opacity-10 border-success'
  };

  const handleDragEnd = result => {
    const { destination, source, draggableId } = result;

    if (!destination) return;

    if (
      destination.droppableId === source.droppableId &&
      destination.index === source.index
    ) {
      return;
    }

    const draggedTask = tasks.find(task => task._id === draggableId);
    const newStatus = destination.droppableId;

    if (newStatus !== draggedTask.status) {
      onStatusChange(draggedTask._id, newStatus);
      toast.success(`Moved "${draggedTask.title}" to ${statusTitles[newStatus]}`);
    } else {
      onReorder && onReorder(draggedTask._id, destination.index, newStatus);
    }
  };

  return (
    <Container fluid className="px-4 py-5">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2 className="h3 mb-0 text-warning">Task Board</h2>
        <Button 
          onClick={onShowForm} 
          variant="primary"
          className="d-flex align-items-center gap-2 shadow-sm"
        >
          <i className="bi bi-plus-lg"></i>
          Add Task
        </Button>
      </div>

      <DragDropContext onDragEnd={handleDragEnd}>
        <Row className="g-4">
          {statuses.map(status => (
            <Col key={status} lg={4}>
              <div className={`rounded-3 p-3 h-100 border ${statusColors[status]}`}>
                <div className="d-flex justify-content-between align-items-center mb-3">
                  <h3 className="h5 mb-0 text-light">
                    {statusTitles[status]}
                  </h3>
                  <Badge pill bg="light" text="dark" className="fw-normal">
                    {tasks.filter(t => t.status === status).length}
                  </Badge>
                </div>

                <Droppable droppableId={status}>
                  {provided => (
                    <div 
                      ref={provided.innerRef} 
                      {...provided.droppableProps} 
                      className="min-height-200"
                    >
                      <AnimatePresence>
                        {tasks
                          .filter(task => task.status === status)
                          .map((task, index) => (
                            <Draggable key={task._id} draggableId={task._id} index={index}>
                              {provided => (
                                <div
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="mb-3"
                                >
                                  <TaskCard
                                    task={task}
                                    onDelete={onDelete}
                                    onStatusChange={onStatusChange}
                                    onEdit={onEdit}
                                  />
                                </div>
                              )}
                            </Draggable>
                          ))}
                      </AnimatePresence>
                      {provided.placeholder}
                    </div>
                  )}
                </Droppable>
              </div>
            </Col>
          ))}
        </Row>
      </DragDropContext>

      {/* Custom CSS for drag-and-drop */}
      <style>{`
        .min-height-200 {
          min-height: 200px;
        }
        [data-rbd-drag-handle-context-id] {
          cursor: grab;
        }
        [data-rbd-draggable-context-id][data-rbd-draggable-id]:active {
          cursor: grabbing;
        }
        .border-primary {
          border-color: rgba(13, 110, 253, 0.3) !important;
        }
        .border-warning {
          border-color: rgba(255, 193, 7, 0.3) !important;
        }
        .border-success {
          border-color: rgba(25, 135, 84, 0.3) !important;
        }
      `}</style>
    </Container>
  );
}