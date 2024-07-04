export enum MaterialType {
  image = 'image',
  video = 'video',
}

export type MaterialItem = {
  cover?: string; // 封面
  url: string; // 数据
};

export type MaterialGroup = {
  label: string;
  list: MaterialItem[];
};
