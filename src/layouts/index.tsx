import React from 'react';
import styles from './index.less';
import { Input, Button, Menu, Dropdown } from 'antd';
import { history, Link, Loading, connect } from 'umi';
import { FontColorsOutlined } from '@ant-design/icons';
import _ from 'lodash';
import Layout from './Layout';
import ApolloClient from 'apollo-boost';
import { ApolloProvider } from 'react-apollo';
import TitleComponent from './TitleComponent';

const client = new ApolloClient({
  uri: 'http://127.0.0.1:7001/graphql',
});

class BasicLayout extends React.Component<any, any> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      currentTab: 0,
      isLogin: false,
      userInfo: { username: '' },
    };
  }

  componentDidMount() {
    let userInfo = localStorage.getItem('userInfo');
    if (userInfo && !_.isEmpty(JSON.parse(userInfo))) {
      console.log('userInfo', userInfo);
      this.setState({
        isLogin: true,
        userInfo: JSON.parse(userInfo),
      });
    }
  }

  render() {
    const { userInfo } = this.state;
    return (
      <ApolloProvider client={client}>
        <div className={styles.normal}>
          <TitleComponent />
          <div className={styles.layout_background}>
            <div className={styles.layout}>{Layout(this.props, userInfo)}</div>
          </div>
        </div>
      </ApolloProvider>
    );
  }
}

export default connect(({ base, loading }: { base: {}; loading: Loading }) => ({
  base,
  loading: loading.models.user,
}))(BasicLayout);
