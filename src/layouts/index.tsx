import React from 'react';
import styles from './index.less';
import { Input, Button } from 'antd';
import { history, Link } from 'umi';
import { FontColorsOutlined } from '@ant-design/icons';

const tabs = [
  { name: '技术', index: 0, isshow: true },
  { name: '问答', index: 1, isshow: true },
  { name: '文章', index: 2, isshow: true },
];

class BasicLayout extends React.Component {
  constructor(props: Readonly<{}>) {
    super(props);
    this.state = {
      currentTab: 0,
      tabs,
    };
  }

  changeTab = currentTab => {
    this.setState({
      currentTab,
    });
  };

  clickWriteArticle = () => {
    history.push('/write');
  };

  render() {
    const { currentTab } = this.state;
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
              <Link to="/register">登录/注册</Link>
            </div>
          </div>
        </div>
        <div style={{ paddingTop: 100 }}>{this.props.children}</div>
      </div>
    );
  }
}

export default BasicLayout;
