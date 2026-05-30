import { useDispatch, useSelector } from 'react-redux';
import { removeBook, toggleRead, selectWishlist, selectTotalCount, selectReadCount } from '../../store/wishlistSlice';

function Wishlist() {
  const dispatch = useDispatch();

  const items      = useSelector(selectWishlist);
  const totalCount = useSelector(selectTotalCount);
  const readCount  = useSelector(selectReadCount);

  if (items.length === 0) {
    return (
      <div>
        <h2 className="text-xl font-bold text-fuchsia-700 mb-4">❤️ Wishlist</h2>
        <p className="text-purple-300 text-sm text-center py-10">Hələ heç bir kitab əlavə edilməyib.</p>
      </div>
    );
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-fuchsia-700 mb-2">❤️ Wishlist</h2>

      {/* Xülasə */}
      <p className="text-sm text-purple-400 mb-4">
        {totalCount} kitab · {readCount} oxundu
      </p>

      <div className="flex flex-col gap-3">
        {items.map((book) => (
          <div key={book.key} className="bg-white p-4 rounded-2xl border border-fuchsia-100 shadow-sm hover:shadow-md transition-shadow">

            <p className={`font-semibold text-sm ${book.isRead ? 'line-through text-purple-300' : 'text-gray-800'}`}>
              {book.title}
            </p>
            <p className="text-xs text-purple-300 mt-0.5">
              {book.author_name ? book.author_name[0] : 'Müəllif bilinmir'}
            </p>

            <div className="flex items-center gap-3 mt-3">
              <label className="flex items-center gap-2 text-xs text-violet-600 cursor-pointer">
                <input
                  type="checkbox"
                  checked={book.isRead}
                  onChange={() => dispatch(toggleRead(book.key))}
                  className="w-4 h-4 accent-fuchsia-500"
                />
                Oxudum
              </label>

              <button
                onClick={() => dispatch(removeBook(book.key))}
                className="text-xs text-fuchsia-400 hover:text-fuchsia-600 ml-auto"
              >
                Sil
              </button>
            </div>

          </div>
        ))}
      </div>
    </div>
  );
}

export default Wishlist;
