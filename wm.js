// 水印文本
const watermarkText = "浙江卡盟";

// 水印透明度
const watermarkAlpha = 0.1; 

// 水印旋转角度
const watermarkAngle = 45; 

// 获取页面宽高
const pageWidth = document.body.clientWidth;
const pageHeight = document.body.clientHeight;

// 创建水印 DIV
const watermarkDiv = document.createElement('div');
watermarkDiv.id = 'watermark';
watermarkDiv.style.pointerEvents = 'none';
document.body.appendChild(watermarkDiv);

// 根据页面宽高设置水印 DIV 大小
watermarkDiv.style.width = pageWidth + 'px';
watermarkDiv.style.height = pageHeight + 'px';

// 设置水印文字样式
const span = document.createElement('span');
span.textContent = watermarkText;
span.style.fontFamily = 'Microsoft YaHei';
span.style.fontSize = '18px';
span.style.color = 'rgba(0, 0, 0, ' + watermarkAlpha + ')';
span.style.display = 'inline-block';
span.style.transform = 'rotate(' + watermarkAngle + 'deg)';
watermarkDiv.appendChild(span);

// 根据页面宽高设置水印文字排列
for(let i=0; i<pageWidth; i+=150){
  for(let j=0; j<pageHeight; j+=100){
    const cloneSpan = span.cloneNode(true);
    cloneSpan.style.left = i + 'px'; 
    cloneSpan.style.top = j + 'px';
    watermarkDiv.appendChild(cloneSpan);
  }
}
