import {mapGetters} from 'vuex'

export const playlistMixin = {
    computed:{
        ...mapGetters([
            "playList"
        ])
    },
    mounted() {
        // this.handlePlaylist(this.playlist)
    },
    activated() {
        // this.handlePlaylist(this.playlist)
    },
    watch: {
        playList(newVal){
            this.handlePlaylist(newVal)
        }
    },
    methods: {
        handlePlaylist(){
            throw new Error('component must implement handlePlaylist method')
        }
    },
}