import React, { Component } from 'react';
import styles from './index.less';

import MyModal from '../../../common/modal';

class CustomCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    render() {
        let { visible } = this.state;
        return (
            <div className={styles.card}>
                <div className={styles.bg_img}></div>
                <div className={styles.head_img}></div>
                <div className={styles.name}>Melissa Lopez</div>
                <div className={styles.detail}>男<span>|</span>22岁<span>|</span>产品经理</div>
                <div className={styles.delete} onClick={() => this.setState({visible: true})}></div>
                <MyModal
                    visible={visible}
                    okType={'danger'}
                    okText={'确定'}
                    cancelText={'取消'}
                    onOk={() => this.setState({visible: false})}
                    onCancel={() => this.setState({visible: false})}
                    maskClosable={false}
                >您确定要删除虚拟用户小花吗？</MyModal>
            </div>
        )
  }
}

export default CustomCard;