import { useState, useEffect } from 'react';
import { HashRouter as Router, Route } from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer'
import Tasks from './components/Tasks';
import AddTask from './components/AddTask';
import About from './components/About';

function App() {

  const [showAddTask, setShowAddTask] = useState(false)

  const [tasks, setTasks] = useState('')

  // User effect
  useEffect(() => {

    const getTask = async () => {
      const dataFromSerevr = await fetchTasks()
      setTasks(dataFromSerevr)
    }

    getTask()

  }, [])

  // Fetch tasks
  const fetchTasks = async () => {
    const res = await fetch('http://localhost:5000/tasks')
    const data = await res.json()
    return data
  }

  // Add Task
  const addTask = async (task) => {
    const res = await fetch('http://localhost:5000/tasks', {
      method: 'POST',
      headers: {
        'Content-type': 'application/json'
      },
      body: JSON.stringify(task)
    })

    const data = await res.json()

    setTasks([...tasks, data])

    // const id = Math.floor(Math.random() * 2000)
    // const newTask = { id, ...task }
    // setTasks([...tasks, newTask])
  }

  // Delete task
  const deleteTask = async (id) => {
    await fetch(`http://localhost:5000/tasks/${id}`, {
      method: 'DELETE'
    })

    setTasks(tasks.filter((task) =>
      task.id !== id
    ))
  }

  // ToggleReminder
  const toggleReminder = (id) => {

    tasks.map(async (task) => {
      if (task.id === id) {
        task = { ...task, reminder: !task.reminder }
        const res = await fetch(`http://localhost:5000/tasks/${id}`, {
          method: 'PUT',
          headers: {
            'Content-type': 'application/json'
          },
          body: JSON.stringify(task)
        })
        const data = await res.json()

        setTasks(tasks.map((task) => task.id === id ? task = { ...task, reminder: data.reminder } : task))
      }
    })
  }

  return (
    <Router>
      <div className="container">
        <Header onAdd={() => setShowAddTask(!showAddTask)} showAdd={showAddTask} />
        <Route path='/' exact render={(props) => (
          <>
            {showAddTask && <AddTask addTask={addTask} />}
            {tasks.length > 0 ? (< Tasks tasks={tasks} deleteTask={deleteTask} onReminder={toggleReminder} />) : ('No Task in here')}
          </>
        )} />
        <Route path='/abouts' component={About} />
        <Footer />
      </div>
    </Router>
  );
}

// *Class method
// class App extends React.Component {
//   render() {
//     return <h1>Using Class</h1>
//   }
// }

export default App;
