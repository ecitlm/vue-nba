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
        <div class="lincoapp-nba-table1" v-if="list.sec_scores[0]">
            <span>球队</span>
            <span>1节</span>
            <span>2节</span>
            <span>3节</span>
            <span>4节</span>
            <span v-if="5<=list.sec_scores.length">OT1</span>
            <span>总分</span>
        </div>

        <div v-if="list.sec_scores[0].score2 !=0" style="width: 100%">
          <div class="querare">
            <span><img :src="list.t1_icon" alt="" class="small-logo"></span>
            <template v-for="list in list.sec_scores" v-if="!list.sec_scores">
              <span> {{ list.score1}}</span>
            </template>
            <span>{{list.t1_point}}</span>
          </div>
          <div class="querare">
            <span><img :src="list.t2_icon" alt="" class="small-logo"></span>
            <template v-for="list in list.sec_scores" v-if="!list.sec_scores">
              <span> {{ list.score2}}</span>
            </template>
            <span>{{list.t2_point}}</span>
          </div>
        </div>
        <!--本场最佳球员-->
        <div class="top-player" v-if="technical.topplayer">
          <ul class="top-player-header">
            <li style="text-align: left" class="top-player-header-item">{{list.t1_name}}</li>
            <li class="team-data">球员</li>
            <li style="text-align: right" class="top-player-header-item">{{list.t2_name}}</li>
          </ul>
          <div class="data-wrap">
            <div class="top-player-item left" v-if="technical.topplayer">
              <router-link v-for="list in technical.topplayer.visit"
                           :to="{ path: 'player_detail', query: { playerid: list.id }}">
                <li>{{list.name || "=="}}<span class="right">{{list.value || "=="}}</span></li>
              </router-link>
            </div>
            <div class="top-player-title left">
              <li>得分</li>
              <li>篮板</li>
              <li>助攻</li>
              <li>抢断</li>
              <li>盖帽</li>
              <li>犯规</li>
              <li>失误</li>
            </div>
            <div class="top-player-item right" v-if="technical.topplayer">
              <router-link v-for="list in technical.topplayer.home"
                           :to="{ path: 'player_detail', query: { playerid: list.id }}">
                <li><span>{{list.value || "=="}}</span> <span class="right">{{list.name || "=="}}</span></li>
              </router-link>
            </div>
          </div>

        </div>

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
        list: null,
        content: [],
        technical: null
      }
    },
    activated() {
      this.list = [];
      this.content = []
      this.live_detail()
      this.live_content()
      this.technical_statistics()
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
      technical_statistics() {
        api.technical_statistics({
          schid: this.$route.query.schid
        })
          .then(function (res) {
            console.log(res)
            this.technical = res.data ;
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
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
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

  .data-title {
    font-size: 16px;
    box-sizing: border-box;
    padding: 10px 15px;
  }



  .lincoapp-nba-table1{
    display: flex;
    background: #f4f4f4;
    padding:5px 0;

  }
  .lincoapp-nba-table1 span{
    flex:1;
  }


  .top-player-header {
    width: 100%;
    height: 40px;
    background: #f8f8f8;
    padding: 0 15px;
    -webkit-box-sizing: border-box;
    -moz-box-sizing: border-box;
    box-sizing: border-box;
  }

  .top-player-header li {
    float: left;
    text-align: center;
    line-height: 40px;
  }

  .top-player-item, .top-player-header-item {
    width: 37%;
  }

  .top-player-title, .team-data {
    width: 26%;
    text-align: center;
  }

  .top-player-title li, .top-player-item li {
    border-bottom: 1px solid #e3e3e3;
    font-size: 14px;
    overflow: hidden;
    padding: 6px 0;
    line-height: 20px;
    height: 20px;
    overflow: hidden;

  }

  .data-wrap {
    padding: 0 15px;
  }
.querare{
  width:100%;
  display:flex;
}
  .small-logo {
    width: 30px;


  }
  .querare span{
    flex:1;
    text-align: center;
    line-height:25px;
    height:25px;
  }
</style>
