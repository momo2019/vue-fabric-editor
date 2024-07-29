export enum MaterialGroupType {
  image = 'image',
  video = 'video',
  custom = 'custom',
}

export enum MaterialType {
  image = 'image',
  video = 'video',
  text = 'text',
  audio = 'audio',
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
