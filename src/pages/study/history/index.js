import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import { Spin } from 'antd';

import classnames from 'classnames';
import { ReportCard } from '../../../components/study';
import { UnfinishCard } from '../../../components/study';

class History extends Component {
    constructor(props) {
        super(props);
        this.state = {
            choose: 1,  // 默认选择的tab
        }
    }

    // 渲染报告列表
    renderReportList() {
        let { reportList } = this.props;
        return reportList.map((report, idx) => {
            return <ReportCard 
                        key={idx}
                        num={idx + 1}
                        detail={report}
                    />
        })
    }

    // 渲染未完成列表
    renderUnfinishList() {
        let { unfinishList } = this.props;
        return unfinishList.map((unfinish, idx) => {
            return <UnfinishCard 
                        key={idx}
                        num={idx + 1}
                        detail={unfinish}
                    />
        })
    }

    render() {
        console.log(this.props.loading.effects)
        let { choose } = this.state;
        let { reportList, unfinishList, loading } = this.props;
        return (
            <div>
                <div className={styles.back}>
                    <a href="#/study">返回</a>
                </div>
                <div className={styles.tabs_nav}>
                    <div className={classnames({
                        [styles.report]: true,
                        [styles.choose]: choose === 1 ? true : false
                    })} onClick={() => this.setState({choose: 1})}>我的报告({reportList.length})</div>
                    <div className={classnames({
                        [styles.unfinish]: true,
                        [styles.choose]: choose === 2 ? true : false
                    })} onClick={() => this.setState({choose: 2})}>未完成({unfinishList.length})</div>
                </div>
                {/* 渲染不同的内容 */}
                {
                    choose === 1 ? 
                    <Spin 
                        delay={500} 
                        spinning={loading.effects['study_history/getReportList']} 
                        wrapperClassName={styles.spin_report} 
                        tip="加载报告中..."
                    >
                        <div className={styles.report_content}>
                            {
                                this.renderReportList()
                            }
                        </div>  
                    </Spin>
                    :
                    <Spin 
                        delay={500}
                        spinning={loading.effects['study_history/getUnfinishList']} 
                        wrapperClassName={styles.spin_unfinish} 
                        tip="加载未完成练习中..."
                    >
                        <div className={styles.report_content}>
                            {
                                this.renderUnfinishList()
                            }  
                        </div>
                    </Spin>
                }
                <div className={styles.more}>浏览更多&nbsp;></div>
            </div>
        )
  }
}

function mapStateToProps({ study_history, loading }) {
    return {...study_history, loading};
}

export default connect(mapStateToProps)(History);