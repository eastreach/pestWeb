/**
 * Created by houbin on 17/11/10.
 */

// Date 扩展1
Date.now = function () {
  return new Date()
};
Date.dateFormat = 'yyyy-MM-dd'
Date.dateTimeFormat = 'yyyy-MM-dd hh:mm:ss'
Date.parse = function (str) {
  return new Date(str.replace(/-/g, '/'))
};
Date.daysBetween = function (startDt, endDt) {
  var days = endDt.getTime() - startDt.getTime();
  var result = parseInt(days / (1000 * 60 * 60 * 24));
  return result;
};
// Date 扩展2
Date.prototype.plusYears = function (num) {
  var newDate = new Date(this);
  newDate.setFullYear(this.getFullYear() + num);
  return newDate
};
Date.prototype.plusMonths = function (num) {
  var newDate = new Date(this);
  newDate.setMonth(this.getMonth() + num);
  var currentMonth = this.getMonth() + this.getFullYear() * 12;
  var diff = (newDate.getMonth() + newDate.getFullYear() * 12) - currentMonth;
  if (diff != num) {
    newDate.setDate(0)
  }
  return newDate
};
Date.prototype.plusWeekdays = function (num) {
  return new Date(this.getTime() + num * 1000 * 60 * 60 * 24 * 7)
};
Date.prototype.plusDays = function (days) {
  return new Date(this.getTime() + days * 1000 * 60 * 60 * 24)
};

// Date 扩展3
Date.prototype.withStartOfWeekday = function () {
  var newDate = new Date(this);
  var weekday = newDate.getDay() || 7;
  newDate.setDate(newDate.getDate() - weekday + 1);
  return newDate
};
Date.prototype.withStartOfMonth = function () {
  var newDate = new Date(this);
  newDate.setDate(1);
  return newDate
};
Date.prototype.withEndOfMonth = function () {
  var newDate = new Date(this);
  newDate.setDate(1);
  return newDate.plusMonths(1).plusDays(-1)
}
Date.prototype.withMonthOfYear = function (num) {
  var newDate = new Date(this);
  newDate.setMonth(num - 1);
  return newDate
}
Date.prototype.withYear = function (num) {
  var newDate = new Date(this);
  newDate.setFullYear(num);
  return newDate
}
Date.prototype.withDayOfMonth = function (num) {
  var newDate = new Date(this);
  newDate.setDate(num)
  return newDate
}
Date.prototype.withStartOfDay = function () {
  var newDate = new Date(this);
  newDate.setHours(0, 0, 0, 0);
  return newDate
}
Date.prototype.daysBetween = function (date) {
  var days = date.getTime() - this.getTime();
  var result = parseInt(days / (1000 * 60 * 60 * 24));
  return result;
}
Date.prototype.format = function (fmt) {
  if (fmt === undefined || fmt === '') {
    fmt = Date.dateFormat
  }
  var o = {
    'M+': this.getMonth() + 1, // 月份
    'd+': this.getDate(), // 日
    'h+': this.getHours(), // 小时
    'm+': this.getMinutes(), // 分
    's+': this.getSeconds(), // 秒
    'q+': Math.floor((this.getMonth() + 3) / 3), // 季度
    'S': this.getMilliseconds() // 毫秒
  }
  var week = {
    "0": "日",
    "1": "一",
    "2": "二",
    "3": "三",
    "4": "四",
    "5": "五",
    "6": "六"
  };
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
  }
  if (/(E+)/.test(fmt)) {
    fmt = fmt.replace(RegExp.$1, ((RegExp.$1.length > 1) ? (RegExp.$1.length > 2 ? "/u661f/u671f" : "/u5468") : "") + week[this.getDay() + ""]);
  }
  for (var k in o) {
    if (new RegExp("(" + k + ")").test(fmt)) {
      fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    }
  }
  return fmt;
};


//交叉表
global.crossTab = function (list, rowName, columnName, valueName) {
  let crossData = {};
  crossData.data = [];
  crossData.columnName = [];
  let rowMap = {};
  let columnMap = {};
  list.forEach(function (item) {
    let rowData = rowMap[item[rowName]];
    if (rowData == undefined) {
      rowData = item;
      rowMap[item[rowName]] = rowData;
      crossData.data.push(rowData);
    }
    if (columnMap[item[columnName]] == undefined) {
      columnMap[item[columnName]] = item[columnName];
      crossData.columnName.push(item[columnName]);
    }
    rowData[item[columnName]] = item[valueName];
  });
  return crossData;
};

//空值检查
global.checkNull = function (data, defaultValue) {
  if (data == null || data == undefined) {
    return defaultValue;
  }
  return data;
};

global.UUID = function () {
  var d = new Date().getTime();
  if (window.performance && typeof window.performance.now === "function") {
    d += performance.now();
  }
  var uuid = 'xxxxxxxxxxxx4xxxyxxxxxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    var r = (d + Math.random() * 16) % 16 | 0;
    d = Math.floor(d / 16);
    return (c == 'x' ? r : (r & 0x3 | 0x8)).toString(16);
  });
  return uuid;
}
