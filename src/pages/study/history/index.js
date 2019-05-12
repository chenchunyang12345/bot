import React, { Component } from 'react';
import styles from './index.less';

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

    render() {
        let { choose } = this.state;
        return (
            <div>
                <div className={styles.back}>
                    <a href="">返回</a>
                </div>
                <div className={styles.tabs_nav}>
                    <div className={classnames({
                        [styles.report]: true,
                        [styles.choose]: choose === 1 ? true : false
                    })} onClick={() => this.setState({choose: 1})}>我的报告(8)</div>
                    <div className={classnames({
                        [styles.unfinish]: true,
                        [styles.choose]: choose === 2 ? true : false
                    })} onClick={() => this.setState({choose: 2})}>未完成(2)</div>
                </div>
                {/* 渲染不同的内容 */}
                {
                    choose === 1 ? 
                    <div className={styles.report_content}>
                        <ReportCard num={1}></ReportCard>
                        <ReportCard num={2}></ReportCard>
                        <ReportCard num={3}></ReportCard>
                        <ReportCard num={4}></ReportCard>
                        <ReportCard num={5}></ReportCard>
                        <ReportCard num={6}></ReportCard>
                        <ReportCard num={7}></ReportCard>
                    </div>  :
                    <div className={styles.report_content}>
                        <UnfinishCard num={1}></UnfinishCard>
                        <UnfinishCard num={2}></UnfinishCard>
                        <UnfinishCard num={3}></UnfinishCard>
                        <UnfinishCard num={4}></UnfinishCard>
                        <UnfinishCard num={5}></UnfinishCard>
                        <UnfinishCard num={6}></UnfinishCard>
                        <UnfinishCard num={7}></UnfinishCard>
                    </div>
                }
                <div className={styles.more}>浏览更多&nbsp;></div>
            </div>
        )
  }
}

export default History;