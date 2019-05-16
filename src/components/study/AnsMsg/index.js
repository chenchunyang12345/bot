import React, { Component } from 'react';
import styles from './index.less';

const AnsMsg = (props) => {
    return (
        <div className={styles.flex_wrap}>
            <div className={styles.ans_head}></div>
            <div className={styles.ans_text}>{props.word}</div>
        </div>
    )
}

export default AnsMsg;