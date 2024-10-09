import { useState } from "react";
import { Cookies } from 'react-cookie';
//import dot from 'dot-object';
import config from '../../config';
import { dataEncode, dataDecode } from '../../helpers/security_helper';
import { isJSON } from '../../utils/jsonUtils';

const cookies = new Cookies();

const getDataStore = (key: string, isJson: boolean = false) => {    
    const keyName = genarateKey(key);
    if (typeof sessionStorage !== "undefined") {        
        var value: any = sessionStorage.getItem(keyName);        

        if (isJson || isJSON(value))
            return JSON.parse(value);
        else
            return value;
        //return dataDecode(value, config.storage.SECRET_KEY);
    } else {
        console.error("sessionStorage không khả dụng trong môi trường này.");
        return "";
    }

    //cookies.get('dataStore');
    //return dataDecode(cookies.get(keyName), config.storage.SECRET_KEY);
};

const setDataStore = (key: string, valueData: any, isJson: boolean = false) => {
    const keyName = genarateKey(key);

    if (typeof sessionStorage !== "undefined") {
        try {
            if (isJson || isJSON(valueData)) {
                const safeData = JSON.parse(JSON.stringify(valueData, (key, value) =>
                    typeof value === "function" ? undefined : value
                ));

                sessionStorage.setItem(keyName, JSON.stringify(safeData));
            }
            else {
                sessionStorage.setItem(keyName, valueData);
            }
        } catch (e) {
            if (e.name === "QuotaExceededError") {
                console.error("Dung lượng lưu trữ sessionStorage đã đầy.");
            }
        }
    } else {
        console.error("sessionStorage không khả dụng trong môi trường này.");
    }
        
    //sessionStorage.setItem(keyName, dataEncode(value, config.storage.SECRET_KEY));

    //cookies.set(keyName, dataEncode(valueData, config.storage.SECRET_KEY), {
    //     path: config.storage.PATCH,
    //     maxAge: config.storage.MAX_AGE, //60 * 60 * 24 * 365
    // });
};

const removeDataStore = (key: string) => {
    const keyName = genarateKey(key);
    sessionStorage.removeItem(keyName);
    
    cookies.remove(keyName);
};

const clearDataStore = () => {    
    sessionStorage.clear();    
    cookies.clear();
};

function genarateKey(key: string) {
    return `${config.storage.SECRET_KEY}_${key}`;
}

export {getDataStore, setDataStore, removeDataStore, clearDataStore};