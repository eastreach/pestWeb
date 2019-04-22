function checkDate(date) {
    let a = /^(\d{4})-(\d{2})-(\d{2})$/;
    if (!a.test(date)) {
        return false
    }
    else
        return true
}
export const formatDate = (date) => {
    if (checkDate(date) == true) {
        return date;
    }
    let myyear = date.getFullYear();
    let mymonth = date.getMonth() + 1;
    let myweekday = date.getDate();

    if (mymonth < 10) {
        mymonth = "0" + mymonth;
    }
    if (myweekday < 10) {
        myweekday = "0" + myweekday;
    }
    return (myyear + "-" + mymonth + "-" + myweekday);
}
export const getBeforeDate = (n) => {
    let d = new Date();
    let year = d.getFullYear();
    let mon = d.getMonth() + 1;
    let day = d.getDate();
    if (day <= n) {
        if (mon > 1) {
            mon = mon - 1;
        }
        else {
            year = year - 1;
            mon = 12;
        }
    }
    d.setDate(d.getDate() - n);
    year = d.getFullYear();
    mon = d.getMonth() + 1;
    day = d.getDate();
    let s = year + "-" + (mon < 10 ? ('0' + mon) : mon) + "-" + (day < 10 ? ('0' + day) : day);
    return s;
}
export const getMonthDays = (month) => {
    let monthStartDate = new Date(nowYear, month, 1);
    let monthEndDate = new Date(nowYear, month + 1, 1);
    let days = (monthEndDate - monthStartDate) / (1000 * 60 * 60 * 24);
    return days;
}
export const getDateDiff = (date1, date2) => {
    var sArr = date1.split("-");
    var eArr = date2.split("-");
    var sRDate = new Date(sArr[0], sArr[1], sArr[2]);
    var eRDate = new Date(eArr[0], eArr[1], eArr[2]);
    var result = (eRDate - sRDate) / (24 * 60 * 60 * 1000);
    return result;
}
export const getDateList = (date1, date2) => {
    var d1 = formatDate(date1);
    var d2 = formatDate(date2);
    console.log(d1 + d2);
    var oneDay = 24 * 3600 * 1000;
    var date = [];
    //天数
    var days = getDateDiff(d1, d2);
    var d1 = d1.replace(/-/g, ",");
    var base = +new Date(d1);
    base = base - oneDay;
    for (var i = -1; i < days; i++) {
        var everyday = new Date(base += oneDay);
        date.push(formatDate(everyday));
    }


    return date;

}
export const directiveMergeCells = (el, binding) => {
    if (el) {
        let div = el.parentNode;
        let td = div.parentNode;
        // td.style.backgroundColor = "green";
        if (binding.value.display == "false" || binding.value.rowspan > 1)
            td.rowSpan = binding.value.rowspan;
        else
            td.style.display = "none";
    }

}
export const tableMergeCells = (data, clientname) => {
    let list = data;
    let cellindex = clientname;
    let cellFirstText = ""; //第一行字段
    let n = 1;
    for (let i = list.length - 1; i >= 0; i--) {
        if (!cellFirstText)
            if (i >= 0)
                cellFirstText = list[i][cellindex];

        let cellNextText = ""; //第二行字段
        if ((i - 1) >= 0) {
            cellNextText = list[i - 1][cellindex];
        }
        if (cellFirstText == cellNextText) {
            n++;
            list[i]["rowspan"] = "1";
            list[i]["display"] = true; //相等不显示
            cellFirstText = cellNextText;
        }
        if (cellFirstText != cellNextText) {
            if (n > 1) {
                list[i]["rowspan"] = n;
                list[i]["display"] = false;
                cellFirstText = "";
            } else {
                list[i]["rowspan"] = "1";
                list[i]["display"] = false; //不相等显示

                cellFirstText = "";
            }
            n = 1;
        }
    }
    return list;
};
export const tableSortCells = (data, clientname, type) => {
    var list = [];
    var data = data;
    var name = clientname;
    var type = type;
    if (typeof(data) == "object" && data.length > 0) {
        switch (type) {
            case "string":
                list = data.sort(function (x, y) {
                    return x[name].localeCompare(y[name]);
                });
                break;
            case "desc":
                list = data.sort(function (a, b) {
                    return parseFloat(a[name]) - parseFloat(a[name])
                });
                break;
            case "asc":
                list = data.sort(function (a, b) {
                    return parseFloat((a[name]) - parseFloat(a[name]))
                });
                break;
            default:
                return data;
        }
        return list;
    } else {
        return data;
    }
}
export const eChart_line=(legenddataname, xAxisdata, series)=> {
    let option = {
        tooltip: {
            trigger: 'axis'
        },
        legend: {
            textStyle: {
                color: '#000'
            },
            data: legenddataname||[]
        },
        grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
        },
        toolbox: {
            feature: {
                mark: {show: true},
                dataView: {show: true, readOnly: false},
                magicType: {show: true, type: ['line', 'bar']},
                restore: {show: true},
                saveAsImage: {show: true}
            }
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#000'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#000'
                }
            },
            data: xAxisdata||[]
        },
        yAxis: {
            type: 'value',
            splitLine: {
                show: false
            },
            axisLine: {
                lineStyle: {
                    color: '#000'
                }
            },
            axisLabel: {
                show: true,
                textStyle: {
                    color: '#000'
                }
            }
        },
        series: series||[]

    };
       return option;

}
