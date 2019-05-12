import React, { Component } from 'react';
import { Pagination, Select, Button } from 'antd';

import styles from './index.less';

import MySearch from '../../common/mySearch';
import CustomCard from './CustomCard';
import NewCustomer from '../NewCustomer';
import RealCustomer from '../RealCustomer';

const Option = Select.Option;

class ChooseCustom extends Component {
    constructor(props) {
        super(props);
        this.state = {
            visible: false,
        }
    }

    render() {
        let { visible } = this.state;
        return (
            <div>
                <div className={styles.content}>
                    <div className={styles.top}>
                        <Select defaultValue="全部客户" style={{ width: 120, marginLeft: '14px', marginRight: '11px'}}>
                            <Option value="全部客户">全部客户</Option>
                            <Option value="真实客户">真实客户</Option>
                            <Option value="虚拟客户">虚拟客户</Option>
                        </Select>
                        <MySearch placeholder="标题／作者／摘要"></MySearch>
                        <Button
                            style={{width: '120px', fontSize: '12px', marginLeft: '20px'}} 
                            type={'primary'} 
                            onClick={() => this.setState({
                                visible: true,
                            })}
                        >新建客户&nbsp;&nbsp;➕</Button>
                        {/* 新建客户的信息modal框 */}
                        <NewCustomer visible={visible}></NewCustomer>
                        {/* 真实客户的信息modal框 */}
                        <RealCustomer></RealCustomer>
                    </div>
                    <div className={styles.detail}>
                        <CustomCard></CustomCard>
                        <CustomCard></CustomCard>
                        <CustomCard></CustomCard>
                        <CustomCard></CustomCard>
                        <CustomCard></CustomCard>
                        <CustomCard></CustomCard>
                        <CustomCard></CustomCard>
                    </div>
                </div>
                <div className={styles.change_page}>
                    <Pagination></Pagination>
                </div>
            </div>
        )
  }
}

export default ChooseCustom;