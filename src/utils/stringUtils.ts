export const formatNumber = (value, options = {}) => {
    const { separator = '.', decimal = '.', prefix, suffix }: any = options;
  
    if (!value && value !== 0) {
      return ''
    }
  
    let string = value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${separator}`);
  
    if (prefix) {
      string = `${prefix}${string}`
    }
  
    if (suffix) {
      string = `${string}${suffix}`
    }
  
    return string;
  };

  export const pad = (string) => {
    return ('0' + string).slice(-2)
  };

  export const formatDuration = (seconds) => {
    const date = new Date(seconds * 1000);
    const hh = date.getUTCHours();
    const mm = pad(date.getUTCMinutes());
    const ss = pad(date.getUTCSeconds());
    if (hh) {
      return `${pad(hh)}:${pad(mm)}:${ss}`
    }
    return `${mm}:${ss}`
  };

  export const kFormatter = (num = 0) => {
    if (num >= 1000000000) {
      return (num / 1000000000).toFixed(1).replace(/\.0$/, '') + 'G';
    }
  
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1).replace(/\.0$/, '') + 'M';
    }
  
    if (num >= 1000) {
      return (num / 1000).toFixed(1).replace(/\.0$/, '') + 'K';
    }
  
    return num;
  };

  export const bytesToSize = (bytes) => {
    if (!bytes) {
      return '';
    }
  
    const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB'];
  
    if (bytes === 0) {
      return '0 Byte';
    }
  
    // @ts-ignore
    const i = parseInt(Math.floor(Math.log(bytes) / Math.log(1024)));
  
    // @ts-ignore
    return `${Math.round(bytes / Math.pow(1024, i), 2)}${sizes[i]}`
  };

  export const formatK = (value: number, options = {}) => {
    const { fractionDigits = 1 }: { fractionDigits?: number } = options;
  
    if (value >= 1000000000) {
      const formatValue: any = (value / 1000000000).toFixed(fractionDigits).replace(/\.0$/, '');
      return new Intl.NumberFormat('vi-VN').format(formatValue) + 'b';
    }
  
    if (value >= 1000000) {
      const formatValue: any = (value / 1000000).toFixed(fractionDigits).replace(/\.0$/, '');
      return new Intl.NumberFormat('vi-VN').format(formatValue) + 'm';
    }
  
    if (value >= 1000) {
      const formatValue: any = (value / 1000).toFixed(fractionDigits).replace(/\.0$/, '')
      return new Intl.NumberFormat('vi-VN').format(formatValue) + 'k';
    }
  
    return value;
  };

  export const nFormatNumber = (value: number, isCapitalizeUnit: boolean = false): string => {
    let formatter = Intl.NumberFormat('en', { notation: 'compact' })
    const numberStr = formatter.format(value)
    return isCapitalizeUnit ? numberStr : numberStr.toLocaleLowerCase()
  };
  
  export const formatNumber = (value: number | string, options = {}) => {
    const { separator = '.', prefix, suffix, format }: any = options;
  
    if (!value && value !== 0) {
      return ''
    }
  
    if (format === 'k' || format === 'K') {
      return formatK(value)
    }
  
    let string = value.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, `$1${separator}`);
  
    if (prefix) {
      string = `${prefix}${string}`
    }
  
    if (suffix) {
      string = `${string}${suffix}`
    }
  
    return string;
  };
  