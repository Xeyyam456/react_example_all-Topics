import { useDispatch } from 'react-redux';
import { toggleTodo } from '../../store/todoSlice';

function TodoItem({ todo }) {
    const dispatch = useDispatch();

    const checkboxClass = todo.completed
        ? 'w-6 h-6 rounded-full border-2 bg-green-500 border-green-500 text-white flex items-center justify-center text-xs'
        : 'w-6 h-6 rounded-full border-2 border-gray-300 hover:border-green-400 flex items-center justify-center';

    const titleClass = todo.completed
        ? 'flex-1 text-sm line-through text-gray-400'
        : 'flex-1 text-sm text-gray-800';

    return (
        <li className="flex items-center gap-3 p-3 rounded-xl bg-white shadow-sm border border-gray-100">
            <button onClick={() => dispatch(toggleTodo(todo.id))} className={checkboxClass}>
                {todo.completed && '✓'}
            </button>
            <span className={titleClass}>{todo.title}</span>
        </li>
    );
}

export default TodoItem;
