import React, { Component } from 'react';

import styles from './index.less';

// 渲染难度的组件
const Level_star = (props) => {
    let { level } = props;
    return (
        <div style={{display: 'flex', width: '44px', justifyContent: 'space-between'}}>
            <div className={level >= 1 ? styles.star_fill : styles.star}></div>
            <div className={level >= 2 ? styles.star_fill : styles.star}></div>
            <div className={level === 3 ? styles.star_fill : styles.star}></div>
        </div>
    )
}

class CardItem extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { img } = this.props;
        return (
            <div className={styles.card_wrap}>
                <div className={styles[`card_img_${img}`]}>
                    <div className={styles.title}>回顾</div>
                    <div className={styles.delete}></div>
                    <div className={styles.scene}>
                        场景：
                        <span>电话邀约-转介绍-接洽</span>
                    </div>
                    <div className={styles.task}>
                        任务：
                        <span>
                            成功确认对方身份，介绍自己，确认对方是否方便，如果方便何时见面，面谈要点有哪些。成功确认对方身份，介绍自己，确认对方是否...
                        </span>
                    </div>
                </div>
                <div className={styles[`head_img_${img}`]}></div>
                <div className={styles.info}>真实小男<span>|</span>男<span>|</span>32岁</div>
                <div className={styles.report}>报告个数：1</div>
                <div className={styles.level}>难度指数：<Level_star level={1} /></div>
                <div className={styles.btn_history}>历史记录</div>
                <div className={styles.btn_practice}>再练习</div>
            </div>
        )
  }
}

export default CardItem;