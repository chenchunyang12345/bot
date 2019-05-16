import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import classnames from 'classnames';

import MyModal from '../../../common/modal';

class CustomCard extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
            confirmLoading: false,
        }
    }

    handleOk(id) {
        this.setState({
            confirmLoading: true,
        })
        new Promise((resolve, reject) => {
            this.props.dispatch({
                type: 'study_customize/deleteCustomer',
                id,
                resolve,
            })
        }).then(() => {
            this.setState({
                visible: false,
                confirmLoading: false,
            });
        })
    }

    handleChoose(id) {
        this.props.dispatch({
            type: 'study_customize/setCustomersId',
            payload: id,
        })
    }

    componentWillUnmount() {
        // 防止组件销毁了还setState
        this.setState = (state, callback) => {
            return;
        }
    }

    render() {
        let { visible, confirmLoading } = this.state;
        let { detail, customers_id } = this.props;
        return (
            <div 
                className={classnames({
                    [styles.card]: true,
                    [styles.chooseCard]: customers_id === detail.id ? true : false,
                })}
                onClick={() => this.handleChoose(detail.id)}
            >
                <div className={styles.bg_img}></div>
                <div className={styles.head_img}></div>
                <div className={styles.name}>{detail.username}</div>
                <div className={styles.detail}>{detail.gender}<span>|</span>{detail.age}岁<span>|</span>{detail.profession}</div>
                <div className={styles.delete} onClick={(e) => {
                    e.stopPropagation();
                    this.setState({visible: true});
                }}></div>
                <MyModal
                    visible={visible}
                    okType={'danger'}
                    okText={'确定'}
                    cancelText={'取消'}
                    confirmLoading={confirmLoading}
                    onOk={() => this.handleOk(detail.id)}
                    onCancel={() => this.setState({visible: false})}
                    maskClosable={false}
                >您确定要删除虚拟用户小花吗？</MyModal>
            </div>
        )
  }
}

function mapStateToProps({ study_customize }) {
    return { ...study_customize };
}

export default connect(mapStateToProps)(CustomCard);