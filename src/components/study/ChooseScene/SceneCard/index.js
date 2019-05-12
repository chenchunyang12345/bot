import React, { Component } from 'react';
import styles from './index.less';

class SceneCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.card_wrap}>
                <div className={styles.bg_img}></div>
                <div className={styles.scene}>
                    场景：
                    <span>电话邀约---转介绍</span>
                </div>
                <div className={styles.task}>
                    任务：
                    <span>成功确认对方身份，介绍自己，确认对方是否方便，如果方便何时见面，面谈要点有哪些。成功确认对方身...</span>
                </div>
            </div>
        )
  }
}

export default SceneCard;