import {BaseVue} from './BaseVue'
import SelectYesNo from '../views/select/SelectYesNo.vue'
import SelectYesNoNumber from '../views/select/SelectYesNoNumber.vue'
export const BaseVueTable = {
  extends: BaseVue,
  components: {
    SelectYesNo,
    SelectYesNoNumber,
  },
  data: function () {
    return {
      //ui
      crs_body_height: '100',

      //pagination
      total: 0,
      pageSize: 10,
      currentPage: 1,
      pageSizes: [10, 20, 50, 100, 500, 1000],

      //table
      rows: [],
      row: {},
      multipleSelection: [],

      //loading
      ifAdd: false,
      loading: false,
      downloadLoading: false,

      //api
      groupLevel: '',
      topNum: '',
      hotelDt: Date.now().plusDays(-1).format(),                    //默认昨天
      startDt: Date.now().withDayOfMonth(1).format(),               //默认本月初
      endDt: Date.now().withDayOfMonth(1).plusMonths(1).format(),   //默认本月底
      pickerOptions: this.$store.state.pickerOptions,
    }
  },
  computed: {
    tzdOperator(){
      return this.$store.state.tzdOperator;
    },
    gatewayUrl(){
      return this.$store.state.gatewayUrl;
    },
    ifSelectRows(){
      return this.multipleSelection.length > 0;
    }
  },
  watch: {},
  methods: {
    //pagination
    handleSizeChange(val) {
      this.pageSize = val;
      this.selectPage();
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      this.selectPage();
    },

    //table
    handleSelectionChange(val) {
      this.multipleSelection = val;
    },
    handleRowContextMenu(row, event){
      if (this.$refs.multipleTable !== undefined) {
        this.$refs.multipleTable.setCurrentRow(row);
      }
      this.row = row;
    },
    handleRowDBClick(row){
      this.handleEdit(row);
    },
    handleRowClick(row){
      this.row = row;
      if (this.$refs.multipleTable !== undefined) {
        this.$refs.multipleTable.toggleRowSelection(row);
      }
    },
    handleCellDBClick(row, column, cell, event){
      if (column.property == undefined) {
        return;
      }
      this.handleEdit(row);
    },
    summaryMethod: function (param) {
      let self = this;
      const {columns, data} = param;
      const sums = [];
      columns.forEach((column, index) => {
        if (index === self.sumOption.sumPosition) {
          sums[index] = '小计';
          return;
        }
        if (self.sumOption.sumColumn.indexOf(column.property) >= 0) {
          const values = data.map(item => Number(item[column.property]));
          if (!values.every(value => isNaN(value))) {
            sums[index] = values.reduce((prev, curr) => {
              const value = Number(curr);
              if (!isNaN(value)) {
                return prev + curr;
              } else {
                return prev;
              }
            }, 0);
            sums[index] = sums[index].toFixed(2);
          } else {
            sums[index] = '';
          }
        }
      });
      return sums;
    },

    //contextMenu
    handleCommand(command) {
      this[command](this.row);
    },

    //format
    booleanFormat: function (row, column) {
      var data = row[column.property];
      if (data == undefined || data == false) {
        return "N";
      } else {
        return "Y";
      }
    },
    dateFormat: function (row, column) {
      var data = row[column.property];
      if (data == undefined) {
        return '';
      }
      return data.split(' ')[0];
    },
    dateWeekFormat: function (dateStr) {
      return Date.parse(dateStr).format("MM-dd") + "-(" + Date.parse(dateStr).format("E") + ")";
    },
    secondPayTypeFormat: function (row, column) {
      var data = row[column.property];
      let value = this.$store.state.secondPayType[data];
      if (value != undefined) {
        return value;
      }
      return data;
    },
    moneyFormat: function (row, column) {
      var data = row[column.property];
      if (data === undefined) {
        return '';
      }
      var value = Number(data).toFixed(2);
      return value;
    },
    percentFormat: function (row, column) {
      var data = row[column.property];
      if (isNaN(parseInt(data))) {
        return '0%'
      }
      return (data * 100).toFixed(2) + "%";
    },
    //ui
    resize: function () {
      this.$nextTick(function () {
        let self = this;
        var domHeight = document.body.clientHeight;
        var domElement = self.$refs.crs_body_dom;
        while (domElement !== null) {
          domHeight = domHeight - domElement.offsetTop - domElement.clientTop;
          domElement = domElement.offsetParent;
        }
        self.crs_body_height = domHeight;
      });
    },

    //select
    pickTimeStart (val) {
      this.startDt = val;
      this.hotelDt = val;
    },
    pickTimeEnd (val) {
      this.endDt = val;
    },
    selectHotelDt(val){
      this.hotelDt = val;
      this.startDt = val;
      this.selectPage();
    },
    currentYear(){
      this.startDt = Date.now().withMonthOfYear(1).withDayOfMonth(1).format();
      this.endDt = Date.parse(this.startDt).plusYears(1).format();
      this.hotelDt = this.startDt;
      this.selectPage();
    },
    previousYear(){
      this.startDt = Date.parse(this.startDt).withMonthOfYear(1).withDayOfMonth(1).plusYears(-1).format();
      this.endDt = Date.parse(this.startDt).plusYears(1).format();
      this.hotelDt = this.startDt;
      this.selectPage();
    },
    nextYear(){
      this.startDt = Date.parse(this.startDt).withMonthOfYear(1).withDayOfMonth(1).plusYears(1).format();
      this.endDt = Date.parse(this.startDt).plusYears(1).format();
      this.hotelDt = this.startDt;
      this.selectPage();
    },
    currentMonth(){
      this.startDt = Date.now().withDayOfMonth(1).format();
      this.endDt = Date.parse(this.startDt).plusMonths(1).format();
      this.hotelDt = this.startDt;
      this.selectPage();
    },
    previousMonth(){
      this.startDt = Date.parse(this.startDt).withDayOfMonth(1).plusMonths(-1).format();
      this.endDt = Date.parse(this.startDt).plusMonths(1).format();
      this.hotelDt = this.startDt;
      this.selectPage();
    },
    nextMonth(){
      this.startDt = Date.parse(this.startDt).withDayOfMonth(1).plusMonths(1).format();
      this.endDt = Date.parse(this.startDt).plusMonths(1).format();
      this.hotelDt = this.startDt;
      this.selectPage();
    },
    currentWeekday(){
      this.startDt = Date.now().withStartOfWeekday().format();
      this.endDt = Date.parse(this.startDt).plusWeekdays(1).format();
      this.hotelDt = this.startDt;
      this.selectPage();
    },
    previousWeekday(){
      this.startDt = Date.parse(this.startDt).withStartOfWeekday().plusWeekdays(-1).format();
      this.endDt = Date.parse(this.startDt).plusWeekdays(1).format();
      this.hotelDt = this.startDt;
      this.selectPage();
    },
    nextWeekday(){
      this.startDt = Date.parse(this.startDt).withStartOfWeekday(1).plusWeekdays(1).format();
      this.endDt = Date.parse(this.startDt).plusWeekdays(1).format();
      this.hotelDt = this.startDt;
      this.selectPage();
    },
    currentDay(){
      this.startDt = Date.now().format();
      this.endDt = Date.parse(this.startDt).plusDays(1).format();
      this.hotelDt = this.startDt;
      this.selectPage();
    },
    previousDay(){
      this.startDt = Date.parse(this.startDt).plusDays(-1).format();
      this.endDt = Date.parse(this.startDt).plusDays(1).format();
      this.hotelDt = this.startDt;
      this.selectPage();
    },
    nextDay(){
      this.startDt = Date.parse(this.startDt).plusDays(1).format();
      this.endDt = Date.parse(this.startDt).plusDays(1).format();
      this.hotelDt = this.startDt;
      this.selectPage();
    },
    yesterday(){
      this.startDt = Date.now().plusDays(-1).format();
      this.endDt = Date.parse(this.startDt).plusDays(1).format();
      this.hotelDt = this.startDt;
      this.selectPage();
    },
  }
}
