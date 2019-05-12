import React, { Component } from 'react';
import styles from './index.less';

const AnsMsg = (props) => {
    return (
        <div className={styles.flex_wrap}>
            <div className={styles.ans_head}></div>
            <div className={styles.ans_text}>喂，你好。基本两三天就能确定了.可以吗</div>
        </div>
    )
}

export default AnsMsg;