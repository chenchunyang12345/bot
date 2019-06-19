import React, { Component } from 'react';
import { connect } from 'dva';
import styles from './index.less';

import { Checkbox, Button } from 'antd';

// 引入自定义表单组件
import MyInput from '../../common/MyInput';
import GetCode from './GetCode';
// 引入图片
import user_icon from '../../../assets/login_user.png';
import phone_icon from '../../../assets/login_phone.png';
import password_icon from '../../../assets/login_password.png';
import code_icon from '../../../assets/login_code.png';

class RegistPage extends Component {
    constructor(props) {
        super(props);
        this.state = {
            regist_username: '',    // 注册用户名
            regist_phone: '',       // 注册电话号
            regist_code: '',        // 注册验证码
            regist_password: '',    // 注册密码
            regist_repassword: '',  // 注册重复密码
            usernameErr: false,     // 以下为各种错误状态
            phoneErr: false,
            codeErr: false,
            passwordErr: false,
            repasswordErr: false,
        }
    }

    // 检查用户名
    checkUsername() {
        let { regist_username } = this.state;
        let payload = {
            username: regist_username,
        }
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: 'login/checkUsername',
                payload,
                resolve,
                reject,
            })
        }).then(({data}) => {
            console.log(data)
        })

    }

    render() {
        let { jump } = this.props;
        let { regist_username, regist_phone, regist_code, regist_password, regist_repassword,
            usernameErr, phoneErr, codeErr, passwordErr, repasswordErr } = this.state;
        return (
            <div className={styles.wrap}>
                <div className={styles.title}>
                    <span>华来促单系统</span>
                    <span>注册</span>
                </div>
                <div className={styles.form}>
                    <div className={styles.user}>
                        <div>用户名</div>
                        <MyInput
                            prefix={user_icon}
                            placeholder='会员名/邮箱/手机号'
                            value={regist_username}
                            onChange={e => this.setState({regist_username: e.target.value})}
                            onBlur={() => this.checkUsername()}
                        />
                        <div className={styles.err_tips}>用户名已存在</div>
                    </div>
                    <div className={styles.call}>
                        <div>联系方式</div>
                        <MyInput
                            prefix={phone_icon}
                            placeholder='请输入经常使用的手机号'
                            value={regist_phone}
                            onChange={e => this.setState({regist_phone: e.target.value})}
                        />
                        <div className={styles.err_tips}>该手机号已注册</div>
                    </div>
                    <div className={styles.code}>
                        <div>验证码</div>
                        <MyInput
                            prefix={code_icon}
                            placeholder='请输入收到的验证码'
                            value={regist_code}
                            onChange={e => this.setState({regist_code: e.target.value})}
                        />
                        {/* 压盖在最上面的立即获取验证码 */}
                        <GetCode></GetCode>
                        <div className={styles.code_err_tips}>验证码不匹配</div>
                    </div>
                    <div className={styles.password}>
                        <div>密码</div>
                        <MyInput
                            type='password'
                            prefix={password_icon}
                            placeholder='请输入密码'
                            value={regist_password}
                            onChange={e => this.setState({regist_password: e.target.value})}
                        />
                        <div className={styles.err_tips} style={{bottom: '42px'}}>密码长度错误</div>
                        <div style={{height: '35px'}}></div>
                        <MyInput
                            type='password'
                            prefix={password_icon}
                            placeholder='两次输入密码保持一致'
                            value={regist_repassword}
                            onChange={e => this.setState({regist_repassword: e.target.value})}
                        />
                        <div className={styles.err_tips}>两次输入密码不一致</div>
                    </div>
                </div>
                <div className={styles.check}>
                    <Checkbox>勾选同意《用户服务协议》</Checkbox>
                </div>
                <div className={styles.btns}>
                    <Button className={styles.login_btn}>注册</Button>
                    <div>
                        or
                        <span onClick={() => jump(1)}>已有账号，立即登录</span>
                    </div>
                </div>
            </div>
        );
    }
}

function mapStateToProps({ login }) {
    return { ...login };
}

export default connect(mapStateToProps)(RegistPage);
