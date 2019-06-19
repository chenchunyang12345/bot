import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';

import { Pagination, Select, Button, Icon } from 'antd';

import MySearch from '../../common/MySearch';
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
            this.props.dispatch({ type: 'study_customer/initial' });
            this.props.dispatch({ type: 'study_customer/setSearchName', payload: '' });
            this.props.dispatch({ type: 'study_customer/setChooseId', payload: -1 });
            this.props.dispatch({ type: 'study_customer/setNameReg', payload: true });
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
        let { customers_list, loading } = this.props;
        // 判断loading是防止最开始就会出现'未搜索到结果'
        if(customers_list.length === 0 && !loading.effects['study_customize/getCustomers']) {
            return <div className={styles.tips}>未搜索到结果</div>;
        }else {
            return customers_list.map((customer, idx) => {
                return <CustomCard 
                            key={idx}
                            detail={customer}
                            num={idx + 1}
                        />
            })
        }
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

    handleSearch(value) {
        let { search_name } = this.state;
        let { customers_type } = this.props;
        this.props.dispatch({
            type: 'study_customize/getCustomers',
            payload: {
                username: value === '' ? '' : search_name,
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
                            placeholder="姓名"
                            value={search_name}
                            onChange={e => {
                                this.setState({search_name: e.target.value});
                                if(e.target.value === '') {
                                    this.handleSearch('');
                                }
                            }}
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
                        >
                            新建客户<Icon type="plus" />
                        </Button>
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

function mapStateToProps({study_customize, loading}) {
    return { ...study_customize, loading };
}

export default connect(mapStateToProps)(ChooseCustom);