import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';
import router from 'umi/router';

import { Divider, Button, Spin, message } from 'antd';
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

    handleStart() {
        let { customers_id, scene_id, level } = this.props;
        if(customers_id === -1) {
            message.warn('请选择一个客户', 2);
            return;
        }
        if(scene_id === -1) {
            message.warn('请选择一个场景', 2);
            return;
        }
        new Promise(( resolve ) => {
            this.props.dispatch({
                type: 'study_customize/createCustomize',
                payload: {
                    customerId: customers_id,
                    scenesId: scene_id,
                    level: level,
                },
                resolve,
            })
        }).then((id) => {
            router.push(`/study/dm?id=${id}`);
        })
    }

    render() {
        let { loading } = this.props;
        return (
            <div>
                <div className={styles.header}>
                    <a href="#/study">返回</a>
                </div>
                <div className={styles.content}>
                    <MyDivider content={'第一步，选择客户'}></MyDivider>
                    <Spin 
                        delay={500}
                        tip="Loading..." 
                        spinning={loading.effects['study_customize/getCustomers']}
                    >
                        <ChooseCustom></ChooseCustom>
                    </Spin>
                    <MyDivider content={'第二步，选择场景'}></MyDivider>
                    <Spin 
                        delay={500}
                        tip="Loading..." 
                        spinning={loading.effects['study_customize/getSceneList'] || loading.effects['study_customize/getSceneTypes']}
                    >
                        <ChooseScene></ChooseScene>
                    </Spin>
                    <MyDivider content={'第三步，选择难度'}></MyDivider>
                    <ChooseLevel></ChooseLevel>
                    <div style={{textAlign: 'center', marginTop: '25px', marginBottom: '100px'}}>
                        <Button 
                            type={'primary'} 
                            loading={loading.effects['study_customize/createCustomize']}
                            onClick={() => this.handleStart()}
                        >开始培训</Button>
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