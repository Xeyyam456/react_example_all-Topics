import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addTodo, selectTodos } from '../../store/todoSlice';
import TodoItem from './TodoItem';

function TodoApp() {
  const dispatch = useDispatch();
  const todos    = useSelector(selectTodos);
  const [input, setInput] = useState('');

  function handleAdd(e) {
    e.preventDefault();
    dispatch(addTodo(input));
    setInput('');
  }

  return (
    <div className="min-h-screen bg-gray-50 py-10 px-4">
      <div className="max-w-lg mx-auto">

        <div className="text-center mb-8">
        </div>

        <form onSubmit={handleAdd} className="flex gap-2 mb-6">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Yeni tapşırıq əlavə et..."
            className="flex-1 px-4 py-3 rounded-xl border border-gray-200 outline-none focus:ring-2 focus:ring-indigo-400 text-sm"
          />
          <button
            type="submit"
            className="px-5 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 disabled:opacity-40 text-white font-semibold text-sm"
          >
            Əlavə et
          </button>
        </form>

        {todos.length === 0 ? (
          <div className="text-center py-16 text-gray-400">
            <p className="text-4xl mb-3">📋</p>
            <p className="text-sm">Hələ heç bir tapşırıq yoxdur.</p>
          </div>
        ) : (
          <ul className="flex flex-col gap-2">
            {todos.map((todo) => (
              <TodoItem key={todo.id} todo={todo} />
            ))}
          </ul>
        )}

      </div>
    </div>
  );
}

export default TodoApp;
