import React, { Component } from 'react';
import styles from './index.less';

import { Tabs } from 'antd';

const TabPane = Tabs.TabPane;

class TabsDetail extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={styles.container}>
                <Tabs defaultActiveKey="1">
                    <TabPane tab="优缺点" key="1">
                        <div className={styles.good}>优点</div>
                        <div className={styles.good_text}>使用利他原因处理异议，很有技巧性</div>
                        <div className={styles.bad}>缺点</div>
                        <div className={styles.bad_text}>进程推进太快， 还没成功接洽就约见面和确定地点</div>
                    </TabPane>
                    <TabPane tab="参考话术" key="2">泰康尊享世家终身寿险【团险】的生存保险金的领取方式变更为：A、保单有效且未发生保险事故，可申请变更保单的身故保险金领取方式，身故保险金领取方式包含一次性领取、分期领取至身故保险金领取完、分期领取至约定年龄和约定年龄开始分期领取四种，默认为一次性领取。</TabPane>
                </Tabs>
            </div>
        )
  }
}

export default TabsDetail;