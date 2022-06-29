import React , {useEffect } from 'react';
import { useDispatch , useSelector} from 'react-redux';
import {getBooks , deleteBook , getDetails } from '../../Store/BookSlice';


export default function Lists() {
  const {books , isLodaing } = useSelector((state) => state.books);
  const {isLogin} = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getBooks())
  },[dispatch])

  // const [selected , setSelected] = useState('')
  // const getBookId = (id) => {
  //   const selectedBook = books.find((item) => item.id === id); // find: return one value , filter: return array of values
  //   setSelected((prev) => { return {...prev , ...selectedBook}});
  //   console.log(selected.userName)
  // }

  const booksList = books.length > 0 ? books.map((item) => {
    return (
      <div className='list-item' key={item.id}>
        <p>{item.title}</p>
        <div>
          <button disabled={!isLogin} onClick = {() => dispatch(getDetails(item))}>Read</button>
          <button
            onClick = {() => dispatch(deleteBook(item))
              .unwrap()
              .then((originalPromiseResult) => {
                console.log(originalPromiseResult)
              })
              .catch((rejectedValueOrSerializedError) => {
                console.log(rejectedValueOrSerializedError)
              })} 
            disabled={!isLogin}>
            Delete
          </button>
        </div>
      </div>
    )
  }): <p>There is no Books available</p>
  
  return (
    <div className='list-books'>
      <h3>Books List</h3>
      {isLodaing ? <p>IsLoading...</p> : booksList }
    </div>
  )
}
