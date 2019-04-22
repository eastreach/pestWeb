<template>

  <div class="fj_wrap" v-bind:style="{ background:bgcolorShow?bgTop:'',backgroundImage:bgcolorShow?'':bgImg  }">
    <el-row class=" fj_top">
      <el-col :span="16" class="fj_top_name"
              v-bind:style="{ fontSize: fontHotelNameSize,color:fontHotelNameColor,fontFamily:fontHotelNameFamily}">
        <div>
          {{hotelName}}
        </div>
      </el-col>
      <el-col :span="8" class="fj_top_right"
              v-bind:style="{fontSize:fontFootTimeSize,color: fontFootTimeColor,fontFamily:fontFootTimeFamily }">
        {{realTime}}
      </el-col>
    </el-row>
    <el-row class="fj_content">
      <el-col :span="14" class="fj_left">
        <div v-bind:style="{ fontSize:fontTableStyleSize,color:fontTableStyleColor,fontFamily:fontTableStyleFamily }"
             v-if="carouselShow">
          <el-carousel indicator-position="none" :height="tableHeight" class="item_width"
                       :interval="speedTable">
            <el-carousel-item v-for="(item,index) in tableData" :key="item.id" v-if="(index%5==0)">
              <table>
                <thead>
                <tr>
                  <th v-for="item in tableFiled" :key="item.name">{{item.title}}</th>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,n) in tableData" :key="item.id" v-if="n>=index&&n<5+index">
                  <td v-for="fileditem in  tableFiled">{{tableData[n][fileditem.name]}}</td>
                </tr>

                </tbody>
              </table>
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
      <el-col :span="10" class="fj_right">
        <div class="fj_right_top" v-if="carouselShow">
          <el-carousel indicator-position="none" :height="imgHeight" :interval="speedPhoto">
            <el-carousel-item v-for="item in photos" :key="item">
              <img height="100%" width="100%" :src="item" alt="">
            </el-carousel-item>
          </el-carousel>
        </div>
      </el-col>
    </el-row>
    <el-row class="fj_foot">
      <el-col :span="2" class="fj_foot_left"
              v-bind:style="{fontSize:fontFootTimeSize,color: fontFootTimeColor }">


      </el-col>
      <el-col :span="22" class="fj_foot_right"
              v-bind:style="{fontSize:fontFootTextSize,color: fontFootTextColor }">
        <el-row class="fj_foot_right_top">
          <el-col :span="1" class="fj_foot_right_top_R">

          </el-col>
          <el-col :span="11" id="weather" class="fj_foot_right_top_L"></el-col>
          <el-col :span="1" class="fj_foot_right_top_R">

          </el-col>
          <el-col :span="11" class="fj_foot_right_top_R"
                  v-bind:style="{  fontSize:fontContentTextSize,color:fontContentTextColor,fontFamily:fontContentTextFamily  }">
            {{contentText}}
          </el-col>
        </el-row>
        <el-row class="fj_foot_right_bottom">
          <marquee behavior="scroll" contenteditable="true" scrollamount="3" width="100%">
            {{footText}}
          </marquee>

        </el-row>

      </el-col>

    </el-row>


  </div>

</template>

