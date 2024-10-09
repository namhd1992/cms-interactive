export const jsonParse = (opts: any, defaults?: any) => {
    if (opts !== null && typeof opts === 'object') {
      return opts;
    }
  
    defaults = defaults || {};
    try {
      defaults = JSON.parse(opts);
    } catch (e) {
    }
  
    return defaults;
};

export const isJSON = (str: any) => {
    try {        
        const parsed = JSON.parse(str);
        
        return (typeof parsed === 'object' && parsed !== null);
    } catch (e) {
        return false;
    }
}