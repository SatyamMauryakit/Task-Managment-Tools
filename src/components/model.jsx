import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEdit, faTrash } from "@fortawesome/free-solid-svg-icons";

import "./model.css";
const Task = ({ id, taskName, status, onClick, onDelete, onEdit }) => {
  return (
    <div className="task-card">
      <div className="task-item" onClick={onClick}>
        <p>{taskName}</p>
      </div>
      <div className="task-content">
        <p>{taskName}</p>
        <p>Status: {status}</p>
        <div className="action-buttons">
          <FontAwesomeIcon
            icon={faEdit}
            className="button-icon"
            onClick={() => onEdit()}
          />
          <FontAwesomeIcon
            icon={faTrash}
            className="button-icon danger"
            onClick={() => onDelete()}
          />
        </div>
      </div>
    </div>
  );
};

export default Task;
