declare module '*.json'

declare namespace ahp {
  interface StyleRaw {
    enable: boolean
    applyTo: string
    firstLineStart: string
    firstLineMiddle: string
    firstLineEnd: string
    middleLineStart: string
    commentElementPrefix: string
    commentElementSuffix: string
    middleLineEnd: string
    lastLineStart: string
    lastLineMiddle: string
    lastLineEnd: string
    commentElementWidth: number
    lineWidth: number
  }
  interface Styles {
    [key: string]: StyleRaw
  }
  interface CommentElementsValues {
    [key: string]: string
  }
  interface CustomCommentElementsValues {
    [key: string]: string
  }
}
