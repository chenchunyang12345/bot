import services from '../../services/services';
import { message } from 'antd';

// 初始化表单的信息
const initialForm = {
    name: '',
    sex: 'MALE',
    age: 30,
    job: '公司白领',
    married: 0,
    children: 0,
    health: '健康',
    income: '10万',
    cost: '5万以下',
    need: '',
    plan: 0,
    process: 0,
    agree: 'HIGH',
    character: '温和内敛',
}

export default {
    namespace: 'study_customer',
    state: {
        ...initialForm,
        // 真实客户信息
        real_list: [],
        render_list: [],
        choose_id: -1,
        search_name: '',
        display_detail: null,
    },
    reducers: {
        // 设置值的
        setName(state, { payload: name }) {
            return { ...state, name };
        },
        setSex(state, { payload: sex }) {
            return { ...state, sex };
        },
        setAge(state, { payload: age }) {
            return { ...state, age };
        },
        setJob(state, { payload: job }) {
            return { ...state, job };
        },
        setMarried(state, { payload: married }) {
            return { ...state, married };
        },
        setChildren(state, { payload: children }) {
            return { ...state, children };
        },
        setHealth(state, { payload: health }) {
            return { ...state, health };
        },
        setIncome(state, { payload: income }) {
            return { ...state, income };
        },
        setNeed(state, { payload: need }) {
            return { ...state, need };
        },
        setPlan(state, { payload: plan }) {
            return { ...state, plan };
        },
        setAgree(state, { payload: agree }) {
            return { ...state, agree };
        },
        setProcess(state, { payload: process }) {
            return { ...state, process };
        },
        setCharacter(state, { payload: character }) {
            return { ...state, character };
        },
        setCost(state, { payload: cost }) {
            return { ...state, cost };
        },
        // 设置真实客户信息
        setRealList(state, { payload: real_list }) {
            return { ...state, real_list };
        },
        setRenderList(state, { payload: render_list }) {
            return { ...state, render_list };
        },
        setChooseId(state, { payload: choose_id }) {
            let display_detail = state.real_list.filter(item => item.id === choose_id)[0];
            return { ...state, choose_id, display_detail };
        },
        setSearchName(state, { payload: search_name }) {
            return { ...state, search_name };
        },
        filterSearchName(state, { payload }) {
            let newRenderList = state.real_list.filter(item => item.username.indexOf(payload) !== -1);
            return { ...state, render_list: newRenderList };
        },
        // 导入信息
        importInfo(state, { payload }) {
            return { ...state, ...payload };
        },
        // 初始化新建的表单信息
        initial(state) {
            return { ...state, ...initialForm };
        }
    },
    effects: {
        *getRealCustomers({}, { call, put }) {
            const res = yield call(services.study_customer['getRealCustomers']);
            if(res.err) {
                message.error('获取真实客户信息失败', 2);
            } else {
                yield put({ type: 'setRealList', payload: res.data.msg });
                yield put({ type: 'setRenderList', payload: res.data.msg });
            }
        },
        *createCustomer({ payload, resolve }, { call }) {
            const res = yield call(services.study_customize['createCustomer'], { payload });
            if(res.err) {
                message.error('新建客户失败');
            } else {
                resolve();
            }
        },
    },
    subscriptions: {
        setup({ dispatch, history }) {
            
        }
    }
}