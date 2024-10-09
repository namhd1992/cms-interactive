import dayjs from 'dayjs';

export const timestampToDatetime = (timestamp: number): string => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = ('0' + (date.getMonth() + 1)).slice(-2);
    const day = ('0' + date.getDate()).slice(-2);
    const hours = ('0' + date.getHours()).slice(-2);
    const minutes = ('0' + date.getMinutes()).slice(-2);
    const seconds = ('0' + date.getSeconds()).slice(-2);
    return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
};

export const timeAgo = (dateParam) => {
    if (!dateParam) {
      return null;
    }
  
    const date = typeof dateParam === 'object' ? dateParam : new Date(dateParam);
    const DAY_IN_MS = 86400000; // 24 * 60 * 60 * 1000
    const today = new Date();
    const yesterday = new Date(today - DAY_IN_MS);
    const seconds = Math.round((today - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);
    // const weeks = Math.round(days / 7);
    // const years = Math.round(days / 365);
    const isYesterday = yesterday.toDateString() === date.toDateString();
  
    if (seconds < 5) {
      return 'vừa mới đây';
    } else if (seconds < 60) {
      return `vài giây trước`;
    } else if (seconds < 90) {
      return 'khoảng 1 phút trước';
    } else if (minutes < 60) {
      return `${minutes} phút trước`;
    } else if (hours < 24) {
      return `${hours} giờ trước`;
    } else if (isYesterday) {
      return 'hôm qua';
    } else if (days < 30) {
      return `${days} ngày trước`;
    } else if (days >= 30) {
      return dayjs(dateParam).format('HH:mm, DD/MM/YYYY');
    }
  
    return dayjs(date).format('MM/DD/YYYY');
  };