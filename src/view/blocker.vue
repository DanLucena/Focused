<template>
  <div class="page-block">
    <h1>Focus Time</h1>
    <figure class="center-image">
      <img src="https://i.pinimg.com/originals/5f/93/49/5f934966a1d20bae1909c9ef2278bd4c.gif" alt="lazy cat gif"/>
    </figure>
    <span>Don't give up, you're doing a great job, stay focused and you'll achieve all your goals.</span>
  </div>
</template>

<script>
export default {
  name: 'testView',
}
</script>

<style scoped>
  @import url('https://fonts.googleapis.com/css2?family=Chakra+Petch:wght@300;400;500;600;700&family=Inconsolata:wght@200;300;400;500;600;700;800;900&family=Space+Grotesk:wght@300;400;500;600;700&display=swap');
  .page-block {
    font-family: 'Space Grotesk', sans-serif;
    width: 100vw;
    height: 100vh;
    background-image: url('https://i.ibb.co/2vw954h/wait2.png');
    position: fixed;
    z-index: 9999;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .page-block-dark-theme {
    font-family: 'Space Grotesk', sans-serif;
    width: 100vw;
    height: 100vh;
    background-image: url('https://i.ibb.co/GV5YzSd/wait-dark-theme.png');
    position: fixed;
    z-index: 9999;
    flex-direction: column;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  figure{
    width:300px;
    overflow:hidden;
    margin:-20px 0 15px 0;
  }
  figure img{
    display:block;
    width:100%;
    margin: -10.875% 0 0 0;
  }
  h1{
    font-size: 32px;
    margin-bottom: 20px;
    color: #000;
  }
  span {
    max-width: 600px;
    text-align: center;
    font-size: 16px;
    color: #000;
  }
</style>