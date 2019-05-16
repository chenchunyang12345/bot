import React, { Component } from 'react';
import styles from './index.less';

const AskMsg = (props) => {
    return (
        <div className={styles.flex_wrap}>
            <div className={styles.text}>{props.word}</div>
            <div className={styles.user_img}></div>
        </div>
    )
}

export default AskMsg;