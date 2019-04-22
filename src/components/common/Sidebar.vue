<template>
  <div class="sidebar">
    <el-menu :default-active="onRoutes" class="el-menu-vertical-demo" unique-opened router>
      <template v-for="item in items">
        <template v-if="item.subs">
          <el-submenu :index="item.index">
            <template slot="title"><i :class="item.icon"></i>{{ item.title }}</template>
            <template v-for="childitem in item.subs">
              <template v-if="childitem.childsubs">
                <el-submenu :index="childitem.index">
                  <template slot="title"> {{ childitem.title }}</template>
                  <template v-for="childsonitem in childitem.childsubs">
                    <template v-if="childsonitem.childsonsubs">
                      <el-submenu :index="childsonitem.index">
                        <template slot="title"> {{ childsonitem.title }}</template>
                        <el-menu-item v-for="sonson in childsonitem.childsonsubs"
                                      :key="sonson.index"
                                      :index="sonson.index">{{ sonson.title}}
                        </el-menu-item>
                      </el-submenu>
                    </template>
                    <template v-else>
                      <el-menu-item :index="childsonitem.index">{{ childsonitem.title }}
                      </el-menu-item>
                    </template>
                  </template>
                </el-submenu>
              </template>
              <template v-else>
                <el-menu-item :index="childitem.index">{{ childitem.title }}</el-menu-item>
              </template>
            </template>
          </el-submenu>
        </template>
        <template v-else>
          <el-menu-item :index="item.index">
            <i :class="item.icon"></i>{{ item.title }}
          </el-menu-item>
        </template>
      </template>
    </el-menu>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        items: [
          {
            icon: 'el-icon-date',
            index: '7',
            title: '会员中心',
            subs: [
              {
                index: 'h_gxdw_container',
                title: '协议客户'
              },
              {
                index: 'hotel_zd_activity_container',
                title: '营销活动'
              },
            ]
          },
          {
            icon: 'el-icon-date',
            index: '9',
            title: '预订中心',
            subs: [
              {
                index: 'kf_yd_container',
                title: '客房预订'
              },
              {
                index: 'kl_yd_container',
                title: '康乐预订'
              },
            ]
          },
          {
            icon: 'el-icon-date',
            index: '8',
            title: '订单中心',
            subs: [
              {
                index: 'hotel_detail_transaction_container',
                title: '支付流水'
              },
              {
                index: 'crs_kf_order_container',
                title: '客房订单'
              },
              {
                index: 'crs_kl_order_container',
                title: '康乐订单'
              },
            ]
          },
          {
            icon: 'el-icon-menu',
            index: '2',
            title: '设置中心',
            subs: [
              {
                index: 'hotel_setting_container',
                title: '酒店设置'
              },
              {
                index: 'kf_setting_container',
                title: '客房设置'
              },
              {
                index: 'kl_setting_container',
                title: '康乐设置'
              },
              {
                index: 'kf_interface_setting_container',
                title: '客房接口'
              },
              {
                index: 'kl_interface_setting_container',
                title: '康乐接口'
              },
              {
                index: 'plugin_setting_container',
                title: '组件模块'
              },
              {
                index: 'web_setting_container',
                title: '官网设置'
              },
            ]
          },
          {
            icon: 'el-icon-date',
            index: '5',
            title: '报表中心',
            subs: [
              {
                index: 'rep_jingying_n_container',
                title: '经营收入'
              },
//                            {
//                                index: 'rep_gxdw_container',
//                                title: '协议客户'
//                            },
              {
                index: 'rep_kf_container',
                title: '客房报表'
              },
              {
                index: 'rep_kl_container',
                title: '康乐报表'
              },
//                            {
//                                index: 'rep_order_container',
//                                title: '订单支付'
//                            },
              {
                index: 't_zd_report',
                title: '报表中心'
              },
            ]
          },
          {
            icon: 'el-icon-date',
            index: '10',
            title: '帮助中心',
            subs: [
//                            {
//                                index: 'readme',
//                                title: 'CRS概述'
//                            },
              {
                index: 'help_container',
                title: '帮助文档'
              },
              {
                index: 't_zd_course',
                title: '教程专区'
              },
              {
                icon: 'el-icon-warning',
                index: 'log_container',
                title: '系统日志'
              },
            ]
          },
          {
            icon: 'el-icon-setting',
            index: 'about',
            title: '关于CRS',
          },
        ]
      }
    },
    computed: {
      onRoutes(){
        return this.$route.path.replace('/', '');
      }
    },
    mounted(){
      if (this.$store.state.tzdOperator.hotelId == "root") {
        this.items.push({
          icon: 'el-icon-setting',
          index: '1',
          title: '平台管理',
          subs: [
            {
              icon: 'el-icon-setting',
              index: 'auth_container',
              title: '授权管理'
            },
            {
              icon: 'el-icon-setting',
              index: 'rep_auth_container',
              title: '平台报表'
            }
          ]
        })
      }
    }
  }
</script>

<style scoped>
  .sidebar {
    display: block;
    position: absolute;
    width: 180px;
    left: 0;
    top: 70px;
    bottom: 0;
    overflow-y: auto;
  }

  /*.sidebar > ul {*/
  /*height:100%;*/
  /*}*/

</style>
