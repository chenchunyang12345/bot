import React, { Component } from 'react';
import styles from './index.less';

const MsgTips = (props) => {
    return (
        <div className={styles.flex_wrap}>
            <div className={styles.bg}>
                3月4号上午8点与消化在咖啡厅初次见面
            </div>
        </div>
    )
}

export default MsgTips;