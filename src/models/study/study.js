import services from '../../services/services';

export default {
    namespace: 'study',
    state: {
        aaa: 1212
    },
    reducers: {

    },
    effects: {
        *deleteCard({ serviceName, id, resolve, reject }, { call }) {
            const res = yield call(services.study[serviceName], { id });
            if(res.err) {
                reject('删除卡片失败');
            }else {
                resolve(res);
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            
        }
    }
}