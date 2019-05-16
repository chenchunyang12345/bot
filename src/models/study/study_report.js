import services from '../../services/services';
import { message } from 'antd';

export default {
    namespace: 'study_report',
    state: {
        report_detail: null,
    },
    reducers: {
        setReportDetail(state, { payload: report_detail }) {
            return {...state, report_detail};
        }
    },
    effects: {
        *getReport({ id } , { call, put }) {
            const res = yield call(services.study_report['getReport'], { id });
            if(res.err) {
                message.error('获取报告数据失败', 2);
            } else {
                yield put({ type: 'setReportDetail', payload: res.data.msg })
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            history.listen(location => {
                if(location.pathname === '/study/report') {
                    dispatch({
                        type: 'getReport',
                        id: location.query.id,
                    })
                }
            })
        }
    }
}