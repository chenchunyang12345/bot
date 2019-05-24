import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';

import { Spin } from 'antd';

class ContactList extends Component {
    constructor(props) {
        super(props);
    }

    renderList() {
        let { render_list, choose_id, loading } = this.props;
        if(render_list.length === 0 && !loading.effects['study_customer/getRealCustomers']) {
            return <div className={styles.tips}>未搜索到结果</div>
        }else {
            return render_list.map((item, idx) => {
                return (
                    <div key={idx} className={styles.row}>
                        <div className={styles.head_img}></div>
                        <div className={styles.name}>{item.username}</div>
                        <div 
                            className={item.id === choose_id ? styles.choose : styles.no_choose}
                            onClick={() => this.props.dispatch({type: 'study_customer/setChooseId', payload: item.id})}
                        ></div>
                    </div>
                )
            })
        }
    }

    render() {
        let { loading } = this.props;
        return (
            <Spin delay={500} tip='加载中...' spinning={loading.effects['study_customer/getRealCustomers']}>
                <div className={styles.container}>
                    {
                        this.renderList()
                    }
                </div>
            </Spin>
        )
  }
}

function mapStateToProps({ study_customer, loading }) {
    return { ...study_customer, loading };
}

export default connect(mapStateToProps)(ContactList);