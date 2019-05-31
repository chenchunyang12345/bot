import React, { Component } from 'react';
import styles from './index.less';

const MsgTips = (props) => {
    return (
        <div className={styles.flex_wrap}>
            <div className={styles.bg}>
                {props.word}
            </div>
        </div>
    )
}

export default MsgTips;