import * as React from 'react';
import is_Empty from './check-empty';
import CommentItem from './comm-item';
import Comm_date from './comm-date';
const COMMENT_REPO_NAME = 'comments';

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
        const commentsArr = localStorage.getItem(COMMENT_REPO_NAME);
        const parsedCommensArr = JSON.parse(commentsArr);
        parsedCommensArr.forEach(comm => this.state.comments.push(comm))
      }
    }
    CheckLocalStor();
  }
  add() {
    const comments = this.state.comments;
    comments.push({
      text: this.state.newComment,
      author: this.state.newAuthor,
      date: this.state.newDate,
    });
    const sortArr = comments.filter(obj => !is_Empty(obj) ? obj : false);
    localStorage.setItem(COMMENT_REPO_NAME, JSON.stringify(sortArr));
    this.setState({ 
      comments,
      newComment:'',
      newAuthor:'', 
    })
  }
  remove(target) {
    const confirmDelete = confirm('Удалить');
    if (!confirmDelete) {
      return false;
    }
    const comments = this.state.comments.filter((comm) => is_Empty(comm) ? false : comm).map((comm,index) => {
      if (target === index) {
        for (let i = 0; i < localStorage.length; i++) {
          const storage = JSON.parse(localStorage.getItem(COMMENT_REPO_NAME));
          storage.splice(target,1);
          localStorage.setItem(COMMENT_REPO_NAME, JSON.stringify(storage));
        }
        return {};
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
              this.state.comments.filter((comm) => is_Empty(comm) ? false : comm).map(
                (comm,index) => {
                return (
                  <CommentItem 
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
