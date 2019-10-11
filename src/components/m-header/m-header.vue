<template>
    <div class='m-header'>
        <div class="icon"></div>
        <h1 class="text">动感 Music</h1>
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang="less">
    @import "../../common/less/variable.less";
    @import "../../common/less/mixin.less";

    .m-header {
        position:relative;
        height:44px;
        text-align :center;
        color :@color-theme;
        font-size :0
    }
    
    .icon {
        display :inline-block;
        vertical-align :top;
        margin-top:6px;
        width:30px;
        height :32px;
        margin-right:9px;
        .bg-image('./img/logo');
        background-size :30px 32px;
    }
      
    .text { 
        display :inline-block;
        vertical-align :top;
        line-height :44px;
        font-size:@font-size-large;
    }
      
</style>