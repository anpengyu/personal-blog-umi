import React from 'react';
import styles from './index.less';
import { Input, Button, Menu, Dropdown } from 'antd';
import { history, Link, Loading, connect } from 'umi';
import { FontColorsOutlined } from '@ant-design/icons';
import _ from 'lodash';
import Layout from './Layout';
import { ApolloProvider } from 'react-apollo';
import { ApolloClient } from 'apollo-client';
import { ApolloLink } from 'apollo-link';
import { HttpLink } from 'apollo-link-http';
import { onError } from 'apollo-link-error';
import { InMemoryCache } from 'apollo-cache-inmemory';

const httpLink = new HttpLink({
  uri: 'http://127.0.0.1:7001/graphql',
});
// const errorLink = onError(({ networkError }) => {
//   console.log('networkError.statusCode',networkError.statusCode)
//   if (networkError.statusCode === 400) history.push('/');
// })
const errorLink = onError(
  ({ graphQLErrors, networkError, operation, forward }) => {
    console.log('operation', operation);
    if (graphQLErrors) {
      graphQLErrors.map(({ message, locations, path }) =>
        console.log(
          `[GraphQL error]: Message: ${message}, Location: ${JSON.stringify(
            locations,
          )}, Path: ${path}`,
        ),
      );
    }
    if (networkError) {
      console.log(`[Network error]: ${networkError}`);
    }
  },
);
const link = ApolloLink.from([errorLink, httpLink]);
const cache = new InMemoryCache();
const client = new ApolloClient({
  link,
  cache,
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
    console.log('history', history);
    return (
      <ApolloProvider client={client}>{this.props.children}</ApolloProvider>
    );
  }
}

export default connect(({ base, loading }: { base: {}; loading: Loading }) => ({
  base,
  loading: loading.models.user,
}))(BasicLayout);
