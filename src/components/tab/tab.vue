<template>
    <div class='tab'>
        
    </div>
</template>

<script>
    export default {
        
    }
</script>

<style scoped lang='less'>
    @import '../../common/less/variable.less';
    .tab {
        display :flex;
        height :44px;
        line-height:44px;
        font-size : @font-size-medium
    }
    
    .tab-item {
        flex:1;
        text-align:center;
        .tab-link {
            padding-bottom :5px;
            color: @color-text-1
        }
        &.router-link-active {
            .tab-link {
                color : @color-theme;
                border-bottom :2px solid @color-theme
            }           
        }         
    }
      
</style>