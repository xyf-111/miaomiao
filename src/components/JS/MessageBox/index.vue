<template>
  <div class='messageBox'>
    <h3>{{title}}</h3>
    <p>{{content}}</p>
    <ul>
      <li @touchstart='handleCancel'>{{cancel}}</li>
      <li @touchstart='handleOk'>{{ok}}</li>
    </ul>
  </div>
</template>

<script>
import { getLocation } from '@/util/location'
export default {}
</script>

<style lang="scss" scoped>
.messageBox {
  width: 220px;
  height: 120px;
  border: 1px solid #ccc;
  box-shadow: 5px 5px 5px #ccc;
  background: white;
  position: absolute;
  top: 50%;
  left: 50%;
  margin: -100px;
  text-align: center;
  border-radius: 5px;
  padding: 10px;
  box-sizing: border-box;
  p {
    font-size: 18px;
    height: 40px;
    line-height: 40px;
  }
  ul {
    width: 100%;
    height: 30px;
    line-height: 30px;
    position: absolute;
    bottom: 0;
    left: 0;
    display: flex;
    margin: 0;
    li {
      flex-grow: 1;
      width: 50%;
      border: 1px solid #ccc;
      text-align: center;
    }
  }
}
</style>