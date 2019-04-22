<template>
  <div>
    <div>

      <div class="fixed-bar" title="helel">
        <div class="wide-open" v-on:click="close" v-show="seen">客服<i class="el-icon-caret-right"></i></div>
        <div class="wide-open" v-on:click="open" v-show="!seen"><i class="el-icon-caret-left"></i></div>
        <div class="wide-bar" v-show="seen">
          <div class="consult-box">
            <!--<div class="consult-header clearfix">-->
            <!--<h3 class="consult-title">问题提交→</h3>-->
            <!--<h3 class="consult-title">客服咨询↓</h3>-->
            <!--</div>-->
            <ul class="consult-list">
              <li class="clearfix" v-for="item in qq_customer" :key="item.qq">
                QQ:<a target="_blank" :href="item.model">
                {{item.qq}}</a>
              </li>

              <li class="clearfix" v-for="item in tel_customer" :key="item.tel">电话:<a href="#">{{item.tel}}</a></li>

            </ul>

          </div>
        </div>
        <div class="wide-edit" v-show="seen">
          <el-input
            type="textarea"
            :autosize="{ minRows: 15, maxRows: 100}"
            placeholder="请输入您的问题"
            v-model="description">
          </el-input>
          <el-button type="primary" icon="el-icon-search" @click="save">提交</el-button>
        </div>

      </div>
    </div>
  </div>
</template>
<script>
  export default {
    components: {
    },
    data(){
      return {
        seen: false,
        qq_customer: [
          {qq: '1964645755', model: 'tencent://message/?uin=1964645755&Site=sc.chinaz.com&Menu=yes'},
          {qq: '1366658500', model: 'tencent://message/?uin=1366658500&Site=sc.chinaz.com&Menu=yes'},
        ],
        tel_customer: [
          {tel: '010-62357019'},
        ],
        description: '',
      }
    },
    props: [],
    mounted(){
    },
    created(){
    },
    methods: {
      //api
      save(){
        let self = this;
        if (self.description === '') {
          self.$message.success('内容不能为空');
          return
        }
        self.$confirm('是否继续操作', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        }).then(() => {
          self.$http.post(self.$store.state.gatewayUrl, {
            service: "tzdIssueService",
            action: "add",
            tzdIssue: JSON.stringify({
              question: self.description
            }),
            tzdOperator: self.$store.state.tzdOperator,
          }).then((res) => {
            if (res.data.state == "success") {
              self.$message.success('操作成功');
              self.description = '';
            } else {
              self.$message.success('操作失败:' + res.data.msg);
            }
          });
        }).catch((e) => {
          self.$message.success('操作失败:' + e);
        });
      },
      selectKF(){
        let self = this;
        self.$http.post(self.$store.state.gatewayUrl, {
          service: "tzdOperatorService",
          action: "selectKF",
          tzdOperator: self.$store.state.tzdOperator,
        }).then((res) => {
          if (res.data.state == "success") {
            res.data.data.forEach(function (item) {
              console.log(item);
            });
          }
        });

      },
      close(){
        this.seen = false;
      },
      open(){
        this.seen = true;
      },

    }
  }
</script>

<style>
  /* fixed-bar */

  .fixed-bar {
    position: fixed;
    right: 10px;
    bottom: 50px;
    z-index: 50;
    _position: absolute;
    _bottom: auto;
    background: #fff;
    border: 1px solid #2acb6b;
  }

  .fixed-bar .consult-box .consult-header {
    position: relative;
    height: 86px;
    margin: -1px -1px 0;
    border-bottom: 1px solid #ccc;
  }

  .fixed-bar .consult-box .consult-title {
    color: #999;
    font: normal 16px/36px "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1";
    text-align: center;
  }

  .fixed-bar .consult-list {
    margin: 0 2px -1px;
    padding: 9px 0;
  }

  .fixed-bar .consult-list li {
    list-style-type: none;
    padding: 6px 0 6px 6px;
    color: #222222;
    font: normal 12px/24px "Microsoft YaHei", "\5FAE\8F6F\96C5\9ED1";
    border-bottom: 1px solid #dbdbdb;
  }

  .fixed-bar .consult-list a {
    padding-left: 9px;
    line-height: 24px;
    color: #222222;
  }

  .fixed-bar .consult-list li:hover {
    background: #2acb6b;
  }

  .fixed-bar .wide-bar {
    width: 134px;
    background: #fff;
    float: left;
  }

  .fixed-bar .wide-edit {
    max-width: 500px;
    min-height: 200px;
    float: right;
  }

  .fixed-bar .wide-open {
    /*position: absolute;*/
    /*top:0;*/
    right: 0;
    height: 36px;
    line-height: 36px;
    background: #2acb6b;
    border-bottom: 1px solid #fff;
    z-index: 99;
  }
</style>
