import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';

import { Pagination, Spin } from 'antd';

import CardItem from './CardItem';

class HistoryCard extends Component {
    constructor(props) {
        super(props);
    }

    renderCards() {
        let { history_list } = this.props;
        return history_list.map((history, idx) => {
            return <CardItem 
                        key={idx}
                        detail={history}
                        img={(idx + 1) % 6}
                    />
        })
    }

    // 改变页码
    changePage(page) {
        this.props.dispatch({
            type: 'study/getHistory',
            pagination: {
                current: page,
                pageSize: 5,
            }
        })
    }

    render() {
        let { loading } = this.props;
        let { history_current, history_size, history_total } = this.props;
        return (
            <div className={styles.history}>
                {/* 卡片组件 */}
                <Spin delay={500} tip='loading...' spinning={loading.effects['study/getHistory']}>
                    <div className={styles.cards_container}>
                        {
                            this.renderCards()
                        }
                    </div>
                </Spin>
                {/* 分页 */}
                <Pagination 
                    current={history_current}
                    pageSize={history_size}
                    total={history_total}
                    onChange={ page => this.changePage(page) }
                    showQuickJumper 
                />
            </div>
        )
  }
}

function mapStateToProps({ study, loading }) {
    return {...study, loading};
}

export default connect(mapStateToProps)(HistoryCard);