<template>
    <div class="song-list">
        <ul>
            <li class="item" v-for="(song,index) in songs" :key="index" @click="selectItem(song,index)">
                <div class="content">
                    <h2 class="name">{{song.name}}</h2>
                    <p class="desc">{{getDesc(song)}}</p>
                </div>
            </li>
        </ul>
    </div>
</template>

<script>
export default {
    props: {
        songs: {
            type: Array,
            default: () => []
        }
    },
    methods: {
        getDesc(song) {
            return `${song.singer}.${song.album}`;
        },
        selectItem(song,index) {
            this.$emit('select',song,index)
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../common/less/variable.less";
@import "../../common/less/mixin.less";

.song-list {
    .item {
        display: flex;
        align-items: center;
        box-sizing: border-box;
        height: 64px;
        font-size: @font-size-medium;
        .content {
            flex: 1;
            line-height: 20px;
            overflow: hidden;
            .name {
                .no-wrap();
                color: @color-text;
            }
            .desc {
                .no-wrap();
                margin-top: 4px;
                color: @color-text-d;
            }
        }
    }
}
</style>