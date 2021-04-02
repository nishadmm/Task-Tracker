import Task from "./Task"

const Tasks = ({ tasks, deleteTask, onReminder }) => {
  return (
    <>
      {tasks.map((task) => (
        <Task key={task.id} task={task} deleteTask={deleteTask} onReminder={onReminder} />
      ))}
    </>
  )
}

export default Tasks
