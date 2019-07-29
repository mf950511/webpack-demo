<template>
  <div class="vue">
    {{text}}
    <test></test>
  </div>
</template>
<script>
import Test from './main.vue'
export default {
  data(){
    return {
      text: '我是vue'
    }
  },
  components: {
    Test
  }
}
</script>


<style lang="sass" scoped>
.vue{
  background: #00f;
}
</style>

