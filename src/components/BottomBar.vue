<template>
  <div class="footer-bottom">
    <v-layout ml-0 pl-0 row style="padding: 0; margin: 0;">
      <!-- connect icons -->
      <v-flex xs12 shrink>
        <v-btn ma-0 pa-0 text icon color="gray" @click="openTwitter">
          <v-icon ma-0 pa-0 size="20px">fab fa-twitter</v-icon>
        </v-btn>
        <v-btn ma-0 pa-0 text icon color="gray" @click="openLinkedIn">
          <v-icon ma-0 pa-0 size="20px">fab fa-linkedin</v-icon>
        </v-btn>
        <v-btn ma-0 pa-0 text icon color="gray" @click="openGitHub">
          <v-icon ma-0 pa-0 size="20px">fab fa-github</v-icon>
        </v-btn>
      </v-flex>
    </v-layout>
    <div class="text-xs-center">
      <v-btn ma-0 pa-0 text color="gray" style="text-align: center" @click="openLinkedIn">
        <p style="text-align: center">Theodore Galanos & Petr Mitev - 2019</p>
      </v-btn>
    </div>
  </div>
</template>

<script>
export default {
  name: "BottomBar",
  methods: {
    openGitHub() {
      window.open("https://github.com/mitevpi", "_blank");
      window.open("https://github.com/TheodoreGalanos", "_blank");
    },
    openLinkedIn() {
      window.open("https://www.linkedin.com/in/theodorosgalanos", "_blank");
      window.open("https://www.linkedin.com/in/petar-mitev/", "_blank");
    },
    openTwitter() {
      window.open("https://twitter.com/TheodoreGalanos", "_blank");
      window.open("https://twitter.com/mitevpi", "_blank");
    }
  }
};
</script>
<style scoped>
.footer-bottom {
  position: absolute;
  bottom: 0;
  width: 100%;
  overflow: hidden;
  /* height: 2.5rem; */
}
.footer-icon {
  position: absolute;
}
</style>
