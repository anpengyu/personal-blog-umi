import React, { Fragment } from 'react';
import { connect } from 'dva';
import styles from './index.css';
import { history, Link } from 'umi';
import { Tooltip, Input, Button, Divider } from 'antd';
import gql from 'graphql-tag';
import { Query, graphql } from 'react-apollo';

const USER_INFO = gql`
  query UserInfo {
    user(id: "1") {
      id
      username
      items {
        id
        content
        tags {
          id
          content
        }
      }
    }
  }
`;

/**
 * 个人中心
 *
 * @author apy
 * @date 2020-03-24
 * @class UserInfo
 */
class UserInfo extends React.Component<any, any> {
  constructor(props) {
    super(props);
    this.state = {
      userInfo: {},
    };
  }

  componentDidMount() {
    this.props.dispatch({
      type: 'user/loadNewArticle',
    });
    // let props = this.props;
    // if (!props.loading) {
    //   this.setState({
    //     userInfo: props.data.user
    //   })
    // }
  }

  render() {
    return (
      <Fragment>
        <Query query={USER_INFO}>
          {({ loading, data }) => {
            if (!loading) {
              console.log('data', data.user);
              return <Fragment>{data.user.username}</Fragment>;
            }

            return <div>loading......</div>;
          }}
        </Query>
        {/* <div className={styles.bg}>个人中心11</div> */}
      </Fragment>
    );
  }
}

// export default graphql(USER_INFO)(UserInfo)
export default connect(({ user, loading }) => ({
  user,
  loading: loading.models.user,
}))(UserInfo);
