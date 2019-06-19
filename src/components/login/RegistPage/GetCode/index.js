import React, { Component } from 'react';
import styles from './index.less';

class GetCode extends Component {
    render() {
        return (
            <div className={styles.wrap}>
                <div className={styles.button}>
                    立刻获取验证码
                </div>
            </div>
        );
    }
}

export default GetCode;
