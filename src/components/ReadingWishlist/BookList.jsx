import { useDispatch, useSelector } from 'react-redux';
import { selectBooks, selectLoading, selectError } from '../../store/booksSlice';
import { addBook, selectWishlist } from '../../store/wishlistSlice';

function BookList() {
  const dispatch = useDispatch();

  const books   = useSelector(selectBooks);
  const loading = useSelector(selectLoading);
  const error   = useSelector(selectError);
  const wishlist = useSelector(selectWishlist);

  if (loading) {
    return <p className="text-center text-violet-400 py-10 animate-pulse">Yüklənir...</p>;
  }

  if (error) {
    return <p className="text-center text-red-400 py-10">{error}</p>;
  }

  return (
    <div>
      <h2 className="text-xl font-bold text-violet-700 mb-4">📚 Kitablar</h2>

      <div className="flex flex-col gap-3">
        {books.map((book) => {
          const isAdded = wishlist.some((item) => item.key === book.key);

          return (
            <div key={book.key} className="flex items-center justify-between bg-white p-4 rounded-2xl border border-violet-100 shadow-sm hover:shadow-md transition-shadow">
              <div>
                <p className="font-semibold text-gray-800 text-sm">{book.title}</p>
                <p className="text-xs text-purple-300 mt-0.5">
                  {book.author_name ? book.author_name[0] : 'Müəllif bilinmir'}
                  {book.first_publish_year ? ` · ${book.first_publish_year}` : ''}
                </p>
              </div>

              <button
                onClick={() => dispatch(addBook(book))}
                disabled={isAdded}
                className="text-sm px-3 py-1.5 rounded-lg bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white hover:opacity-90 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                {isAdded ? '✓ Əlavə edildi' : '+ Əlavə et'}
              </button>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default BookList;
