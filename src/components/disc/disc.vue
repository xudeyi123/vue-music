<template>
    <transition name="slide">
        <music-list :songs="songs" :title="title" :bgImage="bgImage"></music-list>
    </transition>
</template>

<script>
import MusicList from "../music-list/music-list";
import { mapGetters } from "vuex";
import { getSongList } from "../../api/recommend";
import { ERR_OK } from "../../api/config";
import {
    createSong,
    processSongsUrl,
    isValidMusic
} from "../../common/js/song";
export default {
    data() {
        return {
            songs: []
        };
    },
    components: {
        MusicList
    },
    computed: {
        title(){
            return this.disc.dissname
        },
        bgImage(){
            return this.disc.imgurl
        },
        ...mapGetters([
        'disc'
      ])
    },
    created() {
        this._getSongList()
    },
    methods:{
        
        _getSongList(){
            if(!this.disc.dissid){
                this.$router.push({
                    path:'/recommend'
                })
            }
            getSongList(this.disc.dissid).then(res=>{
                if (res.code === ERR_OK) {
                    
                    processSongsUrl(this._normalizeSongs(res.cdlist[0].songlist)).then(
                        songs => {
                            this.songs = songs;
                        }
                    );
                }
            })
        },
        _normalizeSongs(list) {
            let ret = [];
            list.forEach(item => {
                if (isValidMusic(item)) {
                    ret.push(createSong(item));
                }
            });
            return ret;
        }
    }
};
</script>

<style lang="less" scoped>
.slide-enter-active,
.slide-leave-active {
    transition: all 0.3s;
}

.slide-enter,
.slide-leave-to {
    transform: translate3d(100%, 0, 0);
}
</style>