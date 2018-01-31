<template>
<div id="app">
    <mt-header fixed  :title="$route.meta.title">
        <mt-button  icon="back" slot="left"></mt-button>
    </mt-header>

   <div class="mt44">
      <router-view/>
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
            console.log(this.$route)
            this.navShow = this.$route.meta.navShow
        }
    }
</script>

<style>
    .mint-header {
        background: #00aa98;
    }
</style>