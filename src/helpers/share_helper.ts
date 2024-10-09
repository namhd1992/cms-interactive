import {windowOpen} from "../utils/utils";

export const shareFacebook = (params: any = {}) => {
    const {
      width = 530,
      height = 750,
      link,
      shortLink
    } = params;
  
    return () => {
      // console.log('shortLink', shortLink)
  
      if (typeof window === 'undefined') {
        return
      }
  
      windowOpen(`https://www.facebook.com/sharer/sharer.php?u=${link}`, {
        target: 'Facebook Share',
        width,
        height
      });
    }
  }
  
  export const shareTwitter = (params: any = {}) => {
    const {
      text,
      width = 530,
      height = 750,
      link
    } = params;
  
    return () => {
      if (typeof window === 'undefined') {
        return
      }
  
      windowOpen(`https://twitter.com/intent/tweet?url=${link}&text=${text}`, {
        target: 'Twitter Share',
        width,
        height
      });
    }
  }
  
  export const shareWhatsapp = (params: any = {}) => {
    const {
      text,
      width = 530,
      height = 750,
      link
    } = params;
  
    return () => {
      if (typeof window === 'undefined') {
        return
      }
  
      windowOpen(`https://api.whatsapp.com/send/?text=${text}+++${link}&type=custom_url`, {
        target: 'Whatsapp Share',
        width,
        height
      });
    }
  }