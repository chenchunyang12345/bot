import React, { Component } from 'react';
import styles from './index.less';

import { Button } from 'antd';

class CustomDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.title}>已选择联系人</div>
                <div className={styles.detail}>
                    <div className={styles.head_img}></div>
                    <div className={styles.name}>
                        <span>姓名：</span>
                        <span>集盒家居旗舰店双十一活动</span>
                    </div>
                    <div className={styles.sex}>
                        <span>性别：</span>
                        <span>男</span>
                    </div>
                    <div className={styles.age}>
                        <span>年龄：</span>
                        <span>15岁</span>
                    </div>
                    <div className={styles.job}>
                        <span>职业：</span>
                        <span>未知</span>
                    </div>
                    <div className={styles.family}>
                        <span>家庭情况：</span>
                        <span>未知</span>
                    </div>
                    <div className={styles.health}>
                        <span>健康状况：</span>
                        <span>未知</span>
                    </div>
                    <div className={styles.money}>
                        <span>经济状况：</span>
                        <span>未知</span>
                    </div>
                    <div className={styles.need}>
                        <span>保险需求：</span>
                        <span>未知</span>
                    </div>
                    <div className={styles.budget}>
                        <span>预算：</span>
                        <span>未知</span>
                    </div>
                    <div className={styles.accept}>
                        <span>对保险的认同感：</span>
                        <span>未知</span>
                    </div>
                </div>
                <Button className={styles.btn1}>取消</Button>
                <Button className={styles.btn2} type='primary'>导入</Button>
            </div>
        )
  }
}

export default CustomDetail;