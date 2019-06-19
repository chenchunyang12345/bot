const { get, post, put, del, getDataAndTotal, getTest } = require('../utils/request').default;

export default {
    // 导航栏
    menu: {

    },
    // 学习菜单项相关
    study: {
        getRecommend: ({ pagination }) => 
            getDataAndTotal(`/task/card/recommend?page=${pagination.page}&size=${pagination.size}`, 'GET'),
        getHistory: ({ pagination }) =>
            getDataAndTotal(`/task/card/history?page=${pagination.current}&size=${pagination.pageSize}`, 'GET'),
        deleteCard: ({ id }) => del(`/task/card/delete/${id}`),
    },
    study_customize: {
        getCustomers: ({ payload, pagination }) =>
            getDataAndTotal(`/customer/search?page=${pagination.current}&size=${pagination.pageSize}`, 'POST', payload),
        getSceneTypes: () => get(`/scene/find/all/type`),
        getSceneList: ({ payload, pagination }) =>
            getDataAndTotal(`/scene/find/by/type?type=${payload.type}&page=${pagination.current}&size=${pagination.pageSize}`, 'GET'),
        createCustomer: ({ payload }) => put(`/customer/create`, payload),
        deleteCustomer: ({ id }) => del(`/customer/delete/${id}`),
        createCustomize: ({ payload }) => put(`/task/card/create`, payload),
    },
    study_history: {
        getReportList: ({ id }) => get(`/report/find/by/card/${id}`),
        getUnfinishList: ({ id, pagination }) => 
            getDataAndTotal(`/session/find/unfinished/by/card/${id}?page=${pagination.current}&size=${pagination.pageSize}`, 'GET'),
        deleteReport: ({ id }) => del(`/report/delete/${id}`),
        deleteUnfinish: ({ id }) => del(`/session/delete/${id}`),
    },
    study_report: {
        getReport: ({ id }) => get(`/report/detail/${id}`),
    },
    study_customer: {
        getRealCustomers: () => get(`/customer/real/customers`),
    },
    study_dm: {
        openSession: ({ id }) => post(`/dialog/open/session/${id}`),
        talk: ({ id, payload }) => post(`/dialog/session/${id}`, payload),
        getHistory: ({ id }) => get(`/history/list/${id}`),
        getCardInfo: ({ id }) => get(`/task/card/detail/${id}`),
        // 继续之前对话时，获取关键步骤信息的接口
        getHistoryPoint: ({ id }) => get(`/session/detail/sessionId/${id}`),
    },
    // 场景点图
    scene: {
        getScenePointInfo: () => get(`/user/scene/graph/find/by/type?type=电话预约`),
        deleteProgress: () => del(`/user/scene/graph/delete/2`)
    },
    // 登陆相关
    login_page: {
        login: ({ payload }) => post(`/user/login`, payload),
    },
    // 注册相关
    regist_page: {
        checkUsername: ({ payload }) => post(`/user/check/username`, payload), 
    },
}