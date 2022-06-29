import React , {useRef} from 'react';
import '../../App.css';
import { useDispatch , useSelector} from 'react-redux';
import { insertBook } from '../../Store/BookSlice';


export default function Insert() {
  const title = useRef(null);
  const price = useRef(null);
  const description = useRef(null);

  const dispatch = useDispatch();

  const {isLogin} = useSelector((state) => state.auth)

  const handleSupmit = (e) => {
    e.preventDefault();
    const data = {
      title: title.current.value,
      price: price.current.value,
      description: description.current.value
    };


    // if(title.current.value!==''){
    //   setValid(true)
    // }
    
    dispatch(insertBook(data));
    
    title.current.value = null;
    price.current.value = null;
    description.current.value = null;
  }

  return (
    <div className='add-form'>
      <h3>Insert Book</h3>
      <form onSubmit={handleSupmit}>
        <input ref={title} type='text' placeholder='Enter Your Title'/>
        <input ref={price} type='number' placeholder='Enter Your Price'/>
        <input ref={description} type='text' placeholder='Enter Your Description'/>
        <button disabled={!isLogin}>Submit</button>
      </form>
    </div>
  )
}
