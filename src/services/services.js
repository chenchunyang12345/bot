const { get, post, put, del, getDataAndTotal } = require('../utils/request').default;

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
        getRealCustomers: () => get(`/customer/real/customers`),
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
    }
}