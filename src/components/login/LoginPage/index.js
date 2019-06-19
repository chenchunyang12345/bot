import React, { Component } from 'react';
import styles from './index.less';
import classnames from 'classnames';
import { connect } from 'dva';

import { Checkbox, Button, message } from 'antd';

// 引入自定义表单组件
import MyInput from '../../common/MyInput';
// 引入图片
import user_icon from '../../../assets/login_user.png';
import password_icon from '../../../assets/login_password.png';

class LoginPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            login_username: '',     // 登陆用户名
            login_password: '',     // 登陆密码
        }
    }

    // 点击登陆
    handleLogin() {
        let { login_username, login_password } = this.state;
        let payload = {
            username: login_username,
            password: login_password,
        }
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: 'login/login',
                payload,
                resolve,
                reject,
            })
        }).then(({data}) => {
            // 登陆成功
            console.log(data)
            if(data.errno !== 200) {
                message.error(data.msg, 2);
                this.setState({
                    login_username: '',
                    login_password: '',
                })
            }
        })
    }

    render() {
        let { jump } = this.props;
        let { login_username, login_password } = this.state;
        let hasNull = login_username && login_password;     // 是否有一项为空
        return (
            <div className={styles.wrap}>
                <div className={styles.title}>
                    <span>华来促单系统</span>
                    <span>登录</span>
                </div>
                <div className={styles.form}>
                    <div className={styles.user}>
                        <div>用户名</div>
                        <MyInput
                            prefix={user_icon}
                            placeholder='会员名/邮箱/手机号'
                            value={login_username}
                            onChange={e => this.setState({login_username: e.target.value})}
                        />
                    </div>
                    <div className={styles.password}>
                        <div>密码</div>
                        <MyInput
                            type='password'
                            prefix={password_icon}
                            placeholder='请输入密码'
                            value={login_password}
                            onChange={e => this.setState({login_password: e.target.value})}
                        />
                    </div>
                </div>
                <div className={styles.remember}>
                    <Checkbox>记住账号</Checkbox>
                </div>
                <div className={styles.btns}>
                    <Button 
                        disabled={!hasNull} 
                        className={classnames({
                            [styles.login_btn]: true,
                            [styles.noClick]: !hasNull,
                        })}
                        onClick={() => this.handleLogin()}
                    >登录</Button>
                    <div>
                        or
                        <span onClick={() => jump(2)}>注册新用户</span>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ login }) {
    return { ...login };
}

export default connect(mapStateToProps)(LoginPage);
