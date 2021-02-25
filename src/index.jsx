import * as React from 'react';
import * as ReactDOM from 'react-dom';
import {Widget} from './comm-widget';
import styles from './comm-widget.less';

styles;
window.addEventListener('load', () => {
  ReactDOM.render(<Widget />, document.getElementById('react_root'));
})
