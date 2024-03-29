import {baseURL} from "@/network/api";

export const uploadAddress = baseURL+'/home/uploadFile/'
export const maxUploadFileSize = 100
export const aboutMeIntroductionConstant = 'signForAboutMe'
export const ycaoId = 0
export const ycaoStatusId = 423
export const myNotesId = 2
export const cacheArrRoute = ['UploadFile','Markdown','Article','AboutMe','MyStory','Dashboard']
export const tokenExpireTimeClient = 43200000 // 12*60*60*1000

export const httpOrHttps = 'http://'
//assets 七牛云文件链接地址 【点击鼠标有星星特效】
export const mouseEffectPath = httpOrHttps+'assets.cklovery.life/mouseStars'
//assets 七牛云文件链接地址 【MyStory里的个人照片】
export const myPhotoPath = httpOrHttps+'assets.cklovery.life/myPhoto'
//assets 七牛云文件链接地址 【塞到goolemap源码里的获取当前位置的图标】
export const gMapCurPosPath = httpOrHttps+'assets.cklovery.life/gmap/sniperLocate.png'
//google map api key
export const googleMapPrivateKey = ''