<script>
  //    import vTable from '../components/form/TZDFangJiaPaiTableForm.vue';
  export default {
//        components: {vTable},
    data(){
      return {

        carouselShow: true,
        realTime: '',

        hotelId: '',
        code: '',
        url: 'http://api.eastreach.com:9002/',
        imgHeight: "300px",
        tableHeight: "300px",
//
//                table: {},


        //对象内容--开始
        hotelName: "",
        hotelAdd: "",
        hotelTele: "",
        tableFiled: [],
        tableData: [],
        "photos": ["../../static/img/1.jpg", "../../static/img/2.jpg", "../../static/img/3.jpg"]
        ,
        "city": "北京",
        "contentText": "特别提醒：1. 酒店退房时间为中午12点，离店时请将房卡退回前台；" +
        "2. 若超过下午12点退房酒店将额外加收房费，18点之前退房加收半天房费，超过18点加收全天房费"
        ,
        "footText": "欢迎光临",

        "speedTable": "3000",
        "speedPhoto": "3000",
        "speedFoot": "3000",

        "fontHotelNameSize": "64px",
        "fontHotelNameColor": "#fff",
        "fontTableStyleSize": "36px",
        "fontTableStyleColor": "#fff",
        "fontFootTextSize": "22px",
        "fontFootTextColor": "#fff",
        "fontContentTextSize": "26px",
        "fontContentTextColor": "#fff",
        "fontWeatherSize": "20px",
        "fontWeatherColor": "#fff",
        "fontFootTimeSize": "30px",
        "fontFootTimeColor": "#fff",
        fontHotelNameFamily: "",
        fontTableStyleFamily: "",
        fontFootTextFamily: "",
        fontContentTextFamily: "",
        fontWeatherFamily: "",
        fontFootTimeFamily: "",

        "bgImg": "url",
        "bgTop": "#3c2d30",
        "bgContent": "#200000",
        "bgFoot": "#000200",
        //对象内容--结束
      }
    },
    mounted(){
      let self = this;
      self.screenWidths();
      self.display();
      self.weather();
      setInterval(function () {
        self.weather();
      }, 3600000);

      setInterval(function () {
        var nowtime = new Date();
        var year = nowtime.getFullYear();
        var month = nowtime.getMonth() + 1;
        var date = nowtime.getDate();
        self.realTime = year + "-" + month + "-" + date + " " + nowtime.toLocaleTimeString();
      }, 1000);
    },
    watch: {
      city(){
        this.weather();
      },
      photos(){

      },
      table(){

      }
    },
    computed: {},
    methods: {
      //api

      screenWidths(){
        var self = this;
        var objR = document.getElementsByClassName("fj_right_top");
        self.imgHeight = objR[0].offsetHeight + "px";
        var objL = document.getElementsByClassName("fj_left");
        self.tableHeight = objL[0].offsetHeight + "px";

      },
      display() {
        let self = this;
        self.hotelId = self.getUrlKey("hotelId");
        self.code = self.getUrlKey("code");
        self.$http.post(self.url, {
          service: "tzdFangJiaPaiService",
          action: "display",
          node: "server",
          hotelId: self.hotelId,
          code: self.code,
        }).then((res) => {
          if (res.data.state == "success") {

            self.carouselShow = false;

            self.hotelId = res.data.data.hotelId;
            self.code = res.data.data.code;
            var value = JSON.stringify(res.data.data.value);
            if (value.indexOf("hotelName") > 0) {
              self.$nextTick(() => {
                self.carouselShow = true;
              });


              self.hotelName = res.data.data.value.hotelName;
              self.hotelAdd = res.data.data.value.hotelAdd;
              self.hotelTele = res.data.data.value.hotelTele;
              self.tableFiled = res.data.data.value.tableFiled;
              self.tableData = res.data.data.value.tableData;
              self.photos = res.data.data.value.photos;
              self.city = res.data.data.value.city;
              self.contentText = res.data.data.value.contentText;
              self.footText = res.data.data.value.footText;

              self.speedTable = res.data.data.value.speedTable;
              self.speedPhoto = res.data.data.value.speedPhoto;
              self.speedFoot = res.data.data.value.speedFoot;

              self.fontHotelNameSize = res.data.data.value.fontHotelNameSize;
              self.fontHotelNameColor = res.data.data.value.fontHotelNameColor;
              self.fontTableStyleSize = res.data.data.value.fontTableStyleSize;
              self.fontTableStyleColor = res.data.data.value.fontTableStyleColor;
              self.fontFootTextSize = res.data.data.value.fontFootTextSize;
              self.fontFootTextColor = res.data.data.value.fontFootTextColor;
              self.fontContentTextSize = res.data.data.value.fontContentTextSize;
              self.fontContentTextColor = res.data.data.value.fontContentTextColor;
              self.fontWeatherSize = res.data.data.value.fontWeatherSize;
              self.fontWeatherColor = res.data.data.value.fontWeatherColor;
              self.fontFootTimeSize = res.data.data.value.fontFootTimeSize;
              self.fontFootTimeColor = res.data.data.value.fontFootTimeColor;
              self.fontHotelNameFamily = res.data.data.value.fontHotelNameFamily;
              self.fontTableStyleFamily = res.data.data.value.fontTableStyleFamily;
              self.fontFootTextFamily = res.data.data.value.fontFootTextFamily;
              self.fontContentTextFamily = res.data.data.value.fontContentTextFamily;
              self.fontWeatherFamily = res.data.data.value.fontWeatherFamily;
              self.fontFootTimeFamily = res.data.data.value.fontFootTimeFamily;

              self.bgImg = "url(" + res.data.data.value.bgImg + ")";
              if (!res.data.data.value.bgImg || res.data.data.value.bgImg.length < 6) {
                self.bgcolorShow = true;
              }
              self.bgTop = res.data.data.value.bgTop;
              self.bgContent = res.data.data.value.bgContent;
              self.bgFoot = res.data.data.value.bgFoot;

              self.tableFiled = res.data.data.value.tableFiled;
              self.tableData = res.data.data.value.tableData;
//                            self.table = {
//                                filed: res.data.data.value.tableFiled,
//                                data: res.data.data.value.tableData,
//                                speedTable: res.data.data.value.speedTable
//                            }

            }

          } else {
            this.$message.success('操作失败:' + res.data.msg);
          }
        });
      },
      getUrlKey: function (name) {
        console.log(location.href);
        return decodeURIComponent((new RegExp('[?|&]' + name + '=' + '([^&;]+?)(&|#|;|$)').exec(location.href) || [, ""])[1].replace(/\+/g, '%20')) || null;
      },
      weather(){
        let self = this;
        var urlcity = self.city || "北京";
        var url = "http://api.map.baidu.com/telematics/v3/weather?location=" + urlcity + "&output=json&ak=IzLGhqjBf2dVjKvbCPn6Sx1r9uBh8XfH";
        var requestJson = {
          url: url,
          dataType: 'jsonp',
          data: '',
          jsonp: 'callback',
        };
        self.loading = true;
        this.$http.jsonp(url, requestJson).then((res) => {
          // console.log(JSON.stringify(res));
          var result = res.data.body;
          var ul = document.getElementById("weather");
          if (result.status != "success") {
            let str = "<div class='el-col el-col-6' style='text-align: center;'>请输入正确地址</div>";
            ul.innerHTML = str;
          } else {
            var weather_data = result.results[0]["weather_data"];
            var city = result.results[0]["currentCity"];
            var strli = "";
            for (let n = 0; n < weather_data.length; n++) {
              if (n < 3) {
                var pngs = "";
                if (weather_data[n].dayPictureUrl.indexOf("duoyun")) {
                  pngs = "../../static/img/overcast.svg' type='image/svg+xml";
                }
                else if (weather_data[n].dayPictureUrl.indexOf("qing")) {
                  pngs = "../../static/img/sun.svg' type='image/svg+xml";
                }
                else if (weather_data[n].dayPictureUrl.indexOf("yin")) {
                  pngs = "../../static/img/overcast.svg' type='image/svg+xml";
                }
                else if (weather_data[n].dayPictureUrl.indexOf("xue")) {
                  pngs = "../../static/img/snow.svg' type='image/svg+xml";
                }
                else if (weather_data[n].dayPictureUrl.indexOf("yu")) {
                  pngs = "../../static/img/cloud.svg' type='image/svg+xml";
                } else {
                  pngs = "../../static/img/windy.svg' type='image/svg+xml";
                }

                strli += "<div class='el-col el-col-6' style='text-align: center;'>" + weather_data[n].date.substr(0, 2)
//                                    +"<br/><img src='" + weather_data[n].dayPictureUrl+"'>"
                  + "<br/><embed src='" + pngs + "' style='width:25%' />"
//                                    + "<br/>" + weather_data[n].weather
                  + "<br/>" + weather_data[n].temperature
                  + "</div>";
              }
            }
            ul.innerHTML = "  <div class='el-col el-col-6' style='text-align: center;'>" +
              "<div style='float:right;width:80%;padding: 8px 0;'><h2>" + city + "</h2></div>" +
              "</div>" + strli;
          }
        });
      },

    },
  }

