import globalConst from '../Components/constants/globalConst';
import config from '../config';

const isDevelop = import.meta.env.VITE_BUILD_MODE === globalConst.buildMode.Develop;
const isBeta = import.meta.env.VITE_BUILD_MODE === globalConst.buildMode.Beta;
const isProduction = import.meta.env.VITE_BUILD_MODE === globalConst.buildMode.Production;

export const getCdnUrl = (params: any = {}) => {
    const { isFullLink } = params;        
  
    if (config.CDN_MODE_ENABLED) {      
      return config.CDN_URL
    }
  
    if (isFullLink) {      
      let host = isProduction ? config.PUBLIC_URL : `http://localhost:${config.PUBLIC_PORT}`;
  
      if (typeof window !== 'undefined') {
        host = window.location.origin
      }
  
      return host;
    }
  
    return ''
  };