import React, { Component } from 'react';
import styles from './index.less';

import { Checkbox, Button } from 'antd';

// 引入自定义表单组件
import MyInput from '../../common/myInput';
// 引入图片
import user_icon from '../../../assets/login_user.png';
import phone_icon from '../../../assets/login_phone.png';
import password_icon from '../../../assets/login_password.png';

class RegistPage extends Component {
    render() {
        let { jump } = this.props;
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
                            className={styles.my_input}
                            placeholder='会员名/邮箱/手机号'
                        />
                    </div>
                    <div className={styles.call}>
                        <div>联系方式</div>
                        <MyInput
                            prefix={phone_icon}
                            className={styles.my_input}
                            placeholder='请输入经常使用的手机号'
                        />
                    </div>
                    <div className={styles.password}>
                        <div>密码</div>
                        <MyInput
                            prefix={password_icon}
                            className={styles.my_input}
                            placeholder='请输入密码'
                        />
                        <div style={{height: '35px'}}></div>
                        <MyInput
                            prefix={password_icon}
                            className={styles.my_input}
                            placeholder='两次输入密码保持一致'
                        />
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

export default RegistPage;
