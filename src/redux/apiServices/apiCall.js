import axios from 'axios';

const handleResponse = (url, response, meth) => {
    if (response?.data?.error) {
        alert('Something went wrong');
        return true;
    }
    if (response?.data?.success === true) {
        return Promise.resolve(response);
    } else if (response?.data?.success === false) {
        alert(response.data.message);
        return true;
    }
    return response.data;
};

const handleCatchError = (url, err) => {

    return Promise.reject(err);
};

export function API(url, type = 'GET', data = {}, token = '', header = {}) {
    let reqHeader = Object.assign(header, {
        // Accept: 'application/json',
        // 'Content-Type': 'application/json',
        // auth_token: header ? header : '',
        // auth_token: token,
    });

    if (type === 'GET') {
        return axios
            .get(url, {headers: {}})
            .then((response) => {
                return handleResponse(url, response, 'get');
            })
            .catch((err) => {
                return handleCatchError(url, err);
            });
    } else if (type === 'POST') {
        debugger
        return axios
            .post(url, data, {headers: reqHeader})
            .then((response) => {
                return handleResponse(url, response, 'post');
            })
            .catch((err) => {
                debugger
                return handleCatchError(url, err);
            });
    } else if (type === 'PATCH') {
        return axios
            .patch(url, data, {headers: reqHeader})
            .then((response) => {
                return handleResponse(url, response, 'patch');
            })
            .catch((err) => {
                return handleCatchError(url, err);
            });
    } else if (type === 'DELETE') {
        debugger
        return axios
            .delete(url, data, {headers: reqHeader})
            .then((response) => {
                debugger
                return handleResponse(url, response, 'delete');
            })
            .catch((err) => {
                return handleCatchError(url, err);
            });
    }
}
