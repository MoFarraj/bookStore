import './App.css';
import InsertValidation from './components/InsertValidation';
import BooksList from './components/BooksList';
import BooksDetails from './components/BooksDetails';
import {useSelector , useDispatch} from 'react-redux';
import {logInOut} from './Store/AuthSlice'

function App() {
  const {isError} = useSelector((state) => state.books);
  const {isLogin} = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  return (
    <div className="Async-Thunk">
      {isError && <div className='fetch-erorr'>{isError}</div>}
      <div className='header'>
        <h2>My Books</h2>
        <button onClick = {() => dispatch(logInOut())}>{isLogin ? 'LogOut' : 'LogIn'}</button>
      </div>
      <div className='containar'>
        <InsertValidation/>
        <div className='books'>
          <BooksList/>
          <BooksDetails/>
        </div>
      </div>
    </div>
  );
}

export default App;
