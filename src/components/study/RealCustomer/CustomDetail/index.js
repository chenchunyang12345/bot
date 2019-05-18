import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';

import { Button } from 'antd';

class CustomDetail extends Component {
    constructor(props) {
        super(props);
    }

    importDetail() {
        let { display_detail, jumpImport } = this.props;
        let { username, gender, age, profession, maritalStatus, children, income, budget, remarks, disposition, status, identity } = display_detail;
        this.props.dispatch({
            type: 'study_customer/importInfo',
            payload: {
                name: username,
                sex: gender,
                age: age,
                job: profession,
                married: maritalStatus,
                children: children,
                // health: health,
                income: income,
                need: remarks,
                plan: budget,
                process: status,
                agree: identity,
                character: disposition,
            }
        });
        // 设置完值再跳转到新建窗口
        jumpImport();
    }

    render() {
        let { closeModal, display_detail } = this.props;
        if( display_detail ) {
            let { username, gender, age, profession, maritalStatus, remarks, budget, identity, income } = display_detail;
            switch (identity) {
                case 'LOW':
                    identity = '低';
                    break;
                case 'MID':
                    identity = '中';
                    break;
                case 'HIGH':
                    identity = '高';
                    break;
            }
            return (
                <div className={styles.container}>
                    <div className={styles.title}>已选择联系人</div>
                    <div className={styles.detail}>
                        <div className={styles.head_img}></div>
                        <div className={styles.name}>
                            <span>姓名：</span>
                            <span>{username}</span>
                        </div>
                        <div className={styles.sex}>
                            <span>性别：</span>
                            <span>{gender === 'MALE' ? '男' : '女'}</span>
                        </div>
                        <div className={styles.age}>
                            <span>年龄：</span>
                            <span>{age}岁</span>
                        </div>
                        <div className={styles.job}>
                            <span>职业：</span>
                            <span>{profession}</span>
                        </div>
                        <div className={styles.family}>
                            <span>家庭情况：</span>
                            <span>{maritalStatus === 0 ? '未婚' : '已婚'}</span>
                        </div>
                        <div className={styles.health}>
                            <span>健康状况：</span>
                            <span>未知</span>
                        </div>
                        <div className={styles.money}>
                            <span>收入：</span>
                            <span>{income}</span>
                        </div>
                        <div className={styles.need}>
                            <span>保险需求：</span>
                            <span>{remarks}</span>
                        </div>
                        <div className={styles.budget}>
                            <span>预算：</span>
                            <span>{budget}</span>
                        </div>
                        <div className={styles.accept}>
                            <span>对保险的认同感：</span>
                            <span>{identity}</span>
                        </div>
                    </div>
                    <Button className={styles.btn1} onClick={() => closeModal()}>取消</Button>
                    <Button 
                        className={styles.btn2} 
                        type='primary'
                        onClick={() => this.importDetail()} 
                    >导入</Button>
                </div>
            )
        } else {
            return null;
        }
  }
}

function mapStateToProps({ study_customer }) {
    return { ...study_customer };
}

export default connect(mapStateToProps)(CustomDetail);