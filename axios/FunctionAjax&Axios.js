// 封装uploadFile(file)
function uploadFile(file, url) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr);
                }
            }
        });
        xhr.open('POST', url);
        const fd = new FormData();
        fd.append('avatar', file);
        xhr.send(fd);
    });
}

document.querySelector('button').addEventListener('click', async() => {
    // expect
    const file = document.querySelector('#file').files[0];
    const res = await uploadFile(file, 'http://www.liulongbin.top:3006/api/upload/avatar');
    console.log(res);
});

// 事件循环机制
// promise.then.catch 微任务
// setTimeout/setInterval 宏任务


// { id: 1, name: 'zs' }
function getParamsStr(params) {
    return Object
        .keys(params)
        .map((key) => `${ key }=${ params[key] }`)
        .join('&');
}
// 1. 封装$get, $post, $ajax
// 2. 封装axiosGet , axiosPost, axios
// 3. 封装uploadFile(file)
function $get(url, params, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                onSuccess(JSON.parse(xhr.responseText));
            } else {
                onError(xhr);
            }
        }
    });
    xhr.open('GET', `${ url }?${ getParamsStr(params) }`); // id=1&name=zs
    xhr.send();
}

function $post(url, params, onSuccess, onError) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                onSuccess(JSON.parse(xhr.responseText));
            } else {
                onError(xhr);
            }
        }
    });
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.open('POST', url);
    xhr.send(getParamsStr(params));
}

function $ajax(config) {
    const xhr = new XMLHttpRequest();
    xhr.addEventListener('readystatechange', () => {
        if (xhr.readyState === 4) {
            if (xhr.status === 200) {
                config.success && config.success(JSON.parse(xhr.responseText));
            } else {
                config.error && config.error(xhr);
            }
        }
    });
    const isPost = config.method.toUpperCase() === 'POST';
    const paramsStr = getParamsStr(config.data);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.open(config.method, config.url + (!isPost ? `?${ paramsStr }` : ''));
    xhr.send(isPost && paramsStr);
}

function $ajax1(config) {
    switch (config.method.toUpperCase()) {
        case 'GET':
            $get(config.url, config.data, config.success, config.error);
            break;
        case 'POST':
            $post(config.url, config.data, config.success, config.error);
            break;

        default:
            break;
    }
}

//// expect
// $ajax({
//     method: 'post',
//     url: 'xx',
//     data: {

//     },
//     success () {

//     },
//     error () {

//     },
// });

function axiosGet(url, params) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr);
                }
            }
        });
        xhr.open('GET', `${ url }?${ getParamsStr(params) }`); // id=1&name=zs
        xhr.send();
    });
}

// // expect
// const res = await axiosGet('xx', {}, () => {});

function axiosPost(url, data) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr);
                }
            }
        });
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.open('POST', url);
        xhr.send(getParamsStr(data));
    });
}

function axios(config) {
    return new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.addEventListener('readystatechange', () => {
            if (xhr.readyState === 4) {
                if (xhr.status === 200) {
                    resolve(JSON.parse(xhr.responseText));
                } else {
                    reject(xhr);
                }
            }
        });
        const isPost = config.method.toUpperCase() === 'POST';
        const paramsStr = getParamsStr(config[isPost ? 'data' : 'params']);
        xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
        xhr.open(config.method, config.url + (!isPost ? `?${ paramsStr }` : ''));
        xhr.send(isPost && paramsStr);
    });
}

// // expect
// const res = await axios({
//     method: 'GET',
//     url: 'xx',
//     params: {},
//     data: {},
// });