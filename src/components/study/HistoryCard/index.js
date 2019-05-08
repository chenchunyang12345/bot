import React, { Component } from 'react';
import { Pagination } from 'antd';

import styles from './index.less';

import CardItem from './CardItem';

class HistoryCard extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.history}>
                {/* 卡片组件 */}
                <div className={styles.cards_container}>
                    <CardItem img={1}></CardItem>
                    <CardItem img={2}></CardItem>
                    <CardItem img={3}></CardItem>
                    <CardItem img={4}></CardItem>
                    <CardItem img={5}></CardItem>
                </div>
                {/* 分页 */}
                <Pagination showQuickJumper />
            </div>
        )
  }
}

export default HistoryCard;