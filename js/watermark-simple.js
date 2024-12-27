class Watermark {
  constructor(options = {}) {
    this.options = {
      text: '水印文字',           // 水印文字
      font: '15px 微软雅黑',     // 字体大小和字体
      color: '#000000',         // 水印颜色
      alpha: 0.08,              // 透明度
      angle: 45,                // 倾斜角度
      density: 20,              // 密度(px)，值越小水印越多
      zIndex: 9999             // 层级
    };

    // 合并配置
    Object.assign(this.options, options);
    
    this.init();
  }

  init() {
    // 创建水印容器
    this.container = document.createElement('div');
    this.container.style.cssText = `
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      pointer-events: none;
      z-index: ${this.options.zIndex};
    `;

    // 创建单个水印
    const stamp = document.createElement('div');
    stamp.textContent = this.options.text;
    stamp.style.cssText = `
      position: absolute;
      transform: rotate(${this.options.angle}deg);
      opacity: ${this.options.alpha};
      font: ${this.options.font};
      color: ${this.options.color};
      white-space: nowrap;
      user-select: none;
    `;

    // 计算水印的大小和位置
    const { density } = this.options;
    const stampWidth = stamp.offsetWidth || 150;
    const stampHeight = stamp.offsetHeight || 100;
    
    // 填充水印
    const rows = Math.ceil(window.innerHeight / density);
    const cols = Math.ceil(window.innerWidth / density);

    for (let y = 0; y < rows; y++) {
      for (let x = 0; x < cols; x++) {
        const clone = stamp.cloneNode(true);
        clone.style.left = `${x * density}px`;
        clone.style.top = `${y * density}px`;
        this.container.appendChild(clone);
      }
    }

    document.body.appendChild(this.container);

    // 监听窗口大小变化
    window.addEventListener('resize', () => this.update());
    
    // 监听DOM变化，防止水印被删除
    this.observer = new MutationObserver(() => {
      if (!document.body.contains(this.container)) {
        document.body.appendChild(this.container);
      }
    });
    
    this.observer.observe(document.body, {
      childList: true,
      subtree: true
    });
  }

  // 更新水印
  update() {
    if (this.container) {
      this.container.remove();
    }
    this.init();
  }

  // 移除水印
  remove() {
    if (this.observer) {
      this.observer.disconnect();
    }
    if (this.container) {
      this.container.remove();
    }
  }
}

// 导出水印类
window.Watermark = Watermark; 