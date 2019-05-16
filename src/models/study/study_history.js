import services from '../../services/services';
import { message } from 'antd';

export default {
    namespace: 'study_history',
    state: {
        // 报告列表
        reportList: [
            // {
            //     id: 1,
            //     createTime: "2019-05-10 11:53:47",
	        //     score: 80,
            // },
            // {
            //     id: 2,
            //     createTime: "2019-05-10 11:53:47",
	        //     score: 80,
            // }
        ],
        // 未完成列表
        unfinishList: [
            // {
            //     id: 1,
            //     createTime: "2019-05-10 16:24:49",
            // },
            // {
            //     id: 2,
            //     createTime: "2019-05-10 16:24:49",
            // },
            // {
            //     id: 3,
            //     createTime: "2019-05-10 16:24:49",
            // }
        ]
    },
    reducers: {
        updateReportList(state, { payload: reportList }) {
            return {...state, reportList};
        },
        updateUnfinishList(state, { payload: unfinishList }) {
            return {...state, unfinishList};
        },
    },
    effects: {
        *getReportList({ id }, { call, put }) {
            const res = yield call(services.study_history['getReportList'], { id });
            if(res.err) {
                message.error('获取报告列表失败', 2);
            }else {
                let newList = [];
                res.data.msg.forEach(item => {
                    newList.push({
                        id: item.id,
                        createTime: item.createTime,
                        score: item.score,
                    })
                })
                yield put({type: 'updateReportList', payload: newList});
            }
        },
        *getUnfinishList({ id, pagination }, { call, put }) {
            const res = yield call(services.study_history['getUnfinishList'], { id, pagination });
            if(res.err) {
                message.error('获取未完成列表失败', 2);
            }else {
                let newList = [];
                res.data.msg.forEach(item => {
                    newList.push({
                        id: item.id,
                        createTime: item.createTime,
                    })
                })
                yield put({type: 'updateUnfinishList', payload: newList});
            }
        },
        *deleteReport({ serviceName, id, resolve, reject }, { call, put, select }) {
            const res = yield call(services.study_history[serviceName], { id });
            if(res.err) {
                reject('删除报告失败');
            }else {
                resolve(res.data);
                // 前端数据中删除该id项
                const reportList = yield select(state => state.study_history.reportList);
                let newList = reportList.filter(report => report.id !== id);
                yield put({type: 'updateReportList', payload: newList});
            }
        },
        *deleteUnfinish({ serviceName, id, resolve, reject }, { call, put, select }) {
            const res = yield call(services.study_history[serviceName], { id });
            if(res.err) {
                reject('删除未完成训练失败');
            }else {
                resolve(res.data);
                // 前端数据中删除该id项
                const unfinishList = yield select(state => state.study_history.unfinishList);
                let newList = unfinishList.filter(unfinish => unfinish.id !== id);
                yield put({type: 'updateUnfinishList', payload: newList});
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            // 监听路由的变化
            history.listen((location) => {
                if(location.pathname === '/study/history') {
                    dispatch({
                        type: 'getReportList',
                        id: location.query.id,
                    });
                    dispatch({
                        type: 'getUnfinishList',
                        id: location.query.id,
                        pagination: {
                            current: 1,
                            pageSize: 999,
                        },
                    })
                }
            })
        }
    }
}