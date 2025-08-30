export type SlideType =
  | "id"
  | "title"
  | "bullet"
  | "image-text"
  | "quote"
  | "chart"
  | "title-content"
  | "two-column";

export interface SlideData {
  type: SlideType;
  //id
  id?: string | number
  // title
  title?: string;
  subtitle?: string;

  // bullet
  bullets?: string[];

  // title-content
  content?: string;

  // two-column
  leftTitle?: string;
  leftContent?: string;
  rightTitle?: string;
  rightContent?: string;

  // image-text
  image?: string;
  heading?: string;
  text?: string;

  // quote
  quote?: string;
  author?: string;

  // chart
  data?: { name: string; value: number }[];
  
   imageUrl?: string
   imagePosition?: "left" | "right" | "center"
}
