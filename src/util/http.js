/**
 * http接口调用封装
 */

export default async(url = '', data = {}, type = 'POST', method = 'urlencoded') => {
    type = type.toUpperCase();
    method = method.toUpperCase();

    if (type == 'GET') {
        let dataStr = '';               //数据拼接字符串
        Object.keys(data).forEach(key => {
            dataStr += key + '=' + data[key] + '&';
        })

        if (dataStr !== '') {
            dataStr = dataStr.substr(0, dataStr.lastIndexOf('&'));
            url = url + '?' + dataStr;
        }
    }

    return new Promise((resolve, reject) => {
        let requestObj;
        if (window.XMLHttpRequest) {
            requestObj = new XMLHttpRequest();
        } else {
            requestObj = new ActiveXObject;
        }

        let sendData = '';
        if (type == 'POST') {
            sendData = JSON.stringify(data);
        }

        requestObj.open(type, url, true);
        if (method == 'JSON'){
          requestObj.setRequestHeader("Content-type", "application/json");
        }else {
           requestObj.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
        }
        requestObj.send(sendData);

        requestObj.onreadystatechange = () => {
            if (requestObj.readyState == 4) {
                if (requestObj.status == 200) {
                    let obj = requestObj.response
                    if (typeof obj !== 'object') {
                        obj = JSON.parse(obj);
                    }
                    resolve(obj)
                } else {
                    reject(requestObj)
                }
            }
        }
    })
}
