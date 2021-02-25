import * as React from 'react';

const Comm = (props) => {
  return (
    <li className='comment'>
      <span className="text">{props.text}</span>
      <span className="deleteBtn" onClick={() => {props.remove(props.text)}}></span>
      <span className="author">Автор:{props.author}</span>
      <span className="date">{props.date}</span>
    </li>
  )
}

export default Comm;

