import React, { Component } from 'react';
import styles from './index.less';

import TabsDetail from './TabsDetail';
import AskMsg from '../AskMsg';
import AnsMsg from '../AnsMsg';

class CheckTalk extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.container}>
                <div className={styles.left}>
                    <div className={styles.left_wrap}>
                        <div className={styles.ask_wrap}>
                            <span className={styles.badge}>1</span>
                            <AskMsg></AskMsg>
                        </div>
                        <div className={styles.ans_wrap}>
                            <AnsMsg></AnsMsg>
                        </div>
                    </div>
                </div>
                <div className={styles.right}>
                    <div className={styles.tabs_wrap}>
                        <span className={styles.badge}>1</span>
                        <TabsDetail></TabsDetail>
                    </div>
                    <div className={styles.tabs_wrap}>
                        <span className={styles.badge}>1</span>
                        <TabsDetail></TabsDetail>
                    </div>
                </div>
            </div>
        )
  }
}

export default CheckTalk;