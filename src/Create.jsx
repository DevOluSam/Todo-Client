import { useState } from 'react'
import axios from 'axios'

function Create() {
  const [task, setTask] = useState('')
  const handleAdd = async() => {
    const response = await axios.post('https://todo-server-b3gs.onrender.com/add', {
      task: task
    })
    location.reload()
    setTask(response.data)
  }
  return (
    <div className="create_form">
        <input type="text" placeholder="Enter Task" onChange={(e) => setTask(e.target.value)} />
        <button type="button" onClick={handleAdd}>Add</button>
    </div>
  )
}

export default Create