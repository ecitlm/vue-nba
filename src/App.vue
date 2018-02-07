<template>
<div id="app">
    <mt-header fixed  :title="$route.meta.title">
        <mt-button  icon="back" slot="left" onclick="window.history.back()"></mt-button>
    </mt-header>

   <div class="mt40">
     <keep-alive>
      <router-view/>
     </keep-alive>
   </div>

   <div class="navbar" v-show="$route.meta.navShow">
       <div class="mt60"></div>
        <tab-bar></tab-bar>
   </div>
  </div>
</template>
<script>
    import tabBar from './components/tabBar'
    export default {
        name: 'App',
        data() {
            return {
                navShow: true
            }
        },
        components: {
            tabBar
        },
        deactivated() {
            this.navShow = this.$route.meta.navShow
        }
    }
</script>

<style>
    #app .mint-header {
        background: #00aa98 !important;
        font-size: 18px;
    }
</style>
