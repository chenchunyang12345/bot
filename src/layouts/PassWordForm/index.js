import React, { Component } from 'react';
import styles from './index.less';

import MyInput from '../../components/common/myInput';

// 图标
import pass_icon from '../../assets/login_password.png';

class PassWordForm extends Component {
    render() {
        return (
            <div>
                <div className={styles.title}>修改密码</div>
                <div className={styles.content}>
                    <MyInput
                        prefix={pass_icon}
                        icon_width='14px'
                        icon_height='17px'
                        className={styles.my_input1}
                        placeholder='会员名/邮箱/手机号'
                    />
                    <MyInput
                        prefix={pass_icon}
                        icon_width='14px'
                        icon_height='17px'
                        className={styles.my_input2}
                        placeholder='会员名/邮箱/手机号'
                    />
                    <MyInput
                        prefix={pass_icon}
                        icon_width='14px'
                        icon_height='17px'
                        className={styles.my_input3}
                        placeholder='会员名/邮箱/手机号'
                    />
                </div>
            </div>
        );
    }
}

export default PassWordForm;
