import React from 'react';
import styles from '../index.css'
import { connect } from 'dva';
import { history, Link } from 'umi';
import { Input, Button, Divider, Checkbox } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';

@connect(({ user, loading }) => ({
    user,
    loading: loading.models.user,
}))
export default class RegisterComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            username: '',
            password: '',
        }
    }

    onChangeLogin = () => {
        this.props.dispatch({
            type: 'user/login',
            payload: {
                username: this.state.username,
                password: this.state.password
            }
        })
    }

    onChangeUserName = e => {
        console.log(e.target.value)
        this.setState({
            username: e.target.value
        })
    }

    onChangePsw = e => {
        this.setState({
            password: e.target.value
        })
    }

    render() {
        return (
            <div>
                <div className={styles.input_root}>
                    <Input onChange={this.onChangeUserName} className={styles.input} color='#000' size="large" placeholder="用户名" prefix={<UserOutlined />} />
                    <Input.Password onChange={this.onChangePsw} className={styles.input} size="large" placeholder="密码" prefix={<UserOutlined />} />
                </div>
                <Button onClick={this.onChangeLogin} type="primary" shape="round" className={styles.btn}>登录</Button>
                <div style={{ justifyContent: 'space-between', marginTop: 10 }}>
                    <div style={{ display: 'inline-block', float: "left" }}><Checkbox>7天内自动登录</Checkbox></div>
                    <div style={{ display: 'inline-block', float: "right" }}>找回密码</div>
                </div>
                <div style={{ marginTop: 50 }}>
                    <Divider>快捷登录</Divider>
                    <div>微信 QQ</div>
                </div>
            </div>
        );
    }
}
