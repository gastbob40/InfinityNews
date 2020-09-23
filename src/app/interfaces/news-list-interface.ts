import {NewsInterface} from './news-interface';

export interface NewsListInterface {
    newsId: string;
    news: NewsInterface;
    children: NewsListInterface[];
}
