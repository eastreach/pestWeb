<template>
  <div>
    <div class="ms-doc">
      <article>
        <h1>瑞通CRS系统</h1>

        <p>基于瑞通PMS系统,提供统一对外服务。</p>
        <h2>功能模块</h2>
        <el-checkbox checked>小程序</el-checkbox>
        <br>
        <el-checkbox checked>APP千里眼</el-checkbox>
        <br>
        <el-checkbox checked>房价牌</el-checkbox>
        <br>
        <el-checkbox checked>短信网关</el-checkbox>
        <br>
        <el-checkbox checked>会员网关</el-checkbox>
        <br>
        <el-checkbox checked>OTA网关</el-checkbox>
        <br>
        <el-checkbox checked>支付网关</el-checkbox>
        <br>
        <el-checkbox checked>报表分析</el-checkbox>
        <br>
        <el-button type="primary" @click="manual_crs">帮助文档</el-button>
        <el-button type="primary" @click="current">稳定版</el-button>
        <el-button type="primary" @click="dev">开发版</el-button>
        <el-button type="primary" @click="old">旧版本</el-button>
        <el-button type="primary" @click="bossCockpit">驾驶仓</el-button>
        <br/>
        <br/>
        <div>
          <h5> 当前版本:{{version}}</h5>
        </div>
        <br/>
        <div>
          <a target="_blank" href="http://www.eastreach.com"
             style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
            <p>© 2009-2018 eastreach.com 版权所有 京ICP备06013185号</p>
          </a>
        </div>
        <div>
          <a target="_blank" href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=11010802027444"
             style="display:inline-block;text-decoration:none;height:20px;line-height:20px;">
            <img :src="beianUrl" style="float:left;"/>
            <p style="float:left;height:20px;line-height:20px;margin: 0px 0px 0px 5px;">京公网安备 11010802027444号</p>
          </a>
        </div>
        <div>
        </div>
      </article>
    </div>

  </div>
</template>

<script>
  export default {
    name: 'About',
    data: function () {
      return {
        version: '4.5.190315',
        beianUrl: './static/img/beian.png',
      }
    },
    methods: {
      manual_crs(){
        window.open('http://crs.eastreach.com/doc/doc_manual_crs/index.html');
      },
      bossCockpit(){
        let url = "http://crs.eastreach.com/bossCockpit";
        window.open(url);
      },
      old(){
        let url = "http://crs.eastreach.com/crs";
        window.open(url);
      },
      current(){
        let url = "http://crs.eastreach.com";
        window.open(url);
      },
      dev(){
        let url = "http://crs.eastreach.com/dev";
        window.open(url);
      },
    }
  }
</script>

<style scoped>
  .ms-doc {
    width: 100%;
    max-width: 980px;
    font-family: -apple-system, BlinkMacSystemFont, "Segoe UI", Helvetica, Arial, sans-serif;
  }

  .ms-doc h3 {
    padding: 9px 10px 10px;
    margin: 0;
    font-size: 14px;
    line-height: 17px;
    background-color: #f5f5f5;
    border: 1px solid #d8d8d8;
    border-bottom: 0;
    border-radius: 3px 3px 0 0;
  }

  .ms-doc article {
    padding: 45px;
    word-wrap: break-word;
    background-color: #fff;
    border: 1px solid #ddd;
    border-bottom-right-radius: 3px;
    border-bottom-left-radius: 3px;
  }

  .ms-doc article h1 {
    font-size: 32px;
    padding-bottom: 10px;
    margin-bottom: 15px;
    border-bottom: 1px solid #ddd;
  }

  .ms-doc article h2 {
    margin: 24px 0 16px;
    font-weight: 600;
    line-height: 1.25;
    padding-bottom: 7px;
    font-size: 24px;
    border-bottom: 1px solid #eee;
  }

  .ms-doc article p {
    margin-bottom: 15px;
    line-height: 1.5;
  }

  .ms-doc article .el-checkbox {
    margin-bottom: 5px;
  }
</style>
