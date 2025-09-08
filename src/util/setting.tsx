import axios, { type AxiosResponse, type InternalAxiosRequestConfig } from 'axios';
import { history } from '../App';
export const DOMAIN_STORE_API = 'https://apistore.cybersoft.edu.vn/api';
export const ACCESS_TOKEN = 'accessToken';
export const USER_LOGIN = 'userLogin';

//viết hàm lưu localstorage và cookie
export const setStoreJson = (name:string, data:any) => {
    localStorage.setItem(name, JSON.stringify(data));
    setCookie(name, JSON.stringify(data), 30);
};
export const setStoreText = (name:string, data:any) => {
    localStorage.setItem(name, data);
    setCookie(name, data, 30);
};
export const getStoreJson = (name:string) => {
    if (localStorage.getItem(name)) {
        let jsonText:string | null | any =localStorage.getItem(name);


        return JSON.parse(jsonText);
    }
    return null;
}
export const getStoreText = (name:string) => {
    if (localStorage.getItem(name)) {
        return localStorage.getItem(name);
    }
    return null;
}



export function setCookie(name:string, value:string, days:number) {
    var expires = "";
    if (days) {
        var date = new Date();
        date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
        expires = "; expires=" + date.toUTCString();
    }
    document.cookie = name + "=" + (value || "") + expires + "; path=/";
}
export function getCookie(name:string) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for (var i = 0; i < ca.length; i++) {
        var c = ca[i];
        while (c.charAt(0) == ' ') c = c.substring(1, c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length, c.length);
    }
    return null;
}
export function deleteCookie(name:string) {
    document.cookie = name + '=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;';
}

//Cấu hình http interceptor
export const httClientStoreApi = axios.create({
    baseURL: DOMAIN_STORE_API,
    timeout: 30000
});

//middleware:  khi gửi request đều chạy qua hàm này hoặc trước khi nhận về từ api chạy qua hàm này

httClientStoreApi.interceptors.request.use((config:any) => {
    config.headers = {
        ...config.headers,
        Authorization: getStoreText(ACCESS_TOKEN)
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});


httClientStoreApi.interceptors.response.use((response:AxiosResponse<any, any>) => {
    return response;
}, (err) => {
    if (err.response?.status === 403 || err.response?.status === 401) {
        // window.location.href = '/login';
        history.push('/login');
    }else if (err.response?.status === 400 || err.response?.status === 404) {
        // window.location.href = '/';
        history.push('/');
    }
    return Promise.reject(err);
});
// ---------- status code --------------
/*
    200 (success): request gửi đến server -> server xử lí thành công và trả kết quả về
    201 (created): request gửi đến server -> server tạo mới thành công một tài nguyên và trả về thông tin tài nguyên đó
    400(bad request): request gửi đến server -> server kiểm tra thấy dữ liệu gửi lên không hợp lệ (validate) -> trả về lỗi
    404 (not found): request gửi đến server -> server không tìm thấy tài nguyên yêu cầu (api không tồn tại)
    500 (internal server error): request gửi đến server -> server xảy ra lỗi trong quá trình xử lí
    + Trường hợp 1:
        FE gửi dữ liệu không đúng định dạng hoặc dữ liệu bị sai format hoặc giá trị yêu cầu của backend (test swagger hoặc post man)
    + Trường hợp 2: 
        Backend code bị lỗi nhưng chưa xử lí
    401 (unauthorized): Người dùng chưa đăng nhập hoặc token không hợp lệ
    403 (forbidden): Token chưa đủ quyền truy cập
*/ 