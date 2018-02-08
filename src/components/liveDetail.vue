<template>
  <div class="liveDetail" v-if="list.length!=0">
    <div class="live-header">
      <div class="header-wrap">
        <div class="team-item left">
          <img :src="list.t1_icon" alt="">
          <p>{{list.t1_name}}</p>
        </div>

        <div class="team-score left">
          <p>{{list.match_status}}{{list.match_time}}</p>
          <strong class="vs-score">{{list.t1_point}} : {{list.t2_point}}</strong>

        </div>

        <div class="team-item left">
          <img :src="list.t2_icon" alt="">
          <p>{{list.t2_name}}</p>
        </div>
      </div>
      <div class="lincoapp-compare2-wrap">
        <div class="progress">
          <div class="t_like_count"
               :style="{  width: list.circleVoteNumLeft*100/(list.circleVoteNumLeft+list.circleVoteNumRight) + '%' }"></div>
        </div>
        <span class="left">{{list.circleVoteNumLeft}}</span>
        <span class="right">{{list.circleVoteNumRight}}</span>
      </div>
    </div>

    <!--swiper-->
    <div class="swiper-wrap">
      <ul class="swiper-tab">
        <li :class="current=='0' ? 'active' : ''" @click="swiperTab(0)">实时</li>
        <li :class="current=='1' ? 'active' : ''" @click="swiperTab(1)">统计</li>
      </ul>
      <div :class="current=='0' ? 'swiper-content' : 'swiper-content hide'">
        <div class="live-info" v-for="item in content">
          <div class="speaker">
            <img :src="item.speaker_data.icon">
            <span class="live-speaker">{{item.speaker}}</span>
            <span class="cur-time">{{item.time}}</span>
            <span class="right">{{item.suffix}}</span>
          </div>
          <div class="content-des">
            <p>{{item.content}}</p>
            <img :src="item.image_src" v-if="item.image_src">
          </div>

          <div class='img-msg' v-if="item.match_data[0]">
            <p>{{item.match_data[0].title}}</p>
            <img class='img-msg-image' :src='item.match_data[0].pic'>
          </div>
        </div>
      </div>

      <div :class="current=='1' ? 'swiper-content' : 'swiper-content hide'">
        <div class="data-title">实时赛况</div>
        <table class="lincoapp-nba-table1" v-if="list.sec_scores[0]">
          <thead>
          <tr>
            <td>球队</td>
            <td>1节</td>
            <td>2节</td>
            <td>3节</td>
            <td>4节</td>
            <td>总分</td>
          </tr>
          </thead>
          <tbody>
          <tr>
            <td><img :src="list.t1_icon" alt=""></td>
            <td>{{list.sec_scores[0]['score1'] || 0}}</td>
            <td>{{list.sec_scores[1]['score1'] || 0}}</td>
            <td>{{list.sec_scores[2]['score1'] || 0}}</td>
            <td>{{list.sec_scores[3]['score1'] || 0}}</td>
            <td>{{list.t1_point}}</td>
          </tr>
          <tr>
            <td><img :src="list.t2_icon" alt=""></td>
            <td>{{list.sec_scores[0]['score2'] || 0}}</td>
            <td>{{list.sec_scores[1]['score2'] || 0}}</td>
            <td>{{list.sec_scores[2]['score2'] || 0}}</td>
            <td>{{list.sec_scores[3]['score2'] || 0 }}</td>
            <td>{{list.t2_point}}</td>
          </tr>

          </tbody>
        </table>

      </div>
    </div>

  </div>
</template>

