import services from '../../services/services';
import { message } from 'antd';

export default {
    namespace: 'study_customize',
    state: {
        // 选择场景相关
        scene_type: [],
        scene_chooseType: '',
        scene_current: 1,
        scene_size: 4,
        scene_total: 10,
        scene_list: [],
        // 选择客户相关
        customers_total: 0,
        customers_current: 1,
        customers_size: 8,
        customers_list: [],
        customers_searchname: '',
        customers_type: -1,
        // 选择id值和难度
        customers_id: -1,
        scene_id: -1,
        level: 1,
    },
    reducers: {
        setSceneType(state, { payload: scene_type }) {
            return { ...state, scene_type };
        },
        setSceneTotal(state, { payload: scene_total }) {
            return { ...state, scene_total };
        },
        setSceneCurrent(state, { payload: scene_current }) {
            return { ...state, scene_current };
        },
        setSceneList(state, { payload: scene_list }) {
            return { ...state, scene_list };
        },
        setCustomersTotal(state, { payload: customers_total }) {
            return { ...state, customers_total };
        },
        setCustomersCurrent(state, { payload: customers_current }) {
            return { ...state, customers_current };
        },
        setCustomersList(state, { payload: customers_list }) {
            return { ...state, customers_list };
        },
        setCustomersName(state, { payload: customers_searchname }) {
            return { ...state, customers_searchname };
        },
        setCustomersType(state, { payload: customers_type }) {
            return { ...state, customers_type };
        },
        deleteSomeCustomer(state, { payload: id }) {
            let newList = state.customers_list.filter(customer => customer.id !== id);
            return { ...state, customers_list: newList };
        },
        // 改变id
        setCustomersId(state, { payload: customers_id }) {
            return { ...state, customers_id };
        },
        setSceneId(state, { payload: scene_id }) {
            return { ...state, scene_id };
        },
        setLevel(state, { payload: level }) {
            return { ...state, level };
        }
    },
    effects: {
        *getCustomers({ payload, pagination }, { call, put }) {
            const res = yield call(services.study_customize['getCustomers'], { payload, pagination });
            const searchName = payload.username;
            const type = payload.type;
            if(res.err) {
                message.error('获取客户列表失败', 2);
            } else {
                yield put({ type: 'setCustomersTotal', payload: res.headers.count });
                yield put({ type: 'setCustomersList', payload: res.data.msg });
                yield put({ type: 'setCustomersCurrent', payload: pagination.current });
                yield put({ type: 'setCustomersName', payload: searchName });
                yield put({ type: 'setCustomersType', payload: type });
                // 重置选择id
                yield put({ type: 'setCustomersId', payload: -1 });
            }
        },
        *getSceneTypes({}, { call, put, select }) {
            const res = yield call(services.study_customize['getSceneTypes']);
            const { scene_current, scene_size } = yield select(state => state.study_customize);
            if(res.err) {
                message.error('获取场景类型失败', 2);
            } else {
                yield put({ type: 'setSceneType', payload: res.data.msg });
                yield put({ type: 'getSceneList', payload: { type: res.data.msg[0] }, pagination: { current: scene_current, pageSize: scene_size}});
            }
        },
        *getSceneList({ payload, pagination }, { call, put }) {
            const res = yield call(services.study_customize['getSceneList'], { payload, pagination });
            if(res.err) {
                message.error('获取场景列表失败', 2);
            } else {
                yield put({ type: 'setSceneTotal', payload: res.headers.count });
                yield put({ type: 'setSceneCurrent', payload: pagination.current });
                yield put({ type: 'setSceneList', payload: res.data.msg });
                // 重置
                yield put({ type: 'setSceneId', payload: -1 });
            }
        },
        *deleteCustomer({ id, resolve }, { call, put }) {
            const res = yield call(services.study_customize['deleteCustomer'], { id });
            if(res.err) {
                message.error('删除虚拟客户失败', 2);
            } else {
                resolve();
                yield put({ type: 'deleteSomeCustomer', payload: id });
                yield put({ type: 'setCustomersId', payload: -1 });
                yield put({ type: 'getCustomers', payload: { username: '', type: -1 }, pagination: { current: 1, pageSize: 8 }});
            }
        },
        *createCustomize({ payload, resolve }, { call }) {
            const res = yield call(services.study_customize['createCustomize'], { payload });
            if(res.err) {
                message.error('创建自定义练习失败', 2);
            } else {
                resolve(res.data.msg);
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if(location.pathname === '/study/customize') {
                    dispatch({
                        type: 'getCustomers',
                        payload: {
                            username: '',
                            type: -1,
                        },
                        pagination: {
                            current: 1,
                            pageSize: 8,
                        }
                    });
                    dispatch({
                        type: 'getSceneTypes',
                    });
                }
            })
        }
    }
}