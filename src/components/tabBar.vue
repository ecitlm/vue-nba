<template>
  <div class="tabbar">
    <mt-tabbar v-model="selected">
      <mt-tab-item id="赛事直播">
        <span slot="icon" ></span>
        赛事直播
      </mt-tab-item>
      <mt-tab-item id="NBA资讯">
        <span slot="icon" ></span>
        NBA资讯
      </mt-tab-item>
      <mt-tab-item id="球队战绩">
        <span slot="icon" ></span>
        球队战绩
      </mt-tab-item>
      <mt-tab-item id="数据统计">
        <span slot="icon" ></span>
        数据统计
      </mt-tab-item>
    </mt-tabbar>
  </div>

</template>

<script>
  import Vue from 'vue'
  import { Tabbar, TabItem } from 'mint-ui';
  Vue.component(Tabbar.name, Tabbar);
  Vue.component(TabItem.name, TabItem);
  export default {
    name: 'tabbar',
    data () {
      return {
        selected: true
      }
    }
  }
</script>
<style>
  .tabbar{
    position: fixed;
    bottom:0;
    left:0;
    width:100%;
  }
</style>
