import { FaTimes } from 'react-icons/fa';

const Task = ({ task, deleteTask, onReminder }) => {
  return (

    <div className={`task ${task.reminder ? 'reminder' : ''}`} onDoubleClick={() => onReminder(task.id)}>
      <h3>{task.text} <FaTimes onClick={() => deleteTask(task.id)} style={{ color: "red", cursor: "pointer" }} /></h3>
      <p>{task.date}</p>
    </div>
  )
}

export default Task
