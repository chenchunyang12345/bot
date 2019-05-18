import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';

import { Breadcrumb, Icon } from 'antd';

// 引入卡片的轮播组件
import { CarouselBot, HistoryCard } from '../../components/study';

class Study extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                {/* 面包屑 */}
                <div className={styles.breadcrumb}>
                    <div className={styles.inner}>
                        <Icon type="home" theme="twoTone"/>
                        <Breadcrumb separator=">">
                            <Breadcrumb.Item>
                                首页
                            </Breadcrumb.Item>
                            <Breadcrumb.Item>
                                学习
                            </Breadcrumb.Item>
                        </Breadcrumb>
                    </div>
                </div>
                {/* 主要内容 */}
                <div className={styles.content}>
                    <div className={styles.carousel}>
                        <div className={styles.type}>推荐练习</div>
                        <a className={styles.customize} href="#/study/customize">自定义练习</a>
                        <CarouselBot></CarouselBot>
                    </div>
                    <div className={styles.exercise_card}>
                        <div className={styles.type}>温故知新</div>
                        <HistoryCard></HistoryCard>
                    </div>
                </div>
            </div>
        )
  }
}

function mapStateToProps({ study }) {
    return {...study};
}

export default connect(mapStateToProps)(Study);