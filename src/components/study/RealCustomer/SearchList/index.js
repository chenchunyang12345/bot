import React, { Component } from 'react';
import styles from './index.less';
import { connect } from 'dva';

import MySearch from '../../../common/mySearch';
import ContactList from './ContactList';

class SearchList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        let { search_name } = this.props;
        return (
            <div>
                <div className={styles.search}>
                    <MySearch 
                        placeholder="姓名" 
                        value={search_name} 
                        onChange={e => this.props.dispatch({type: 'study_customer/setSearchName', payload: e.target.value})} 
                        handleSearch={() => this.props.dispatch({type: 'study_customer/filterSearchName', payload: search_name})}
                        onKeyDown={e => {
                            if(e.keyCode === 13) {
                                e.preventDefault();
                                this.props.dispatch({type: 'study_customer/filterSearchName', payload: search_name})
                            }
                        }}
                    />
                </div>
                <div className={styles.list}>
                    <ContactList></ContactList>
                </div>
            </div>
        )
  }
}

function mapStateToProps({ study_customer }) {
    return { ...study_customer };
}

export default connect(mapStateToProps)(SearchList);