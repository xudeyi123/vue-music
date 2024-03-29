<template>
    <transition name="list-fade">
        <div v-show="showFlag" class="playlist" @click="hide">
            <div class="list-wrapper" @click.stop>
                <div class="list-header">
                    <h1 class="title">
                        <i class="icon" :class="iconMode" @click="changeMode"></i>
                        <span class="text">{{modeText}}</span>
                        <span class="clear"><i class="icon-clear"></i></span>
                    </h1>
                </div>
            </div>
        </div>
    </transition>
</template>

<script>
import { playMode } from "../../common/js/config";
import { mapGetters, mapMutations } from 'vuex';
export default {
    data() {
        return {
            showFlag: false
        };
    },
    methods: {
        show() {
            this.showFlag = true;
        },
        hide() {
            this.showFlag = false;
        },
        changeMode(){
            const mode = (this.mode + 1)%3
            this.setMode(mode)
        },
        ...mapMutations({
            setMode: "SET_MODE"
        })
    },
    computed:{
        iconMode() {
            return this.mode === playMode.sequence
                ? "icon-sequence"
                : this.mode === playMode.loop
                ? "icon-loop"
                : this.mode === playMode.random
                ? "icon-random"
                : "";
        },
        modeText() {
        return this.mode === playMode.sequence ? '顺序播放' : this.mode === playMode.random ? '随机播放' : '单曲循环'
        },
        ...mapGetters(
            ["mode"]
        )
    }
};
</script>

<style lang="less" scoped>
@import "../../common/less/variable.less";
@import "../../common/less/mixin.less";
.playlist {
    position: fixed;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    z-index: 200;
    background-color: @color-background-d;
    &.list-fade-enter-active,
    &.list-fade-leave-active {
        transition: opacity 0.3s;
        .list-wrapper {
            transition: all 0.3s;
        }
    }
    &.list-fade-enter,
    &.list-fade-leave-to {
        opacity: 0;
        .list-wrapper {
            transform: translate3d(0, 100%, 0);
        }
    }

    .list-wrapper {
        position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        background-color: @color-highlight-background;
        .list-header {
            position: relative;
            padding: 20px 30px 10px 20px;
            .title {
                display: flex;
                align-items: center;
                .icon {
                    margin-right: 10px;
                    font-size: 30px;
                    color: @color-theme-d;
                }
                .text {
                    flex: 1;
                    font-size: @font-size-medium;
                    color: @color-text-l;
                }

                .clear {
                    .extend-click();
                    .icon-clear {
                        font-size: @font-size-medium;
                        color: @color-text-d;
                    }
                }
            }
        }
    }
}

.list-content {
    max-height: 240px;
    overflow: hidden;
}

.item {
    display: flex;
    align-items: center;
    height: 40px;
    padding: 0 30px 0 20px;
    overflow: hidden;
}

&.list-enter-active,
&.list-leave-active {
    transition: all 0.1s;
}

&.list-enter,
&.list-leave-to {
    height: 0;
}

.current {
    flex: 0 0 20px;
    width: 20px;
    font-size: @font-size-small;
    color: @color-theme-d;
}

.text {
    flex: 1;
    .no-wrap();
    font-size: @font-size-medium;
    color: @color-text-d;
}

.like {
    .extend-click();
    margin-right: 15px;
    font-size: @font-size-small;
    color: @color-theme;
}

.icon-favorite {
    color: @color-sub-theme;
}

.delete {
    .extend-click();
    font-size: @font-size-small;
    color: @color-theme;
}

.list-operate {
    width: 140px;
    margin: 20px auto 30px auto;
}

.add {
    display: flex;
    align-items: center;
    padding: 8px 16px;
    border: 1px solid @color-text-l;
    border-radius: 100px;
    color: @color-text-l;
}

.icon-add {
    margin-right: 5px;
    font-size: @font-size-small-s;
}

.text {
    font-size: @font-size-small;
}

.list-close {
    text-align: center;
    line-height: 50px;
    background: @color-background;
    font-size: @font-size-medium-x;
    color: @color-text-l;
}
</style>