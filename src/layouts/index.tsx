import React from 'react';
import styles from './index.less';
import { Input, Button, Menu, Dropdown } from 'antd';
import { history, Link, Loading, connect } from 'umi';
import { FontColorsOutlined } from '@ant-design/icons';
import _ from 'lodash';
import Layout from './Layout';

const tabs = [
  { name: '技术', index: 0 },
  { name: '问答', index: 1 },
  { name: '文章', index: 2 },
];
enum MenuKeys {
  USER_INFO,
  SETTING,
  LOGOUT,
}
const menuDatas = [
  { title: '个人中心', key: MenuKeys.USER_INFO },
  { title: '设置', key: MenuKeys.SETTING },
  { title: '退出登录', key: MenuKeys.LOGOUT },
];

class BasicLayout extends React.Component<any, StateComponent> {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      currentTab: 0,
      tabs,
      isLogin: false,
      userInfo: { username: '' },
    };
  }

  clickLogout = (key: number) => {
    switch (key) {
      case MenuKeys.USER_INFO:
        history.push('/userInfo');
        break;
      case MenuKeys.SETTING:
        break;
      case MenuKeys.LOGOUT:
        this.props.dispatch({
          type: 'base/logout',
          callback: () => {
            // this.setState({
            //   isLogin: false,
            //   userInfo: { username: '' },
            // });

            window.location.reload(false);
          },
        });
        break;
    }
  };

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

  changeTab = (currentTab: number) => {
    this.setState({
      currentTab,
    });
  };

  clickWriteArticle = () => {
    history.push('/write');
  };

  loginUserTitle = () => {
    const { userInfo } = this.state;
    let menu = (
      <Menu>
        {menuDatas.map((item, index) => {
          return (
            <Menu.Item key={index}>
              <div onClick={this.clickLogout.bind(this, item.key)}>
                {item.title}
              </div>
            </Menu.Item>
          );
        })}
      </Menu>
    );
    return (
      <div>
        <Dropdown overlay={menu}>
          <a className="ant-dropdown-link" onClick={e => e.preventDefault()}>
            {userInfo.username}
          </a>
        </Dropdown>
      </div>
    );
  };

  render() {
    const { currentTab, isLogin, userInfo } = this.state;
    console.log('isLogin', isLogin);
    console.log(currentTab);
    return (
      <div className={styles.normal}>
        <div className={styles.nav}>
          <div className={styles.nav_row}>
            <div className={styles.nav_title}>
              <img
                style={{ height: 50, width: 50, marginRight: 30 }}
                src={require('../assets/timg.jpg')}
              />
              {tabs.map((item, index) => {
                return (
                  <div
                    key={index}
                    className={
                      currentTab === index ? styles.currentTab : styles.tab
                    }
                    onClick={this.changeTab.bind(this, index)}
                  >
                    {item.name}
                  </div>
                );
              })}
              <Input.Search
                placeholder="搜索"
                onSearch={value => console.log(value)}
                enterButton
                className={styles.search}
              />
            </div>

            <div style={{ display: 'flex' }}>
              <div style={{ marginRight: 20 }}>
                <Button
                  type="primary"
                  shape="round"
                  icon={<FontColorsOutlined />}
                  onClick={this.clickWriteArticle}
                >
                  写博客
                </Button>
              </div>
              {isLogin ? (
                this.loginUserTitle()
              ) : (
                <Link to="/register">登录/注册</Link>
              )}
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 100 }}>{Layout(this.props, userInfo)}</div>
      </div>
    );
  }
}

export default connect(({ base, loading }: { base: {}; loading: Loading }) => ({
  base,
  loading: loading.models.user,
}))(BasicLayout);
