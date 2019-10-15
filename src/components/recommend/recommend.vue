<template>
  <div class="recommend">
    <div class="recommend-content">
      <div v-if="recommends.length" class="slider-wrapper">
        <slider>
          <div v-for="item in recommends" :key="item.id">
            <a :href="item.linkUrl">
              <img :src="item.picUrl" />
            </a>
          </div>
        </slider>
      </div>
    </div>
  </div>
</template>

<script>
import { getRecommend } from "../../api/recommend";
import { ERR_OK } from "../../api/config";
import Slider from "../../base/slider/slider";
export default {
  data() {
    return {
      recommends: []
    };
  },
  created() {
    this._getRecommend();
  },
  components: {
    Slider
  },
  methods: {
    _getRecommend() {
      getRecommend().then(res => {
        if (ERR_OK === res.code) {
          this.recommends = res.data.slider;
        }
      });
    }
  }
};
</script>

<style lang="less" scoped>
    @import "../../common/less/variable.less";

    .recommend {
        position: fixed;
        width: 100%;
        top: 88px;
        bottom: 0
    }
    
    .recommend-content {
        height: 100%;
        overflow: hidden;
        .slider-wrapper {
            position: relative;
            width: 100%;
            overflow: hidden;
        }
    }
      
</style>