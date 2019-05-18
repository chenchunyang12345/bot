import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';

import { Tooltip } from 'antd';

import MyModal from '../../../common/modal';

// 渲染难度的组件
const Level_star = (props) => {
    let { level } = props;
    return (
        <div style={{display: 'flex', width: '44px', justifyContent: 'space-between'}}>
            <div className={level >= 1 ? styles.star_fill : styles.star}></div>
            <div className={level >= 2 ? styles.star_fill : styles.star}></div>
            <div className={level === 3 ? styles.star_fill : styles.star}></div>
        </div>
    )
}

class CardItem extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    // 点击了删除的按钮
    handleDelete() {
        this.setState({
            visible: true,
        })
    }

    render() {
        let { img, detail } = this.props;
        let { visible } = this.state;
        console.log(detail)
        let { customer, scene } = detail;
        return (
            <div className={styles.card_wrap}>
                <div className={styles[`card_img_${img}`]}>
                    <div className={styles.title}>回顾</div>
                    <div className={styles.delete} onClick={() => this.handleDelete()}></div>
                    <div className={styles.scene}>
                        场景：
                        <span>{scene.name}</span>
                    </div>
                    <div className={styles.task}>
                        任务：
                        <span>{scene.task}</span>
                    </div>
                </div>
                <div className={styles[`head_img_${img}`]}></div>
                <div className={styles.info}>{customer.username}<span>|</span>{customer.gender === 'MALE' ? '男' : '女'}<span>|</span>{customer.age}岁</div>
                <div className={styles.report}>报告个数：{detail.countList[0].status === "FINISHED" ? detail.countList[0].count : detail.countList[1].count}</div>
                <div className={styles.level}>难度指数：<Level_star level={detail.level} /></div>
                <Tooltip title={`您有${detail.countList[0].status === "FINISHED" ? detail.countList[1].count : detail.countList[0].count}个训练待完成`}>
                    <a className={styles.btn_history} href={`#/study/history?id=${detail.id}`}>
                        <div className={styles.budge}>{detail.countList[0].status === "FINISHED" ? detail.countList[1].count : detail.countList[0].count}</div>
                        历史记录
                    </a>
                </Tooltip>
                <a className={styles.btn_practice} href={`#/study/dm?id=${detail.id}`}>再练习</a>
                {/* 确认框 */}
                <MyModal
                    visible={visible}
                    okType={'danger'}
                    cancelText={'取消'}
                    onOk={() => {
                        new Promise((resolve) => {
                            this.props.dispatch({ type: 'study/deleteCard', id: detail.id, resolve, });
                        }).then(() => {
                            this.setState({visible: false});
                        })
                    }}
                    onCancel={() => this.setState({visible: false})}
                    onClose={() => this.setState({visible: false})}
                    maskClosable={false}
                >
                    您确定要删除此历史练习卡吗？
                </MyModal>
            </div>
        )
  }
}

export default connect()(CardItem);