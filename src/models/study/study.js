import services from '../../services/services';
import { message } from 'antd';

export default {
    namespace: 'study',
    state: {
        recommend_list: [],     // 推荐练习
        history_list: [],       // 温故知新
        history_current: 1,     // 温故知新-当前页码
        history_size: 5,        // 温故知新-每页个数
        history_total: 10,       // 温故知新-总个数
    },
    reducers: {
        setRecommendList(state, { payload: recommend_list }) {
            return {...state, recommend_list};
        },
        setHistoryList(state, { payload: history_list }) {
            return {...state, history_list};
        },
        setHistoryTotal(state, { payload: history_total }) {
            return {...state, history_total};
        },
        setHistoryCurrent(state, { payload: history_current }) {
            return {...state, history_current};
        }
    },
    effects: {
        *getRecommend({ pagination }, { call, put }) {
            const res = yield call(services.study['getRecommend'], { pagination });
            if(res.err) {
                message.error('获取推荐数据失败', 2);
            } else {
                yield put({ type: 'setRecommendList', payload: res.data.msg });
            }
        },
        *getHistory({ pagination }, { call, put }) {
            const res = yield call(services.study['getHistory'], { pagination });
            if(res.err) {
                message.error('获取温故知新数据失败', 2);
            } else {
                console.log(res)
                // yield put({ type: 'setHistoryList', payload: res.data.msg });
                // yield put({ type: 'setHistoryTotal', payload: res.header.total });
                yield put({ type: 'setHistoryCurrent', payload: pagination.current });
            }
        },
        *deleteCard({ id, resolve, reject }, { call }) {
            const res = yield call(services.study['deleteCard'], { id });
            if(res.err) {
                reject('删除卡片失败');
            }else {
                resolve(res);
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen( location => {
                if(location.pathname === '/study') {
                    dispatch({
                        type: 'getRecommend',
                        pagination: {
                            page: 3,
                            size: 12,
                        }
                    });
                    dispatch({
                        type: 'getHistory',
                        pagination: {
                            current: 1,
                            pageSize: 5,
                        }
                    })
                }
            })
        }
    }
}