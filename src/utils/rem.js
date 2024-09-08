//rem等比适配配置文件
(function () {
  setRem()
  window.addEventListener("resize", resizeThrottler, false);
  let resizeTimeout;

  function resizeThrottler() {
    // ignore resize events as long as an actualResizeHandler execution is in the queue
    if (!resizeTimeout) {
      resizeTimeout = setTimeout(function () {
        resizeTimeout = null;
        setRem();
        // The actualResizeHandler will execute at a rate of 15fps
      }, 66);
    }
  }

  //设置 rem 函数
  function setRem() {
    //基准大小
    const baseSize = 100
    //当前页面宽度相对于1920宽的缩放比例, 可根据自己需要修改
    const clientWidth = document.documentElement.clientWidth
    let scale = 1;

    if (clientWidth < 900) {
      scale = 0.8
    } else if (clientWidth < 1792) {
      scale = 1
    } else if (clientWidth < 2560) {
      scale = 1.3
    } else {
      scale = 1.5
    }
    //设置页面根节点字体大小, 字体大小最小为12
    let fontSize = baseSize * Math.min(scale, 2) > 12 ? baseSize * Math.min(scale, 2) : 12
    document.documentElement.style.fontSize = fontSize + 'px'
  }
})()






