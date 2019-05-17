import React, { Component } from 'react';
import styles from './index.less';

import { Modal } from 'antd';

import SearchList from './SearchList';
import CustomDetail from './CustomDetail';

class RealCustomer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { visible, closeModal, jumpImport } = this.props;
        return (
            <Modal
                wrapClassName='real_customer'
                visible={visible}
                closable={false}
                width={740}
                footer={null}
            >
                <div className={styles.close} onClick={() => closeModal()}></div>
                <div className={styles.title}>来自真实客户</div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <SearchList></SearchList>
                    </div>
                    <div className={styles.right}>
                        <CustomDetail 
                            closeModal={closeModal} 
                            jumpImport={jumpImport}
                        ></CustomDetail>
                    </div>
                </div>
            </Modal>
        )
  }
}

export default RealCustomer;