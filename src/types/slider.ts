export interface Slider {
  id: number;
  title: string;
  description: string;
  image: string;
  link: string;
}

export interface SliderResponse {
  data: Slider[];
}