import services from '../services/services';
import { message } from 'antd';

export default {
    namespace: 'login',
    state: {

    },
    reducers: {

    },
    effects: {
        // 登录
        *login({ payload, resolve, reject }, { call }) {
            const res = yield call(services.login_page['login'], { payload });
            if(res.err) {
                reject(res.err);
            } else {
                resolve(res);
            }
        },
        // 注册验证用户名是否重复
        *checkUsername({ payload, resolve, reject }, { call }) {
            const res = yield call(services.regist_page['checkUsername'], { payload });
            if(res.err) {
                reject();
            } else {
              resolve(res)  
            }
        }
    },
    subscriptions: {
        setup({ dispatch, history }) {
            
        }
    }
}