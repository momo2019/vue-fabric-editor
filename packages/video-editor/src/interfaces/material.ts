export enum MaterialType {
  image = 'image',
  video = 'video',
}

export type MaterialItem = {
  type: MaterialType;
  cover?: string; // 封面
  data: string; // 数据
};

export type MaterialGroup = {
  label: string;
  list: MaterialItem[];
};
