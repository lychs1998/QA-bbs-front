<template>
  <Card style="margin:20px 20px;">
    <h1 style="text-align:center;margin:100px 0" slot="title">404 Page Not Found</h1>
    <h2 id="hitokoto" style="text-align:center">:D 获取中...</h2>
  </Card>
</template>
<script>
  fetch('https://v1.hitokoto.cn')
    .then(function (res){
      return res.json();
    })
    .then(function (data) {
      var hitokoto = document.getElementById('hitokoto');
      hitokoto.innerText = data.hitokoto; 
    })

export default {
  
}
</script>
