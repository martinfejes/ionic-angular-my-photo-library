export type Photos = Photo[]

export interface Photo {
  id: string
  author: string
  width: number
  height: number
  url: string
  download_url: string
}
