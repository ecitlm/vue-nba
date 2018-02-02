<template>
  <div class="tabbar">
    <mt-tabbar v-model="selected">
      <mt-tab-item id="赛事直播">
        <router-link to="/home" slot="">
          <i class="iconbar icon-playing icon-playing-active"></i>
          赛事直播
        </router-link>
      </mt-tab-item>
      <mt-tab-item id="NBA资讯">
        <router-link to="/news">
          <i class="iconbar icon-news icon-news-active"></i>
          NBA资讯
        </router-link>
      </mt-tab-item>

      <mt-tab-item id="球队战绩">
        <router-link to="/rank">
          <i class="iconbar icon-rank icon-rank-active"></i>
          球队战绩
        </router-link>
      </mt-tab-item>

      <mt-tab-item id="数据统计">
        <router-link to="/statistics">
          <i class="iconbar icon-stats icon-stats-active"></i>
          数据统计
        </router-link>
      </mt-tab-item>
    </mt-tabbar>
  </div>

</template>

<script>
  import Vue from 'vue'
  import {
    Tabbar,
    TabItem
  } from 'mint-ui';

  Vue.component(Tabbar.name, Tabbar);
  Vue.component(TabItem.name, TabItem);
  export default {
    name: 'tabbar',
    data() {
      return {
        selected: true
      }
    }
  }
</script>
<style>
  .tabbar {
    position: fixed;
    bottom: 0;
    left: 0;
    width: 100%;
  }
</style>
