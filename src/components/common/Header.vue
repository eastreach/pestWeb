<template>
  <div class="header" >

    <!--分店查找-->
    <el-dialog :visible.sync="dialogFormHmsConfigVisible">
      <div class="dialog-title"></div>
      <hms-config-core @close="dialogFormHmsConfigVisible=false"></hms-config-core>
    </el-dialog>

    <el-switch
      on-icon-class="el-icon-arrow-down"
      off-icon-class="el-icon-arrow-right"
      @change="showCollapseChange"
      v-model="showCollapse">
    </el-switch>
    {{this.hmsConfig.hotelName}}
    <el-button type="primary" @click="focus_select_HmsConfig" v-if="this.$store.state.tzdOperator.hotelId=='root'">
      查询分店
    </el-button>

    <div class="user-info">
      <el-dropdown trigger="click" @command="handleCommand">
                <span class="el-dropdown-link">
                    {{tzdOperator.hotelId == '' ? "未登录" : tzdOperator.code}}
                    <img class="user-logo" src="../../../static/img/logo.png">
                </span>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="login">重新登录</el-dropdown-item>
          <el-dropdown-item command="changePassword">修改密码</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
    </div>
  </div>
</template>
<script>
  import {mapState} from 'vuex'
  import SelectNode from '../../views/select/SelectNode.vue';
  import SelectHmsConfig from '../../views/select/SelectHmsConfig.vue';
  import SelectTZDClient from '../../views/select/SelectTZDClient.vue';
  import SelectCRSConfig from '../../views/select/SelectCRSConfig.vue';
  import HmsConfigCore from '../../page/HmsConfigCoreTableForm.vue';

  export default {
    components: {
      SelectNode,
      SelectHmsConfig,
      SelectTZDClient,
      SelectCRSConfig,
      HmsConfigCore,
    },
    data() {
      return {
        tzdOperator: this.$store.state.tzdOperator,
        hmsConfig: this.$store.state.hmsConfig,
        select_node_visible: false,
        showCollapse: true,
        dialogFormHmsConfigVisible: false,
        dialogFormVisibleOperator: false,
      }
    },
    computed: {
      keymap () {
        return {
          'ctrl+q': this.login,
          'ctrl+t': this.hms_config,
          'ctrl+h': this.h_gxdw,
          'alt+f': this.focus_select_HmsConfig,
        }
      }
    },
    methods: {
      handleCommand(command) {
        switch (command) {
          case "login":
            this.$router.push('/login');
            break;
          case "changePassword":
            this.dialogFormVisibleOperator = true;
            break;
          default:

        }
      },
      login(){
        this.$router.push('/login');
      },
      hms_config(){
        this.$router.push('/auth');
      },
      h_gxdw(){
        this.$router.push('/h_gxdw');
      },
      focus_select_HmsConfig(){
        if (this.$store.state.tzdOperator.hotelId == 'root') {
          this.dialogFormHmsConfigVisible = true;
        }
      },
      showCollapseChange(data){
        this.$emit('showCollapseChange', data);
      }

    },
    mounted(){
      if (this.$store.state.tzdOperator.hotelId == '') {
        this.$router.push('/login');
      }
    },

  }
</script>
<style scoped>
  .header {
    position: relative;
    box-sizing: border-box;
    width: 100%;
    height: 70px;
    font-size: 22px;
    line-height: 70px;
    color: #fff;
  }

  .header .logo {
    float: left;
    width: 250px;
    text-align: center;
  }

  .user-info {
    float: right;
    padding-right: 50px;
    font-size: 16px;
    color: #fff;
  }

  .user-info .el-dropdown-link {
    position: relative;
    display: inline-block;
    padding-left: 50px;
    color: #fff;
    cursor: pointer;
    vertical-align: middle;
  }

  .user-info .user-logo {
    position: absolute;
    left: 0;
    top: 15px;
    width: 40px;
    height: 40px;
    border-radius: 50%;
  }

  .el-dropdown-menu__item {
    text-align: center;
  }
</style>
