import React, { Component } from 'react';
import styles from './index.less';

import classnames from 'classnames';
import MyModal from '../../common/modal';

class ReportCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    render() {
        let { num } = this.props;
        let { visible } = this.state;
        return (
            <div className={classnames({
                [styles.card_wrap]: true,
                [styles.card_nomargin]: num % 4 === 0 ? true : false,
            })}>
                <div className={styles.delete} onClick={() => this.setState({visible: true})}></div>
                <div className={styles.img}></div>
                <div className={styles.score}>82分</div>
                <div className={styles.date}>2019年4月29日 16：02</div>
                <div className={styles.my_btn}>我的报告</div>
                {/* 确认框 */}
                <MyModal
                    visible={visible}
                    okType={'danger'}
                    okText={'确定'}
                    cancelText={'取消'}
                    onOk={() => this.setState({visible: false})}
                    onCancel={() => this.setState({visible: false})}
                    maskClosable={false}
                >
                    您确定要删除此报告吗？
                </MyModal>
            </div>
        )
  }
}

export default ReportCard;