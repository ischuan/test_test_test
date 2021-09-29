/**
 * @param {object} config
 */
function myAxiosGet(config) {
    return new Promise((resolve, reject) => {
        const method = config.method
        const url = config.url
        const data = config.params || config.data

        const xhr = new XMLHttpRequest()

        // 处理data
        let str = ''
        for (const item in data) {
            str += `${item}=${data[item]}&`
        }
        const dataString = str.slice(0, -1)
            // 处理data

        switch (method) {
            case 'get' || 'GET':
                xhr.open(`get`, url + '?' + dataString)
                xhr.send()
                break
            case 'post' || 'POST':
                xhr.open('post', url)
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                xhr.send(dataString)
                break
            default:
                break
        }

        xhr.onreadystatechange = () => {
            if (xhr.readyState === 4) {
                const res = {
                    status: xhr.status,
                    data: JSON.parse(xhr.responseText)
                }
                resolve(res)
            }
        }

    })
}