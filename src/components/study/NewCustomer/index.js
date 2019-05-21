import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';

import { Modal, Button, Input, InputNumber, Select } from 'antd';

const Option = Select.Option;

class NewCustomer extends Component {
    constructor(props) {
        super(props);
        this.state = {
            loading: false,
        }
    }

    // 选择后改变model里面的数据
    // 1、名字
    changeName(e) {
        this.props.dispatch({
            type: 'study_customer/setName',
            payload: e.target.value,
        })
    }
    // 2、性别
    changeSex(sex) {
        this.props.dispatch({
            type: 'study_customer/setSex',
            payload: sex,
        })
    }
    // 3、年龄
    changeAge(age) {
        this.props.dispatch({
            type: 'study_customer/setAge',
            payload: age,
        })
    }
    // 4、职业
    changeJob(job) {
        this.props.dispatch({
            type: 'study_customer/setJob',
            payload: job,
        })
    }
    // 5、家庭情况
    changeMarried(married) {
        this.props.dispatch({
            type: 'study_customer/setMarried',
            payload: married,
        })
        // 通过结没结婚设置默认的孩子个数
        this.props.dispatch({
            type: 'study_customer/setChildren',
            payload: married === 2 ? 0 : married,
        })
    }
    // 6、孩子个数
    changeChildren(children) {
        this.props.dispatch({
            type: 'study_customer/setChildren',
            payload: children,
        })
    }
    // 7、健康状况
    changeHealth(health) {
        this.props.dispatch({
            type: 'study_customer/setHealth',
            payload: health,
        })
    }
    // 8、经济状况
    changeIncome(income) {
        this.props.dispatch({
            type: 'study_customer/setIncome',
            payload: income,
        })
    }
    // 9、保险需求
    changeNeed(need) {
        this.props.dispatch({
            type: 'study_customer/setNeed',
            payload: need,
        })
    }
    // 10、预算
    changePlan(plan) {
        this.props.dispatch({
            type: 'study_customer/setPlan',
            payload: plan,
        })
    }
    // 11、状态进程
    changeProcess(process) {
        this.props.dispatch({
            type: 'study_customer/setProcess',
            payload: process,
        })
    }
    // 12、认同感
    changeAgree(agree) {
        this.props.dispatch({
            type: 'study_customer/setAgree',
            payload: agree,
        })
    }
    // 13、性格
    changeCharacter(character) {
        this.props.dispatch({
            type: 'study_customer/setCharacter',
            payload: character,
        })
    }

