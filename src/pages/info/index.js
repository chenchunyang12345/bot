import React, { Component } from 'react';
import styles from './index.less';
import { Button } from 'antd';
import MyInput from '../../components/common/myInput';

// 引入输入框前缀图片
import user_icon from '../../assets/login_user.png';
import phone_icon from '../../assets/login_phone.png';
import company_icon from '../../assets/company.png';

class Info extends Component {
    render() {
        return (
            <div className={styles.wrap}>
                <div className={styles.title}>
                    基本信息
                </div>
                <div className={styles.form}>
                    {/* 表单 */}
                    <div className={styles.row}>
                        <div>用户名</div>
                        <MyInput 
                            prefix={user_icon}
                            className={styles.my_input}
                            placeholder='请输入用户名'
                        />
                    </div>
                    <div className={styles.row}>
                        <div>联系电话</div>
                        <MyInput 
                            prefix={phone_icon}
                            className={styles.my_input}
                            placeholder='请输入电话号码'
                        />
                    </div>
                    <div className={styles.row}>
                        <div>姓名</div>
                        <MyInput 
                            prefix={user_icon}
                            className={styles.my_input}
                            placeholder='请输入你的名字'
                        />
                    </div>
                    <div className={styles.row}>
                        <div>昵称</div>
                        <MyInput 
                            prefix={user_icon}
                            className={styles.my_input}
                            placeholder='取一个有趣的昵称吧'
                        />
                    </div>
                    <div className={styles.row}>
                        <div>公司</div>
                        <MyInput 
                            prefix={company_icon}
                            className={styles.my_input}
                            placeholder='请输入公司名称'
                        />
                    </div>
                    {/* 按钮 */}
                    <div className={styles.btns}>
                        <Button>取消</Button>
                        <Button type='primary'>保存</Button>
                    </div>
                </div>
            </div>
        );
    }
}

export default Info;
