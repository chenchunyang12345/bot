import React, { Component } from 'react';
import styles from './index.less';

// 引入登录注册组件
import { LoginPage, RegistPage } from '../../components/login';

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            left: '0px',  // 左边图片的偏移量（滑动效果）
            show: 1,      // 1为登录，2为注册
        }
        this.jump = this.jump.bind(this);
    }

    // 渲染右侧表单
    renderContent() {
        let { show } = this.state;
        switch (show) {
            case 1:
                return <LoginPage jump={this.jump}></LoginPage>
            case 2:
                return <RegistPage jump={this.jump}></RegistPage>
            default:
                return null;
        }
    }

    // 登录注册来回跳转
    jump(num) {
        this.setState({
            show: num,
            left: num === 1 ? '0px' : '-100%',
        })
    }

    render() {
        let { left } = this.state;
        return (
            <div className={styles.wrap}>
                <div className={styles.left}>
                    <div className={styles.train} style={{left: left}} onClick={() => this.setState({left: '-100%'})}>
                        <div className={styles.bg1}></div>
                        <div className={styles.bg2}></div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.box}>
                        {
                            this.renderContent()
                        }
                    </div>
                </div>
            </div>
        );
    }
}

export default Login;