</script>


<style>


  .fj_wrap {
    height: 100%;
    color: #fff;
    font-family: "Microsoft YaHei", "微软雅黑", Arial, sans-serif, "Helvetica Neue", Helvetica, "PingFang SC", "Hiragino Sans GB";
    font-weight: 100;
    background-size: 100% 100%;
    background-attachment: fixed;
  }

  .fj_top {
    height: 10%;
    background: rgba(255, 255, 255, 0.03);
    padding: 10px;
  }

  .fj_top_name {
    font-size: 64px;
    text-align: center;

    color: transparent;
    -webkit-text-stroke: 1px rgba(0, 0, 0, 0.7);
    letter-spacing: 0.04em;
  }

  .fj_top_right {

    color: #fff;
    font-size: 20px;
    border-radius: 15px;
    height: 100%;
    text-align: center;
    text-shadow: 1px 1px 1px #fff;

    border-left: 1px solid rgba(255, 255, 255, 0.4);
    border-bottom: 1px solid rgba(255, 255, 255, 0.2);
    border-top: 1px solid rgba(255, 255, 255, 0.4);
    border-right: 1px solid rgba(255, 255, 255, 0.2);
    -webkit-box-shadow: 3px 3px rgba(255, 255, 255, 0.5);
    -moz-box-shadow: 3px 3px rgba(255, 255, 255, 0.5);
    box-shadow: 3px 3px rgba(255, 255, 255, 0.5);
  }

  .fj_content {
    padding: 15px;
    height: 70%;
    background: rgba(255, 255, 255, 0.2);
    font-size: 36px;

  }

  .fj_left {
    height: 100%;
    padding: 10px;
    font-size: 36px;

  }

  .fj_left .wrap_table {
    height: 100%;
    background: #290b00;

  }

  .fj_right {
    height: 100%;
  }

  .fj_right_top {
    height: 100%;

  }

  .fj_right_top img {
    width: 95%;
    height: 95%;
    padding: 2px;
    border: 2px solid rgba(255, 255, 255, 0.2);
    border-radius: 5px;
  }

  .fj_foot {
    height: 20%;
    width: 100%;
    background: rgba(255, 255, 255, 0.05);
    text-align: center;
    padding: 15px 20px;

  }

  .fj_foot_left {
    height: 100%;
    background: rgba(255, 255, 255, 0.2);
    border-radius: 5px;
    background-size: 100% 100%;
    background-image: url(../../../static/img/logo.png);
    opacity: 0.9;

  }

  .fj_foot_right {
    height: 100%;
  }

  .fj_foot_right_top {
    height: 90%;

  }

  .fj_foot_right_top_L {
    height: 100%;
    border: 1px solid rgba(255, 255, 255, 0.2);
    background: rgba(255, 255, 255, 0.03);
    border-radius: 15px;
  }

  .fj_foot_right_top_R {
    height: 100%;
    background: rgba(0, 0, 0, 0.1);
    opacity: 0.8;
  }

  .fj_foot_right_bottom {
    height: 10%;
  }

  /*table*/
  .item_width {
    width: 100%;
  }

  .wraptable {
    height: 100%;
  }

  table {
    border: 0;
    border-collapse: collapse;
    table-layout: fixed;
    width: 100%;
  }

  tr {
    width: 100%;

    border-bottom: 1px solid rgba(255, 255, 255, 0.1);

  }

  th {
    text-align: center;
    padding: 20px 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }

  td {
    text-align: center;
    padding: 20px 10px;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }


</style>
