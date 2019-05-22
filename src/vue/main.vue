<template>
  <div class="main">{{text}}</div>
</template>
<script>
export default {
  data(){
    return {
      text: '我是另一个Vue'
    }
  }
}
</script>

<style lang="sass" scoped>
.main{
  background: #ff0;
}
</style>

