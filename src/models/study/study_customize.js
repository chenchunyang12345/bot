import services from '../../services/services';
import { message } from 'antd';

export default {
    namespace: 'study_customize',
    state: {
        // 选择场景相关
        scene_type: [],
        scene_current: 1,
        scene_size: 4,
        scene_total: 0,
        scene_list: [{id:1, name: '1212', task: '12121212121'}],
    },
    reducers: {
        setSceneType(state, { payload: scene_type }) {
            return {...state, scene_type};
        },
        setSceneTotal(state, { payload: scene_total }) {
            return {...state, scene_total};
        }
    },
    effects: {
        *getCustomers({ serviceName, payload, pagination, resolve, reject }, { call }) {
            const res = yield call(services.study_customize[serviceName], { payload, pagination });
            if(res.err) {
                reject('获取虚拟客户列表失败');
            } else {
                resolve(res);
            }
        },
        *getRealCustomers({ serviceName, resolve, reject }, { call }) {
            const res = yield call(services.study_customize[serviceName]);
            if(res.err) {
                reject('获取真实客户信息失败');
            } else {
                resolve(res);
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
            }
        },
        *createCustomer({ serviceName, payload, resolve, reject }, { call }) {
            const res = yield call(services.study_customize[serviceName], { payload });
            if(res.err) {
                reject('新建客户失败');
            } else {
                resolve(res);
            }
        },
        *deleteCustomer({ serviceName, id, resolve, reject }, { call }) {
            const res = yield call(services.study_customize[serviceName], { id });
            if(res.err) {
                reject('删除虚拟客户失败');
            } else {
                resolve(res);
            }
        },
        *createCustomize({ serviceName, payload, resolve, reject }, { call }) {
            const res = yield call(services.study_customize[serviceName], { payload });
            if(res.err) {
                reject('创建自定义练习失败');
            } else {
                resolve(res);
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if(location.pathname === '/study/customize') {
                    dispatch({
                        type: 'getSceneTypes',
                    })
                }
            })
        }
    }
}