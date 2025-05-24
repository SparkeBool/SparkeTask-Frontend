import { Card, Button, Badge } from 'react-bootstrap';
import { motion } from 'framer-motion';

export default function TaskCard({ task, onDelete, onStatusChange, onEdit }) {
  const { _id, title, description, status } = task;

  const nextStatus =
    status === 'todo' ? 'in-progress' :
    status === 'in-progress' ? 'done' :
    null;

  const statusVariant = {
    'todo': 'secondary',
    'in-progress': 'warning',
    'done': 'success',
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      layout
      transition={{ duration: 0.3 }}
    >
      <Card
        bg="dark"
        text="light"
        className="shadow-sm border border-primary"
        style={{ minWidth: '250px' }}
      >
        <Card.Body>
          <div className="d-flex justify-content-between align-items-center mb-2">
            <Card.Title className="mb-0 fw-semibold">{title}</Card.Title>
            <Badge bg={statusVariant[status]}>{status.replace('-', ' ')}</Badge>
          </div>

          <Card.Text className="text-light small">{description}</Card.Text>

          <div className="d-flex justify-content-between flex-wrap gap-2 mt-3">
            {nextStatus && (
              <Button
                size="sm"
                variant={nextStatus === 'in-progress' ? 'warning' : 'success'}
                onClick={() => onStatusChange(_id, nextStatus)}
              >
                ➡ {nextStatus.replace('-', ' ')}
              </Button>
            )}
            {/* <Button
              size="sm"
              variant="outline-info"
              onClick={() => onEdit(task)}
            >
              ✏ Edit
            </Button> */}
            <Button
              size="sm"
              variant="outline-danger"
              onClick={() => onDelete(_id)}
            >
              🗑 Delete
            </Button>
          </div>
        </Card.Body>
      </Card>
    </motion.div>
  );
}
