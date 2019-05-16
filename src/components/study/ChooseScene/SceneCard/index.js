import React, { Component } from 'react';
import styles from './index.less';

class SceneCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { detail } = this.props;
        return (
            <div className={styles.card_wrap}>
                <div className={styles.bg_img}></div>
                <div className={styles.scene}>
                    场景：
                    <span>{detail.name}</span>
                </div>
                <div className={styles.task}>
                    任务：
                    <span>{detail.task}</span>
                </div>
            </div>
        )
  }
}

export default SceneCard;