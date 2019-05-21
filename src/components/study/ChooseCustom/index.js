import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';

import { Pagination, Select, Button } from 'antd';

import MySearch from '../../common/mySearch';
import CustomCard from './CustomCard';
import NewCustomer from '../NewCustomer';
import RealCustomer from '../RealCustomer';

const Option = Select.Option;

class ChooseCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible_new: false,
            visible_real: false,
            search_name: '',
        }
        this.closeModal = this.closeModal.bind(this);
        this.jumpImport = this.jumpImport.bind(this);
        this.jumpReal = this.jumpReal.bind(this);
    }

    // 关闭modal框的方法
    closeModal() {
        this.setState({
            visible_new: false,
            visible_real: false,
        })
        // 设置定时器是避免关闭动画还没结束，表单里面的数据就清空了
        setTimeout(() => {
            this.props.dispatch({
                type: 'study_customer/initial',
            });
        }, 500);
    }

    // 导入方法
    jumpImport() {
        this.setState({
            visible_new: true,
            visible_real: false,
        })
    }

    // 新建客户跳到真实客户
    jumpReal() {
        this.setState({
            visible_new: false,
            visible_real: true,
        })
        this.props.dispatch({
            type: 'study_customer/getRealCustomers',
        })
    }

    // 渲染卡片
    renderCard() {
        let { customers_list } = this.props;
        return customers_list.map((customer, idx) => {
            return <CustomCard 
                        key={idx}
                        detail={customer}
                        num={idx + 1}
                    />
        })
    }

    // 改变页码
    changePage(page) {
        let { customers_searchname, customers_type } = this.props;
        this.props.dispatch({
            type: 'study_customize/getCustomers',
            payload: {
                username: customers_searchname,
                type: customers_type,
            },
            pagination: {
                current: page,
                pageSize: 8,
            }
        })
    }

    // 搜索客户类型
    searchType(value) {
        let { customers_searchname } = this.props;
        this.props.dispatch({
            type: 'study_customize/getCustomers',
            payload: {
                username: customers_searchname,
                type: value,
            },
            pagination: {
                current: 1,
                pageSize: 8,
            }
        })
    }

    handleSearch() {
        let { search_name } = this.state;
        let { customers_type } = this.props;
        this.props.dispatch({
            type: 'study_customize/getCustomers',
            payload: {
                username: search_name,
                type: customers_type,
            },
            pagination: {
                current: 1,
                pageSize: 8,
            }
        })
    }

    render() {
        let { visible_new, visible_real, search_name } = this.state;
        let { customers_total, customers_current, customers_size } = this.props;
        return (
            <div>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <Select
                            defaultValue="-1" 
                            onChange={value => this.searchType(value)}
                            style={{ width: 120, marginLeft: '14px', marginRight: '11px'}}
                        >
                            <Option value="-1">全部客户</Option>
                            <Option value="0">真实客户</Option>
                            <Option value="1">虚拟客户</Option>
                        </Select>
                        <MySearch 
                            placeholder="标题／作者／摘要"
                            value={search_name} 
                            onChange={e => this.setState({search_name: e.target.value})}
                            onKeyDown={e => {
                                if(e.keyCode === 13) {
                                    e.preventDefault();
                                    this.handleSearch()
                                }
                            }}
                            handleSearch={() => this.handleSearch()}
                        />
                        <Button
                            style={{width: '120px', fontSize: '12px', marginLeft: '20px'}} 
                            type={'primary'}
                            onClick={() => this.setState({visible_new: true})}
                        >新建客户&nbsp;&nbsp;➕</Button>
                        {/* 新建客户的信息modal框 */}
                        <NewCustomer 
                            visible={visible_new} 
                            closeModal={this.closeModal}
                            jumpReal={this.jumpReal}
                        ></NewCustomer>
                        {/* 真实客户的信息modal框 */}
                        <RealCustomer 
                            visible={visible_real} 
                            closeModal={this.closeModal}
                            jumpImport={this.jumpImport}
                        ></RealCustomer>
                    </div>
                    <div className={styles.detail}>
                        {
                            this.renderCard()
                        }
                    </div>
                </div>
                <div className={styles.change_page}>
                    <Pagination 
                        current={customers_current}
                        pageSize={customers_size}
                        total={customers_total}
                        onChange={page => this.changePage(page)}
                    />
                </div>
            </div>
        )
  }
}

function mapStateToProps({study_customize}) {
    return {...study_customize};
}

export default connect(mapStateToProps)(ChooseCustom);