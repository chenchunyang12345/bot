import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';

import { Divider, Button, Spin } from 'antd';
import { ChooseCustom, ChooseScene, ChooseLevel } from '../../../components/study';

// 二次包装分割线组件
const MyDivider = (props) => {
    let { content } = props;
    return (
        <div style={{ width: '264px', margin: '0 auto' }}>
            <Divider className={styles.divider}>{content}</Divider>
        </div>
    )
}

class Customize extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        console.log(this.props.loading.effects)
        let { loading } = this.props;
        return (
            <div>
                <div className={styles.header}>
                    <a href="">返回</a>
                </div>
                <div className={styles.content}>
                    <MyDivider content={'第一步，选择客户'}></MyDivider>
                    <Spin tip="Loading..." spinning={false}>
                        <ChooseCustom></ChooseCustom>
                    </Spin>
                    <MyDivider content={'第二步，选择场景'}></MyDivider>
                    <Spin tip="Loading..." spinning={loading.effects['study_customize/getSceneList'] || loading.effects['study_customize/getSceneTypes']}>
                        <ChooseScene></ChooseScene>
                    </Spin>
                    <MyDivider content={'第三步，选择难度'}></MyDivider>
                    <ChooseLevel></ChooseLevel>
                    <div style={{textAlign: 'center', marginTop: '25px'}}>
                        <Button type={'primary'}>开始培训</Button>
                    </div>
                </div>
            </div>
        )
  }
}

function mapStateToProps({ study_customize, loading }) {
    return {...study_customize, loading};
}

export default connect(mapStateToProps)(Customize);