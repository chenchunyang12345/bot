import React, { Component } from 'react';
import styles from './index.less';

import MySearch from '../../../common/mySearch';
import ContactList from './ContactList';

class SearchList extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div>
                <div className={styles.search}>
                    <MySearch placeholder="姓名"></MySearch>
                </div>
                <div className={styles.list}>
                    <ContactList></ContactList>
                </div>
            </div>
        )
  }
}

export default SearchList;