    render() {
        let { loading } = this.state;
        // 父组件传来的props
        let { visible, closeModal, jumpReal } = this.props;
        // model里面的props
        let { name, sex, age, job, married, children, health, income, need, plan, process, agree, character } = this.props;
        // 设置保存请求参数
        let payload = {
            username: name,
            gender: sex,
            age: age,
            profession: job,
            maritalStatus: married,
            familyMembers: 3,
            children: children,
            income: income,
            cost: 0,
            budget: plan,
            identity: agree,
            status: process,
            remarks: need,
            disposition: character,
            type: 1,
            img: '',
        }
        return (
            <Modal
                wrapClassName='new_customer'
                closable={false}
                visible={visible}
                width={740}
                footer={null}
            >
                {/* 右上关闭 */}
                <div className={styles.close} onClick={() => closeModal()}></div>
                {/* 标题 */}
                <div className={styles.title}>新建客户</div>
                {/* 表单详情 */}
                <div className={styles.group_item1}>
                    <span>*</span>
                    <span>姓名：</span>
                    <Input style={{width: '360px'}} value={name} onChange={e => this.changeName(e)}></Input>
                </div>
                <div className={styles.group_item2}>
                    <span>性别：</span>
                    <div onClick={() => this.changeSex('MALE')}>
                        <span className={sex === 'MALE' ? styles.choose : styles.nochoose}></span>
                        <span className={styles.sex_text}>男</span>
                    </div>
                    <div onClick={() => this.changeSex('FEMALE')}>
                        <span className={sex === 'FEMALE' ? styles.choose : styles.nochoose}></span>
                        <span className={styles.sex_text}>女</span>
                    </div>
                </div>
                <div className={styles.group_item3}>
                    <span>年龄：</span>
                    <InputNumber style={{width: '360px'}} value={age} min={16} max={81} onChange={value => this.changeAge(value)} ></InputNumber>
                </div>
                <div className={styles.group_item4}>
                    <span>职业：</span>
                    <Select style={{width: '360px'}} value={job} onSelect={value => this.changeJob(value)}>
                        <Option value="家庭主妇">家庭主妇</Option>
                        <Option value="公司白领">公司白领</Option>
                        <Option value="个体户">个体户</Option>
                    </Select>
                </div>
                <div className={styles.group_item5}>
                    <span>家庭情况：</span>
                    <Select style={{width: '140px'}} value={married} onSelect={value => this.changeMarried(value)}>
                        <Option value={0}>未婚</Option>
                        <Option value={1}>已婚</Option>
                        <Option value={2}>离异</Option>
                    </Select>
                    <span style={{marginLeft: '10px', marginRight: '5px'}}>有：</span>
                    <Select style={{width: '140px'}} value={children} onSelect={value => this.changeChildren(value)}>
                        <Option value={0}>0</Option>
                        <Option value={1}>1</Option>
                        <Option value={2}>2</Option>
                        <Option value={3}>3</Option>
                        <Option value={4}>4</Option>
                        <Option value={5}>5</Option>
                    </Select>
                    <span style={{marginLeft: '5px'}}>个孩子</span>
                </div>
                <div className={styles.group_item6}>
                    <span>健康状况：</span>
                    <Input style={{width: '140px'}} value={health} onChange={e => this.changeHealth(e.target.value)}></Input>
                    <span style={{marginLeft: '10px'}}>收入：</span>
                    <InputNumber style={{width: '174px'}} value={income} onChange={value => this.changeIncome(value)}></InputNumber>
                </div>
                <div className={styles.tips}>提示：如有疾病请直接填写疾病名称</div>
                <div className={styles.group_item7}>
                    <span style={{width: '60px'}}>保险需求：</span>
                    <Input style={{width: '360px'}} value={need} onChange={e => this.changeNeed(e.target.value)}></Input>
                </div>
                <div className={styles.group_item8}>
                    <span>预算：</span>
                    <InputNumber style={{width: '340px'}} value={plan} onChange={value => this.changePlan(value)}></InputNumber>
                    <span style={{marginLeft: '10px'}}>元</span>
                </div>
                <div className={styles.group_item9}>
                    <span>*</span>
                    <span>状态：</span>
                    <Select style={{width: '110px'}} value={process} onSelect={value => this.changeProcess(value)}>
                        <Option value={0}>邀约前</Option>
                        <Option value={1}>首次面谈前</Option>
                        <Option value={2}>二次面谈前</Option>
                    </Select>
                    <span style={{marginLeft: '10px', marginRight: '5px'}}>对保险的认同感：</span>
                    <Select style={{width: '140px'}} value={agree} onSelect={value => this.changeAgree(value)}>
                        <Option value="LOW">低</Option>
                        <Option value="MID">中</Option>
                        <Option value="HIGH">高</Option>
                    </Select>
                </div>
                <div className={styles.group_item10}>
                    <span>性格：</span>
                    <Select style={{width: '360px'}} value={character} onSelect={value => this.changeCharacter(value)}>
                        <Option value="严肃高冷">严肃高冷</Option>
                        <Option value="温和内敛">温和内敛</Option>
                        <Option value="热情开朗">热情开朗</Option>
                    </Select>
                </div>
                {/* 底部按钮 */}
                <Button className={styles.btn1} type={'primary'} onClick={() => jumpReal()}>来自真实客户</Button>
                <Button 
                    className={styles.btn2} 
                    loading={loading}
                    onClick={() => {
                        this.setState({ loading: true })
                        new Promise((resolve) => {
                            this.props.dispatch({type: 'study_customer/createCustomer', payload, resolve,});
                        }).then(() => {
                            this.setState({ loading: false });
                            closeModal();
                            this.props.dispatch({
                                type: 'study_customize/getCustomers',
                                payload: {
                                    username: '',
                                    type: -1,
                                },
                                pagination: {
                                    current: 1,
                                    pageSize: 8,
                                }
                            })
                        })
                    }}
                >保存</Button>
            </Modal>
        )
  }
}

function mapStateToProps({ study_customer }) {
    return { ...study_customer };
}

export default connect(mapStateToProps)(NewCustomer);
