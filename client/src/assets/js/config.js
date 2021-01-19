import axios from 'axios';

// 环境
const EnvironmentConfig = {
    'UAT': {
        url: '/api',
    },
    'PROD': {
        type: 'prod',
        url: '',
    }
};

// 接口编号
const InterfaceCode = {
    UserLogin: '00B301',
};

// 环境定义
const Environment = EnvironmentConfig['UAT'];


// 创建请求实例
const Request = axios.create({
    timeout: 7000,
    baseURL: Environment.url,
    headers: {'Content-Type': 'application/json'}
});

// 添加请求拦截器
Request.interceptors.request.use(config => {
    return config
});

// 添加响应拦截器
Request.interceptors.response.use(response => {
    return response.data
}, error => {
    console.log(error)
});

export { InterfaceCode, Request, Environment }
