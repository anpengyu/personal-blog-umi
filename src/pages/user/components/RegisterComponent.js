import React from 'react';
import styles from '../index.css'
import { connect } from 'dva';
import { history, Link } from 'umi';
import { Tooltip, Input, Button, Divider, View } from 'antd';
import { UserOutlined, PhoneOutlined } from '@ant-design/icons';
@connect(({ user, loading }) => ({
    user,
    loading: loading.models.user,
}))
export default class RegisterComponent extends React.Component {

    changeRegister = () => {
        console.log('this.props', this.props)
    }

    render() {
        return (
            <div>
                <div className={styles.input_root}>
                    <Input className={styles.input} color='#000' size="large" placeholder="请输入用户名" prefix={<UserOutlined />} />
                    <Input.Password className={styles.input} size="large" placeholder="设置密码" prefix={<UserOutlined />} />
                    <Input.Password className={styles.input} size="large" placeholder="确认密码" prefix={<UserOutlined />} />
                    <Input className={styles.input} size="large" placeholder="手机号码" maxLength={25} prefix={<PhoneOutlined />} />
                </div>
                <Button
                    onClick={this.changeRegister}
                    type="primary" shape="round" className={styles.btn}>注册</Button>
                <div style={{ marginTop: 10 }}>点击 “注册” 即表示您同意并愿意遵守简书</div>
                <div>
                    <a target='_blank' href="/userAgreement">用户协议</a>
                    和
                    <a target='_blank' href='/privacyPolicy'>隐私政策</a>
                </div>
                <div style={{ marginTop: 50 }}>
                    <Divider>社交帐号直接注册</Divider>
                    <div>微信 QQ</div>
                </div>
            </div>
        );
    }
}
