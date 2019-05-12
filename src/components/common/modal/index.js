import React, { Component } from 'react';
import { Modal, Button } from 'antd';

import styles from './index.less';

class MyModal extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { oneBtn, onCancel, ...settings } = this.props;
        // 如果定义为一个btn，则重新渲染footer
        if(oneBtn) {
            settings.footer = (
                <Button type={'primary'} style={{marginLeft: '50px'}}>去看报告</Button>
            )
        }
        return (
            <Modal
                wrapClassName={'my_modal'}
                bodyStyle={{textAlign: 'center', padding: '25px 25px 34px'}}
                closable={false}
                width={360}
                onCancel={onCancel}
                {...settings}
            >
                <div className={styles.close} onClick={() => onCancel && onCancel()}></div>
                {this.props.children}
            </Modal>
        )
  }
}

// 设置默认的props
MyModal.defaultProps = {
    oneBtn: false,
}

export default MyModal;