<template>
    <div class="loading">
        <img src="./loading.gif" alt="" width="24" height="24">
        <p class="desc">{{title}}</p>
    </div>
</template>

<script>
    export default {
        props: {
            title: {
                type: String,
                default: '正在加载中...'
            }
        }
    }
</script>

<style lang="less" scoped>
    @import '../../common/less/variable.less';

    .loading {
        width: 100%;
        text-align: center;
        .desc {
            line-height: 20px;
            color: @color-text-l;
            font-size: @font-size-small
        }
    }
</style>