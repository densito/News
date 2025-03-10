import { NewsItemType } from "./News";

export type RootStackParamList = {
  Home: undefined;
  Detail: { news: NewsItemType };
};
