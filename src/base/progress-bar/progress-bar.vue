<template>
    <div class="progress-bar" ref="progressBar" @click="progressClick">
        <div class="bar-inner">
            <div class="progress" ref="progress"></div>
            <div class="progress-btn-wrapper" ref="progressBtn"
                @touchstart.prevent = "progressTouchStart"
                @touchmove.prevent = "progressTouchMove"
                @touchend = "progressTouchEnd"
                
            >
                <div class="progress-btn"></div>
            </div>
        </div>
    </div>
</template>

<script>
import {prefixStyle } from '../../common/js/dom';
const transform = prefixStyle("transform");
const progressBtnWidth = 16
export default {
    props: {
        percent: {
            type: Number,
            default: 0
        }
    },
    created(){
        this.touch = {}
    },
    methods: {
        progressTouchStart(e){
            this.touch.initiated = true
            this.touch.startX = e.touches[0].pageX
            this.touch.left = this.$refs.progress.clientWidth
        },
        progressTouchMove(e){
            // console.log("move----------->",e)
            if(!this.touch.initiated) {
                return
            }
            const delatX = e.touches[0].pageX - this.touch.startX
            const offsetWidth = Math.min(this.$refs.progressBar.clientWidth - progressBtnWidth,Math.max(0,this.touch.left + delatX))
            this._offset(offsetWidth)
        },
        progressTouchEnd(e){
            console.log("end------------->",e)
            this.touch.initiated = false
            this._triggerPercent()
        },
        progressClick(e){
            // console.warn(e)
            const rect = this.$refs.progressBar.getBoundingClientRect()
            const offsetWidth = e.pageX - rect.left
            this._offset(offsetWidth)
            this._triggerPercent()
        },
        _offset(offsetWidth){
            this.$refs.progress.style.width = `${offsetWidth}px`
            this.$refs.progressBtn.style[transform] = `translate3D(${offsetWidth}px,0,0)`
        },
        _triggerPercent(){
            const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
            const percent = this.$refs.progress.clientWidth / barWidth
            // debugger;
            this.$emit("percentChange", percent )
        }
    },
    watch:{
        percent(newPercent){
            if(newPercent >= 0 && !this.touch.initiated ){
                const barWidth = this.$refs.progressBar.clientWidth - progressBtnWidth
                const offsetWidth = barWidth*newPercent
                this._offset(offsetWidth)
            }
        }
    }
};
</script>

<style lang="less" scoped>
@import "../../common/less/variable.less";
.progress-bar {
    height: 30px;
    .bar-inner {
        position: relative;
        top: 13px;
        height: 4px;
        background: rgba(0, 0, 0, 0.3);
        .progress {
            position: absolute;
            height: 100%;
            background: @color-theme;
        }
        .progress-btn-wrapper {
            position: absolute;
            left: -8px;
            top: -13px;
            width: 30px;
            height: 30px;
            .progress-btn {
                position: relative;
                top: 7px;
                left: 7px;
                box-sizing: border-box;
                width: 16px;
                height: 16px;
                border: 3px solid @color-text;
                border-radius: 50%;
                background: @color-theme;
            }
        }
    }
}
</style>