import { Source } from "./source.model"

export interface Article {
  author: string
  content: string
  description: string
  publishedAt?: Date
  source: Source
  title: string
  url: string
  urlToImage: string
}
