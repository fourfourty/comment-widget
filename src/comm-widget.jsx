import * as React from 'react';
import is_Empty from './check-empty';
import Comm from './comm-item';
import Comm_date from './comm-date';

export class Widget extends React.Component {
  constructor (props) {
    super(props);
    this.state = {
      comments: [],
      newComment: '',
      newAuthor: '',
      newDate: Comm_date(),
    }
    const CheckLocalStor = () => {
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        const value = localStorage.getItem(key);
        this.state.comments.push(JSON.parse(value));
      }
    }
    CheckLocalStor();
  }
  add() {
    localStorage.setItem(
    `${'comment_'}${Math.random()*10}`, JSON.stringify({
      'text': this.state.newComment,
      'author': this.state.newAuthor,
      'date': this.state.newDate,
    }));

    const comments = this.state.comments;
    comments.push({
      text: this.state.newComment,
      author: this.state.newAuthor,
      date: this.state.newDate,
    })
    this.setState({ 
      comments,
      newComment:'',
      newAuthor:'', 
    });
  }
  remove(current_key) {
    const keyArr = [];
    const confirmDelete = confirm('Удалить');
    if (!confirmDelete) {
      return false;
    }

    for (let i = 0; i < localStorage.length; i++) {
      keyArr.push(localStorage.key(i))
    }
    for (let j = 0; j < keyArr.length;j++) {
      if (j === current_key) {
        console.log(keyArr[j]);
        localStorage.removeItem(keyArr[j]);
      }
    }

    const comments = this.state.comments.map((comm,index) => {
      if (current_key === index) {
        return {
        }
      }
      else return comm;
    })
    this.setState( {comments})
  }
  render() {
    return (
      <div className='wrapper'>
        <div className='left'>
          <h2>Comments widget</h2>
          <ul>
            {
              this.state.comments.map((comm,index) => {
                if(is_Empty(comm)) {
                  return false;
                }
                return (
                  <Comm 
                  key={index}
                  text={comm.text}
                  author={comm.author}
                  date={comm.date}
                  remove={this.remove.bind(this,index)}
                  />
                )
              })
            }
          </ul>
        </div>
        <div className='right'>
        <form onSubmit={(e) => {
        e.preventDefault();
        this.add();
        }}>
          <h3>Введите комментарий</h3>
          <textarea
          required
          minLength="2"
          value={this.state.newComment}
          onChange={(e) => this.setState({newComment: e.target.value})}
      />
      <input type="text" 
      placeholder="Кто добавил"
      required
      minLength="3"
      maxLength="30"
      value={this.state.newAuthor}
      onChange={(e) => this.setState({newAuthor: e.target.value})}
      />
      <input type="submit"
      className="submitBtn"
      value="Добавить"
      />
    </form>
  </div>
      </div>
    )
  }
}