<script>
  import Vue from 'vue'
  import {
    Navbar,
    TabItem
  } from 'mint-ui';
  import api from '../utils/api'

  Vue.component(Navbar.name, Navbar);
  Vue.component(TabItem.name, TabItem);
  import {
    Indicator
  } from 'mint-ui';

  export default {
    data() {
      return {
        current: "0",
        list: [],
        content: [],
        technical:[]
      }
    },
    activated() {
      this.list = [];
      this.content = []
      this.live_detail()
      this.live_content()
    },
    methods: {
      swiperTab(id) {
        this.current = id;
        if (id == 0) {

          this.live_content()
          this.live_detail()
          Indicator.open('刷新中...');
        }
      },
      live_detail() {
        Indicator.open('加载中...');
        api.live_detail({
          schid: this.$route.query.schid,
          liveid: this.$route.query.liveid
        })
          .then(function (res) {
            this.list = res.data;
            Indicator.close();
          }.bind(this)).catch(function (error) {
          console.log(error)
        })
      },
      live_content() {
        api.live_content({
          schid: this.$route.query.schid
        })
          .then(function (res) {
            console.log(res)
            this.content = res.data;
            Indicator.close();
          }.bind(this)).catch(function (error) {
          console.log(error)
        })
      },
      technical_statistics(){
        api.technical_statistics({
          schid: this.$route.query.schid
        })
          .then(function (res) {
            console.log(res)
            this.technical = res.data;
            Indicator.close();
          }.bind(this)).catch(function (error) {
          console.log(error)
        })
      }

    }
  }
</script>

<style scoped>
  .live-header {
    height: 168px;
    background: url("https://3gimg.qq.com/wap30/infoapp/touch/nba_new/images/gameinfo2/img/bg.png");
    text-align: center;
    color: #FFF;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
    padding: 20px 0;
  }

  .header-wrap {
    width: 100%;
    height: 80px;
  }

  .team-item {
    width: 30%;
    font-size: 14px;
  }

  .team-score {
    width: 40%;
  }

  .team-item img {
    height: 60px;
  }

  .vs-score {
    font-size: 24px;
    line-height: 40px;
  }

  .team-score p {
    line-height: 40px;
  }

  .lincoapp-compare2-wrap {
    padding: 0 30px;
    margin-top: 20px;
    height: 4px;
    box-sizing: border-box;
    width: 100%;
    clear: both;

  }

  .progress {
    width: 100%;
    height: 4px;
    background: #ff6800;
    clear: both;
    -webkit-border-radius: 3px;
    -moz-border-radius: 3px;
    border-radius: 3px;
    position: relative;
  }

  .progress span {
    line-height: 24px;
  }

  .t_like_count {
    height: 4px;
    position: absolute;
    left: 0;
    width: 30%;
    background: red;
    border-radius: 3px;
  }

  .swiper-tab {
    display: flex;
    width: 100%;
    border-bottom: 1px solid #e3e3e3;
  }

  .swiper-tab li {
    flex: 1;
    text-align: center;
    padding: 10px 0;
  }

  .swiper-tab li.active {
    color: #00aa98;
  }

  .swiper-content {
    width: 100%;

    box-sizing: border-box;
  }

  div.hide {
    display: none;
  }

  .live-info {
    margin-top: 10px;
    padding: 0 15px;
  }

  .live-info .speaker {
    line-height: 30px;
  }

  .live-info .speaker img {
    width: 30px;
    height: 30px;
    -webkit-border-radius: 50%;
    -moz-border-radius: 50%;
    border-radius: 50%;
    float: left;
    margin-right: 10px;
    border: 1px solid #e3e3e3;
  }

  .live-speaker {
    color: #00aa98;
    font-size: 14px;
  }

  .cur-time {
    font-size: 16px;
    color: #333;
  }

  .content-des p {
    font-size: 14px;
    line-height: 22px;
  }

  .content-des img {
    width: 100%;
    margin-top: 5px;
  }

  .img-msg {
    font-size: 14px;
  }

  .img-msg-image {
    width: 100%;
  }

  .lincoapp-nba-table1 {
    width: 100%;
    text-align: center;
    border-collapse: collapse;
    border-spacing: 0;
  }
.data-title{
  font-size:16px;
  box-sizing: border-box;
  padding:10px 15px ;
}
  .lincoapp-nba-table1 thead {
    border-bottom: 1px solid #e8e8e8;
    font-size:14px;
  }

  .lincoapp-nba-table1 thead tr {
    background: #f8f8f8;
    line-height:30px;

  }
  .lincoapp-nba-table1  td img{
    width:30px;
  }
  .lincoapp-nba-table1  tr{
    border-bottom:1px solid #e3e3e3;
  }
</style>
