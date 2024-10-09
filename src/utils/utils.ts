export const isBrowser = typeof window !== 'undefined';

export const waiting = (condition, wait) => {
    if (condition) {
      return new Promise(resolve => setTimeout(resolve, wait));
    } else {
      return Promise.resolve();
    }
  };

export const formatDataToMap = (data: any, options = {}) => {
  const { keyName = 'id', valueName = 'name', isArray }: any = options;

  if (isArray) {
    if (data instanceof Array) {
      return data.map((item: any = {}) => {
        return {
          value: item[keyName] || item._id,
          label: item[valueName] || item.title
        }
      });
    }

    return []
  }

  const objMap: any = {};

  if (data instanceof Array) {
    data.forEach((item) => {
      objMap[item[keyName] || item._id] = item[valueName] || item.title;
    });
  }

  return objMap;
};

export const handleVietChars = (str = '') => {
  var AccentsMap = [
    "aàảãáạăằẳẵắặâầẩẫấậ",
    "AÀẢÃÁẠĂẰẲẴẮẶÂẦẨẪẤẬ",
    "dđ", "DĐ",
    "eèẻẽéẹêềểễếệ",
    "EÈẺẼÉẸÊỀỂỄẾỆ",
    "iìỉĩíị",
    "IÌỈĨÍỊ",
    "oòỏõóọôồổỗốộơờởỡớợ",
    "OÒỎÕÓỌÔỒỔỖỐỘƠỜỞỠỚỢ",
    "uùủũúụưừửữứự",
    "UÙỦŨÚỤƯỪỬỮỨỰ",
    "yỳỷỹýỵ",
    "YỲỶỸÝỴ"
  ];
  for (var i = 0; i < AccentsMap.length; i++) {
    var re = new RegExp('[' + AccentsMap[i].substr(1) + ']', 'g');
    var char = AccentsMap[i][0];
    str = str.replace(re, char);
  }
  return str;
};

export const uuidv4 = () => {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = Math.random() * 16 | 0;
    const v = c === 'x' ? r : (r & 0x3 | 0x8);

    return v.toString(16);
  });
};

export const downloadFile = (params = {}) => {
  const { fileUrl, fileName = 'download' }: any = params;

  const link = document.createElement('a');

  link.download = fileName;
  link.href = fileUrl;
  link.target = '_blank';
  link.click();
};

export const capitalizeFirstLetter = (string) => {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function fallback(text: string, onCopy?: any) {
  const textArea = document.createElement('textarea');
  textArea.value = text;

  textArea.style.top = '0';
  textArea.style.left = '0';
  textArea.style.position = 'fixed';

  document.body.appendChild(textArea);
  textArea.focus();
  textArea.select();

  try {
    document.execCommand('copy');
    onCopy?.(text);
  } catch (err) {
    console.info(`fallback copy err ${err}`);
  }

  document.body.removeChild(textArea);
}

export const copyToClipboard = ({ text, onCopy }: any) => {
  if (!navigator.clipboard) {
    fallback(text, onCopy);
    return;
  }

  navigator.clipboard.writeText(text)
  .then(() => {
    onCopy?.(text);
  }, (err) => {
    console.info(`Copy err ${err}`);
  })
  .catch(err => {
    console.info(`Copy err ${err}`);
  });
}

export const formatBodyRequest = (data) => {
  let temp = { ...data };
  Object.keys(temp).forEach(el => {
    if ((!temp[el] || temp[el] === undefined || temp[el] === null) && temp[el] !== 0 && temp[el] !== "") {
      delete temp[el]
    }
  });
  return temp;
}

export const highlightText = (text: string, query?: string) => {
  if (!query) {
    return text
  }
  const escapeRegExpChars = (text: string) => {
    return text.replace(/([.*+?^=!:${}()|\[\]\/\\])/g, "\\$1");
  };

  let lastIndex = 0;
  const words = query
  .split(/\s+/)
  .filter((word: string) => word.length > 0)
  .map(escapeRegExpChars);
  
  if (words.length === 0) {
    return [text];
  }
  const regexp = new RegExp(words.join("|"), "gi");
  const tokens = [];

  while (true) {
    const match = regexp.exec(text);
    if (!match) {
      break;
    }
    const length = match[0].length;
    const before = text.slice(lastIndex, regexp.lastIndex - length);
    if (before.length > 0) {
      tokens.push(before);
    }
    lastIndex = regexp.lastIndex;
    tokens.push(<strong key={lastIndex}>{match[0]}</strong>);
  }
  const rest = text.slice(lastIndex);
  
  if (rest.length > 0) {
    tokens.push(rest);
  }
  return tokens;
};

export const deepClone = (source: any) => {
  if (!source || typeof source !== 'object') {
    return source;
  }

  let target: any;

  if (Array.isArray(source)) {
    target = source.map((item) => deepClone(item));
  } else {
    target = {};
    Object.keys(source).forEach((key) => {
      return (target[key] = deepClone(source[key]));
    });
  }

  return target;
};

export const windowOpen = (link: string, params: any = {}) => {
  const { isCenter = true, target = 'Window', width = 530, height = 750 } = params;

  let features: any;

  if (isCenter) {
    const clientWidth = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
    const clientHeight = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;

    const top = (clientHeight - height) / 2;
    const left = (clientWidth - width) / 2;
    features = `width=${width}, height=${height}, top=${top}, left=${left}`;
  } else {
    features = `width=${width}, height=${height}`;
  }

  return window.open(link, target, features);
}