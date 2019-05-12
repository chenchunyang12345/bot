import React, { Component } from 'react';
import { Modal, Button, Input, InputNumber, Select } from 'antd';

import styles from './index.less';

class NewCustomer extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { visible } = this.props;
        return (
            <Modal
                wrapClassName='new_customer'
                closable={false}
                visible={visible}
                width={740}
                footer={null}
            >
                {/* 右上关闭 */}
                <div className={styles.close}></div>
                {/* 标题 */}
                <div className={styles.title}>新建客户</div>
                {/* 表单详情 */}
                <div className={styles.group_item1}>
                    <span>*</span>
                    <span>姓名：</span>
                    <Input style={{width: '360px'}}></Input>
                </div>
                <div className={styles.group_item2}>
                    <span>性别：</span>
                    <span>男</span>
                    <span>女</span>
                </div>
                <div className={styles.group_item3}>
                    <span>年龄：</span>
                    <InputNumber></InputNumber>
                </div>
                <div className={styles.group_item4}>
                    <span>职业：</span>
                    <Select></Select>
                </div>
                <div className={styles.group_item5}>
                    <span>家庭情况：</span>
                    <Select></Select>
                    <span>有：</span>
                    <Select></Select>
                    <span>个孩子</span>
                </div>
                <div className={styles.group_item6}>
                    <span>健康状况：</span>
                    <Select></Select>
                    <span>经济状况：</span>
                    <Select></Select>
                </div>
                <div className={styles.group_item7}>
                    <span>保险需求：</span>
                    <Input></Input>
                </div>
                <div className={styles.group_item8}>
                    <span>预算：</span>
                    <InputNumber></InputNumber>
                    <span>元</span>
                </div>
                <div className={styles.group_item9}>
                    <span>*</span>
                    <span>状态：</span>
                    <Select></Select>
                    <span>对保险的认同感</span>
                    <Select></Select>
                </div>
                <div className={styles.group_item10}>
                    <span>性格：</span>
                    <Select></Select>
                </div>
                {/* 底部按钮 */}
                <Button className={styles.btn1} type={'primary'}>来自真实客户</Button>
                <Button className={styles.btn2}>保存</Button>
            </Modal>
        )
  }
}

export default NewCustomer;
