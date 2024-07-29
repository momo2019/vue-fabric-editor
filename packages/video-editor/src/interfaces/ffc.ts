export type AnimationData = {
  type: string; // 动画类型，预制动画类型key
  start: number; // 开始时间
  duration: number; // 持续时间
};

// 显示的组件的基础类型
export type BaseNode = {
  animation?: AnimationData[];
  x: number; // 中心点距离左侧的距离
  y: number; // 中心点距离上方的距离
  width: number; // 宽度
  height: number; // 高度
  index: number; // 层级
  rotate?: number; // 绕中心顺时针旋转角度
  opacity?: number; // 不透明度
  startTime?: number; // 开始时间
  endTime?: number; // 结束时间

  brightness?: number; // 亮度
  contrast?: number; // 对比度
  exposure?: number; // 曝光度
  saturation?: number; // 饱和度

  mask?: {
    url: string; // mask贴图的地址
    x: number; // mask左上角距离组件左上角的位置
    y: number; // mask左上角距离组件左上角的位置
    width: number; // mask的宽度
    height: number; // mask的高度
  };
};

export type Image = {
  url: string; // 图片地址
  isGif?: boolean; // 是否是动图
} & BaseNode;

export type Video = {
  url: string; // 视频地址
  vol?: number; // 视频音量0-1
  fadeIn?: number; // 淡入时间，秒，默认0
  fadeOut?: number; // 淡出时间，秒，默认0
  loop?: boolean; // 是否循环， 默认不循环
  speed?: number; // 播放速度
} & BaseNode;

export type TextStyle = {
  fontFamily?: string; // 字体
  fontSize?: number; // 字号
  color?: string; // 颜色
  fontWeight?: 'normal' | 'bold'; // 是否粗体
  fontStyle?: 'normal' | 'italic'; // 是否斜体
  letterSpacing?: number; // 字间距
  strokeColor?: string; // 字边框颜色
  strokeWidth?: number; // 字边框框度
  shadowX?: number; // 阴影相对中心的偏移距离
  shadowY?: number; // 阴影相对中心的偏移距离
  shadowColor?: string; // 阴影颜色
  shadowAngle?: number; // 阴影相对中心的偏移方向0-359
  shadowDistance?: number; // 阴影延偏移方向离中心的距离
  shadowOpacity?: number; // 阴影不透明度
  shadowBlur?: number; // 阴影模糊
  align?: 'left' | 'center' | 'right'; // 默认局中，定义为x的锚点，以及第二行的文本对齐方式
  anchorX?: number; // 0-1 优先级大于align，align的center代表了x 0.5，y 0.5。left代表了x 0，y 0.5，right代表了x 1，y 0.5
  anchorY?: number; // 0-1 优先级大于align
  wordWrap?: boolean; // 开启自动换行，默认true
  wordWrapWidth?: number; // 换行的长度，默认和视频的宽度一致
  lineHeight?: number; // 每行的高度
  nowrapTexts?: string[]; // 不允许换行的标点
};

export type Text = {
  text: string;
} & TextStyle &
  BaseNode;

export type Audio = {
  url: string; // 音乐地址
  fadeIn?: number; // 淡入时间，秒，默认0
  fadeOut?: number; // 淡出时间，秒，默认0
  loop?: boolean; // 是否循环，默认否
  vol?: number; // 音量大小0-1
};

export enum BackgroundType {
  color,
  image,
  video,
}

export type Background = {
  type: BackgroundType;
  data: string; //支持'#ffffff',以及'rgb(255, 255, 255)'格式.video和image为url
  vol?: number; // 视频音量0-1
  fadeIn?: number; // 淡入时间，秒，默认0
  fadeOut?: number; // 淡出时间，秒，默认0
  loop?: boolean; // 是否循环，默认不循环
  size?: 'cover' | 'contain' | 'auto'; // 默认cover， auto代表拉伸填充，cover代表等比例填充满，contain代表等比例最大全显示
};

export type Transition = {
  type: string; // 转场动画
  duration: number; // 转场时间，秒
};

export type Scene = {
  duration: number; // 总时长，秒
  transition?: Transition; // 转场
  background?: Background; // 背景
  audio?: Audio | Audio[]; // 背景音乐
  image?: Image[]; // 图片集合
  video?: Video[]; // 视频集合
  text?: Text[]; // 文本集合
};

export type TaskData = {
  width: number; // 视频宽度
  height: number; // 视频高度
  fps?: number; // 视频帧率 ，默认30
  cover?: string | number; // 视频封面，默认无,如果是number代表了取第几秒的帧作为封面
  scene: Scene[]; // 场景集合
  output?: string; // 视频输出地址
  ext?: string; // 视频输出文件的格式，内部使用
  parallel?: number; // 最大并发数，默认4路
  threads?: number; // 每个进程的ffmpeg线程限制，需要大于1，默认3
  bitrate?: string; // 2m,4m, 200k等，默认2m
  transparent?: boolean; // 透明通道，默认否
};
