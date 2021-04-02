import { useState } from 'react'

const AddTask = ({ addTask }) => {

  const [text, setText] = useState('')
  const [date, setDate] = useState('')
  const [reminder, setReminder] = useState(false)

  const formSubmit = (e) => {
    e.preventDefault()

    if (text === '') {
      alert('Please add a Task')
      return
    }

    addTask({ text, date, reminder })

    setText('')
    setDate('')
    setReminder(false)
  }

  return (
    <form className="add-form" onSubmit={formSubmit}>
      <div className="form-control">
        <label>Task</label>
        <input type='text' placeholder="Add task" value={text} onChange={(e) => setText(e.target.value)} />
      </div>
      <div className="form-control">
        <label>Date & time</label>
        <input type='text' placeholder="Add Date" value={date} onChange={(e) => setDate(e.target.value)} />
      </div>
      <div className="form-control form-control-check">
        <label>Set Reminder</label>
        <input type='checkbox' checked={reminder} value={reminder} onChange={(e) => setReminder(e.currentTarget.checked)} />
      </div>
      <input type="submit" value="Save Task" className="btn btn-block" />
    </form>
  )
}

export default AddTask
