<template>
  <div class="web-navigation">
    <div class="web-navigation__header">
      <router-link to="/main/vodpopular">
        <span class="web-navigation__logo">
          <img src="@/assets/images/KOMENTA_logo.png" alt="" />
        </span>
      </router-link>
    </div>
    <div class="web-navigation__userInfo">
      <div class="web-navigation__userProfile">
        <img :src="getProfile(userInfo.u_profile_pic)" alt="">
      </div>
      <div class="web-navigation__userText">
        <p class="web-navigation__userNickName" v-text="getUserNickName(userInfo.u_nickname)"></p>
        <p class="web-navigation__userId" v-text="userInfo.u_email"></p>
      </div>
    </div>
    <div class="web-navigation__scrollable">
      <ul class="web-navigation__nav-list">
        <div class="web-navigation__nav">
          <li class="web-navigation__nav-list-item">
            <router-link to="/main/vodpopular">
              <span class="sidebar-scrollable-title">
                <span class="sidebar-scrollable-title-icon icon-bg5"
                  ><i class="fas fa-home"></i
                ></span>
                <span class="sidebar-scrollable-title-text">Home</span>
              </span>
            </router-link>
          </li>

          <li class="web-navigation__nav-list-item">
            <router-link :to="{ name: 'MyPlayList' }">
              <span class="sidebar-scrollable-title">
                <span class="sidebar-scrollable-title-icon icon-bg5"
                  ><i class="far fa-folder-open"></i
                ></span>
                <span class="sidebar-scrollable-title-text">Subscriptions</span>
              </span>
            </router-link>
          </li>
          <li class="web-navigation__nav-list-item">
            <router-link :to="{ name: 'Category' }">
              <span class="sidebar-scrollable-title">
                <span class="sidebar-scrollable-title-icon icon-bg5"
                  ><i class="far fa-play-circle"></i
                ></span>
                <span class="sidebar-scrollable-title-text">ALL Video</span>
              </span>
            </router-link>
          </li>
        </div>

        <div class="web-navigation__nav">
          <span id="sub-group">SOCIAL</span>
          <li class="web-navigation__nav-list-item">
            <router-link :to="{ name: 'People' }">
              <span class="sidebar-scrollable-title">
                <span class="sidebar-scrollable-title-icon icon-bg5"
                  ><i class="fas fa-globe"></i
                ></span>
                <span class="sidebar-scrollable-title-text">People</span>
              </span>
            </router-link>
          </li>
          <li class="web-navigation__nav-list-item">
            <router-link :to="{ name: 'Feed', params: { id: userInfo.u_id } }">
              <span class="sidebar-scrollable-title">
                <span class="sidebar-scrollable-title-icon icon-bg5"
                  ><i class="fas fa-user-circle"></i
                ></span>
                <span class="sidebar-scrollable-title-text">My Feed</span>
              </span>
            </router-link>
          </li>
          <li class="web-navigation__nav-list-item">
            <router-link :to="{ name: 'MyPage'}">
              <span class="sidebar-scrollable-title">
                <span class="sidebar-scrollable-title-icon icon-bg5">
                  <font-awesome-icon :icon="['fas', 'user-cog']" :style="{ color: '#fa233b' }"/>
                </span>
                <span class="sidebar-scrollable-title-text">My Page</span>
              </span>
            </router-link>
          </li>
        </div>

        <div class="web-navigation__nav">
          <span id="sub-group">PLAYLISTS</span>
          <li
            class="web-navigation__nav-list-item"
            v-for="(my, index) in myPlayList"
            :key="index"
            @click="reload(my[0].pl_id)"
          >
            <router-link
              :to="{ name: 'PlayListDetail', params: { id: my[0].pl_id } }" 
            >
              <span class="sidebar-scrollable-title">
                <span class="sidebar-scrollable-title-icon icon-bg5"
                  ><i class="far fa-file-video"></i
                ></span>
                <span class="sidebar-scrollable-title-text">{{
                  my[0].pl_name
                }}</span>
              </span>
            </router-link>
          </li>
        </div>
      </ul>
    </div>
    <div class="logout-btn">
      <button @click="logout">LOGOUT</button>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
  methods: {
    reload(id) {
      this.$router.push(`/playlist/${id}`);
    },
    logout() {
        this.$swal({
        icon:'question',
        text: '로그아웃 하시겠습니까?',
        showCancelButton: true,
        customClass: {
          container: 'swal2-container'
        },
        confirmButtonText: '로그아웃',
        confirmButtonColor: "#fc3c44",
      }).then((result) => {
        if(result.value) {
          this.$swal({
            text: '로그아웃했습니다.',
            icon: 'success',
            timer: 1300,
            customClass: {
          container: 'swal2-container'
        },
            showConfirmButton: false,
          }).then(()=>{
            this.$store.commit('logout')
            window.location.href = '/'

          })
        } 
      })
     
    },
    getProfile(profile) {
      return `${process.env.VUE_APP_PICTURE}profile/${profile.split('.')[0]}`;
    },
    getUserNickName(nickname) {
      if(nickname.length > 18) {
        const rename = nickname.substring(0,17)+"... 님";
        return rename;
      }else {
        return nickname+" 님";
      }
    },
  },
  computed: {
    ...mapState({
      userInfo: (state) => state.user.userInfo,
    }),
    ...mapState({
      myPlayList: (state) => state.user.myPlayList,
    }),
  },
  created() {
    const userId = this.userInfo.u_id;
    this.$store.dispatch('FETCH_MYPLAYLIST', userId);
  },
};
</script>
