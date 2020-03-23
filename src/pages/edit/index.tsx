import React from 'react';
import styles from './index.less';
import { history, Link } from 'umi';
var marked = require('marked');

/**
 * 写博客
 * @author apy
 * @date 2020-03-23
 * @returns
 */

export default class Index extends React.Component {
  componentDidMount() {
    marked.setOptions({
      renderer: new marked.Renderer(),
      gfm: true,
      tables: true,
      breaks: false,
      pedantic: false,
      sanitize: false,
      smartLists: true,
      smartypants: false,
    });

    console.log(marked('```I am using __markdown__```.'));
  }

  render() {
    return (
      <div>
        <div>写博客</div>
        <textarea id="md_editor"></textarea>
      </div>
    );
  }
}
