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
        return (
            <Modal
                wrapClassName='real_customer'
                visible={true}
                closable={false}
                width={740}
                footer={null}
            >
                <div className={styles.close}></div>
                <div className={styles.title}>来自真实客户</div>
                <div className={styles.content}>
                    <div className={styles.left}>
                        <SearchList></SearchList>
                    </div>
                    <div className={styles.right}>
                        <CustomDetail></CustomDetail>
                    </div>
                </div>
            </Modal>
        )
  }
}

export default RealCustomer;