<template>
    <div ref="wrapper">
        <slot></slot>
    </div>
</template>

<script>
import BScroll from "better-scroll";

export default {
    props: {
        probeType: {
            type: Number,
            default: 1
        },
        click: {
            type: Boolean,
            default: true
        },
        scrollX: {
            type: Boolean,
            default: false
        },
        
    }
};
</script>

<style lang="less" scoped>
</style>