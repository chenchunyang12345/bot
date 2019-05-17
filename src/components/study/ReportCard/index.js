import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';

import classnames from 'classnames';
import MyModal from '../../common/modal';

class ReportCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,     // 删除报告modal的显隐
        }
    }

    handleDelete(id) {
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: 'study_history/deleteReport',
                serviceName: 'deleteReport',
                id,
                resolve,
                reject,
            })
        }).then((data) => {
            console.log(data)
            this.setState({
                visible: false,
            });
        })
    }

    componentWillUnmount() {
        // 防止组件销毁了还setState
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        let { num, detail } = this.props;
        let { visible } = this.state;
        return (
            <div className={classnames({
                [styles.card_wrap]: true,
                [styles.card_nomargin]: num % 4 === 0 ? true : false,
            })}>
                <div className={styles.delete} onClick={() => this.setState({visible: true})}></div>
                <div className={styles.img}></div>
                <div className={styles.score}>{detail.score}分</div>
                <div className={styles.date}>{detail.createTime}</div>
                <a href={`/#/study/report?id=${detail.id}`} className={styles.my_btn}>我的报告</a>
                {/* 确认框 */}
                <MyModal
                    visible={visible}
                    okType={'danger'}
                    okText={'确定'}
                    cancelText={'取消'}
                    onOk={() => this.handleDelete(detail.id)}
                    onCancel={() => this.setState({visible: false})}
                    onClose={() => this.setState({visible: false})}
                    maskClosable={false}
                >
                    您确定要删除此报告吗？
                </MyModal>
            </div>
        )
  }
}

function mapStateToProps({ study_history }) {
    return {...study_history};
}

export default connect(mapStateToProps)(ReportCard);