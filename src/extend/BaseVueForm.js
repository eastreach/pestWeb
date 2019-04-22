import Vue from 'vue'
import {mapGetters} from 'vuex'
import SelectYesNo from '../views/select/SelectYesNo.vue'
import SelectYesNoNumber from '../views/select/SelectYesNoNumber.vue'
import ImageUpload from '../components/common/ImageUpload.vue';
export const BaseVueForm = Vue.extend({
  components: {
    SelectYesNo,
    SelectYesNoNumber,
    ImageUpload,
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
      loading: false,
      downloadLoading: false,

      //api
      startDt: Date.now().format(),
      endDt: Date.now().plusDays(15).format(),
      pickerOptions: this.$store.state.pickerOptions,
    }
  },
  computed: {
    ...mapGetters([
      'tzdOperator',
    ]),
  },
  watch: {
    currentPage: {
      handler(){
        this.selectPage();
      },
    },
  },
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
    selectFormIfUse(value){
      this.form.ifUse = value
    },
    selectFormState(value){
      this.form.state = value;
    },
    pickTimeStart (val) {
      this.startDt = val;
    },
    pickTimeEnd (val) {
      this.endDt = val;
    },
    currentYear(){
      this.startDt = Date.now().withMonthOfYear(1).withDayOfMonth(1).format();
      this.endDt = Date.parse(this.startDt).plusYears(1).plusDays(-1).format();
      this.selectPage();
    },
    previousYear(){
      this.startDt = Date.parse(this.startDt).plusYears(-1).format();
      this.endDt = Date.parse(this.startDt).plusYears(1).plusDays(-1).format();
      this.selectPage();
    },
    nextYear(){
      this.startDt = Date.parse(this.startDt).plusYears(1).format();
      this.endDt = Date.parse(this.startDt).plusYears(1).plusDays(-1).format();
      this.selectPage();
    },
    currentMonth(){
      this.startDt = Date.now().withDayOfMonth(1).format();
      this.endDt = Date.parse(this.startDt).plusMonths(1).plusDays(-1).format();
      this.selectPage();
    },
    previousMonth(){
      this.startDt = Date.parse(this.startDt).plusMonths(-1).format();
      this.endDt = Date.parse(this.startDt).plusMonths(1).plusDays(-1).format();
      this.selectPage();
    },
    nextMonth(){
      this.startDt = Date.parse(this.startDt).plusMonths(1).format();
      this.endDt = Date.parse(this.startDt).plusMonths(1).plusDays(-1).format();
      this.selectPage();
    },
  }
});
