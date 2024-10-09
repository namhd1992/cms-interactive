
import { Anwser } from "./answer";
export interface Question{
    id?:number
    status?:number
    code?:string
    name?:string
    description?:string
    suggest?:string
    contentType?:number
    imageUrl?:string
    duration?:number
    medias?:string
    score?:number
    themeType?:number
    timeWaitingNext?:number
    createdTime?:number
    createdById?:number
    lastModifyTime?:number
    lastModifyById?:number
    createdByName?:string
    lastModifyByName?:string
    deletedOn?:string
    isAutoNextQuestion?:string
    answers: Anwser[]
}