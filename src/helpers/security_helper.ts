/*import { Buffer } from 'node:buffer';*/
import {jsonParse} from '../utils/jsonUtils';

export const dataEncode = (data, key, options = {}) => {
    let encodeData;
  
    if (typeof (data) !== 'string') {
      encodeData = JSON.stringify(data);
    } else {
      encodeData = data || '';
    }
  
    return xorEncode(encodeData, key, options)
  };

export const dataDecode = (data: any, key: any, options = {}) => {
  const { type }: any = options;

  if (data) {
    if (typeof data === 'string') {
      if (type) {
        if (type === 'ArrayString') {
          return xorDecode(data, key, options).split(',')
        }

        if (type === 'string') {
          return xorDecode(data, key, options)
        }
      }

      // @ts-ignore
      return jsonParse(xorDecode(data, key, options));
    } else {
      return data
    }
  }
};

export const xorEncode = (input, key, options = {}) => {
    const { format }: any = options;
  
    if (format === 'uri') {
      input = Array.from(input).map((c: any) => {
        if (c.charCodeAt(0) < 128) {
          return c.charCodeAt(0).toString(16).padStart(2, '0')
        } else {
          return encodeURIComponent(c).replace(/\%/g, '').toLowerCase();
        }
      }).join('');
  
      input = input.match(/.{1,2}/g).map(x => parseInt(x, 16));
  
      let output = [];
  
      for (let i = 0; i < input.length; i++) {
        output.push(input[i] ^ key.charCodeAt(Math.floor(i % key.length)))
      }
  
      output = output.map((x) => {
        return x.toString(16).padStart(2, '0');
      });
  
      return Buffer.from(output.join('')).toString('base64');
    } else {
      const base64 = Buffer.from(input).toString('base64');
      const output = [];
  
      for (let i = 0; i < base64.length; i++) {
        const charCode = base64.charCodeAt(i) ^ key.charCodeAt(i % key.length);
        output.push(charCode)
      }
  
      return Buffer.from(output).toString('base64')
    }
  };

  export const xorDecode = (input, key, options = {}) => {
    const { format }: any = options;
  
    if (format === 'uri') {
      try {
        input = Buffer.from(input, 'base64').toString();
  
        const text = input.match(/.{1,2}/g).map(x => parseInt(x, 16));
  
        const output = [];
  
        for (let i = 0; i < text.length; i++) {
          output.push((text[i] ^ key.charCodeAt(Math.floor(i % key.length))).toString(16).padStart(2, '0'));
        }
  
        return decodeURIComponent('%' + output.join('').match(/.{1,2}/g).join('%'));
      } catch (e) {
        return '';
      }
    } else {
      const base64 = Buffer.from(input, 'base64');
  
      const output = [];
      for (let i = 0; i < base64.length; i++) {
        const charCode = base64[i] ^ key.charCodeAt(i % key.length);
  
        output.push(String.fromCharCode(charCode))
      }
  
      return Buffer.from(output.join(''), 'base64').toString('utf8')
    }
  };