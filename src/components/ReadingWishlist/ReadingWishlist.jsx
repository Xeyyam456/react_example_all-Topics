import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBooks } from '../../store/booksSlice';
import BookList from './BookList';
import Wishlist from './Wishlist';

function ReadingWishlist() {
  const dispatch = useDispatch();

  // Səhifə açıldığında kitabları API-dan çək
  useEffect(() => {
    dispatch(fetchBooks());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-violet-50 via-purple-50 to-fuchsia-50 py-10 px-4">
      <div className="max-w-4xl mx-auto">

     

        {/* İki sütun: sol - kitablar, sağ - wishlist */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <BookList />
          <Wishlist />
        </div>

      </div>
    </div>
  );
}

export default ReadingWishlist;
