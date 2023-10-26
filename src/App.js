import React, { useState, useEffect } from 'react';

const App = () => {
  const [input, setInput] = useState('');
  const [todos, updateTodos] = useState([]);
  const [editId, setEditId] = useState(null);


  useEffect(() => {
    const storedTodos = localStorage.getItem('todos');
    if (storedTodos) {
      updateTodos(JSON.parse(storedTodos));
    }
  }, []);


  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);


  const addTodo = () => {
    if (input.trim() !== '') {
      if (editId !== null) {

        const updatedTodos = todos.map((todo) =>
          todo.id === editId
            ? { ...todo, value: input }
            : todo
        );
        updateTodos(updatedTodos);
        setEditId(null);
      } else {
        
        const newTodo = {
          id: new Date().getTime(),
          value: input,
        };
        updateTodos([...todos, newTodo]);
      }
    } else {
      alert('Empty Field');
    }
    setInput('');
  };


  const startEditing = (id) => {
    const todoToEdit = todos.find((todo) => todo.id === id);
    if (todoToEdit) {
      setInput(todoToEdit.value);
      setEditId(id);
    }
  };

  const cancelEditing = () => {
    setInput('');
    setEditId(null);
  };

  const delTodo = (id) => {
    const updatedTodo = todos.filter((todo) => todo.id !== id);
    updateTodos(updatedTodo);
  };

  return (
    <div className='lg:h-screen lg:w-full flex flex-col items-center'>
      <h2 className='mt- text-5xl font-bold'>TO-DO LIST</h2>
      <div className='mt-20 mb-14'>
        <input
          className='lg:h-12 lg:w-96 text-3xl'
          type='text'
          value={input}
          onChange={(e) => setInput(e.target.value)}
        />
        <button
          className='lg:h-12 lg:w-16 bg-black text-white text-3xl'
          onClick={addTodo}
        >
          {editId !== null ? 'Edit' : '+'}
        </button>
        {editId !== null && (
          <button
            className='lg:h-12 lg:w-16 bg-slate-700 text-white text-3xl'
            onClick={cancelEditing}
          >
            Cancel
          </button>
        )}
      </div>

      {todos.map((todo) => (
        <div className='lg:w-96 my-2 border-y py-1 border-y-black text-2xl flex justify-between'>
          {editId === todo.id ? (
            <input
              className='lg:h-12 lg:w-60 text-2xl'
              type='text'
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
          ) : (
            <span> {todo.value} </span>
          )}
          {editId === todo.id ? (
            <button
              className='bg-slate-700 text-white px-4'
              onClick={() => addTodo()}
            >
              Save
            </button>
          ) : (
            <button
              className='bg-slate-700 text-white px-4'
              onClick={() => startEditing(todo.id)}
            >
              Edit
            </button>
          )}
          <button
            className='bg-slate-700 text-white px-4'
            onClick={() => delTodo(todo.id)}
          >
            Delete
          </button>
        </div>
      ))}

      <footer className='w-full absolute bottom-0 bg-white text-center'>
        Made by HardiK
      </footer>
    </div>
  );
};


export default App;






