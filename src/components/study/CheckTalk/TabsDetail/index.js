import React, { Component } from 'react';
import styles from './index.less';

import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class TabsDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { detail } = this.props;
        return (
            <div className={styles.container}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="优缺点" key="1">
                        <div className={styles.good}>优点</div>
                        {
                            detail.advantages && detail.advantages.map((advantage, idx) => {
                                return <div key={idx} className={styles.good_text}>{advantage}</div>
                            })
                        }
                        <div className={styles.bad}>缺点</div>
                        {
                            detail.disadvantages && detail.disadvantages.map((disadvantage, idx) => {
                                return <div key={idx} className={styles.bad_text}>{disadvantage}</div>
                            })
                        }
                    </TabPane>
                    <TabPane tab="参考话术" key="2" style={{lineHeight: '21px'}}>{detail.recommendWords}</TabPane>
                </Tabs>
            </div>
        )
  }
}

export default TabsDetail;