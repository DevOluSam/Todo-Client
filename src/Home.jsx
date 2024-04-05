import axios from "axios";
import Create from "./Create";
import { BsCircleFill, BsFillCheckCircleFill, BsFillTrashFill, BsPencilSquare } from 'react-icons/bs';
import { useEffect, useState } from 'react';

function Home() {
    const [todos, setTodos] = useState([]);
    const [editingId, setEditingId] = useState(null);
    const [editTask, setEditTask] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            const response = await axios.get('http://localhost:3001/todos');
            setTodos(response.data);
        };
        fetchData();
    }, []);

    const handleEdit = async (id) => {
        setEditingId(id);
        const todo = todos.find(todo => todo._id === id);
        setEditTask(todo.task);
    };

      const handleCompleted = async (id) => {
      const response = await axios.put("http://localhost:3001/completed/"+id);
      if (response.status === 200) {
        setTodos(prevTodos => prevTodos.map(todo => {
          if (todo._id === id) {
            return { ...todo, done: !todo.done };
          }
          return todo;
        }));
      }
    }

    const handleUpdate = async (id) => {
        const response = await axios.put("http://localhost:3001/update/"+id, {
            task: editTask
        });
        if (response.status === 200) {
            setTodos(prevTodos => prevTodos.map(todo => {
                if (todo._id === id) {
                    return { ...todo, task: editTask };
                }
                return todo;
            }));
            setEditingId(null);
            setEditTask('');
        }
    };

    const handleDelete = async (id) => {
        const response = await axios.delete(`http://localhost:3001/delete/${id}`);
        if (response.status === 200) {
            setTodos(prevTodos => prevTodos.filter(todo => todo._id !== id));
        }
    };

    return (
        <div className="home">
            <h2>Todo List</h2>
            <Create />
            <div className="create_form_edit">
                {
                    editingId !== null && (
                        <>
                            <input
                                type="text"
                                placeholder="Edit Task"
                                value={editTask}
                                onChange={(e) => setEditTask(e.target.value)}
                            />
                            <button onClick={() => setEditingId(null)}>Cancel</button>
                            <button onClick={() => handleUpdate(editingId)}>Save</button>
                        </>
                    )
                }
            </div>
            {
                
                todos.length === 0 ?
                <div><h2>No Record</h2></div>
                : todos.map(todo => (
                    <div key={todo._id} className="task">
                        <div className="checkbox" onClick={() => handleCompleted(todo._id)}>
                            {todo.done ? <BsFillCheckCircleFill className="icon"></BsFillCheckCircleFill> : <BsCircleFill className="icon" />}
                            <p className={todo.done ? "line_through" : ""}>{todo.task}</p>
                        </div>
                        <div className="edit_delete">
                            <span><BsPencilSquare className="icon" onClick={() => handleEdit(todo._id)} /></span>
                            <span><BsFillTrashFill className="icon" onClick={() => handleDelete(todo._id)} /></span>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default Home;
