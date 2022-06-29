import React, { Fragment }  from 'react';
import {useSelector , useDispatch} from 'react-redux';
import {getDetails} from '../../Store/BookSlice'

export default function Details() {
const {bookInfo} = useSelector((state => state.books));
const dispatch = useDispatch();

  return (
    <div className='book-details'>
      <h3>Book Details</h3>
      {bookInfo ? (
        <Fragment>
          <p>Created by: { bookInfo.userName}</p>
          <p>Title: {bookInfo.title}</p>
          <p>Price: {bookInfo.price}</p>
          <p>Description: { bookInfo.description}</p>
          <button onClick = {() =>  dispatch(getDetails(''))}>Hide</button>  
        </Fragment>
      ) : <p>There is no book selected yet . please select</p>}
    </div>
  )
}


// error in button hide.......?????