import { getDataStore, setDataStore, removeDataStore } from "./UserDataStoreHooks";
import {jsonParse} from '../../utils/jsonUtils';

const userIdentityStorageKey = "authUser";

const setIdentity = (user: any) => {    
    setDataStore(userIdentityStorageKey, user, true);    
};

const signOut = () => {    
  removeDataStore(userIdentityStorageKey);
};

const getIdentity = () => {
    const userInfo = getDataStore(userIdentityStorageKey, true);    
    var finallogin = jsonParse(userInfo);
    //var finallogin2 : any = JSON.parse(userInfo);    
    //console.log('getIdentity => 2', finallogin2);

    if (!userInfo) {
      return null;
    } else {
      return userInfo;
    }     
};

const getUserInfo = () => {
    const userInfo = getIdentity();
  
    if (!userInfo) {
      return null;
    } else {
      return userInfo;
    }     
};

const isLogin = () => {
    const userInfo = getIdentity();
  
    if (!userInfo) {
      return false;
    } else {
      return true;
    }
};
  
const getToken = () => {    
    var userInfo: any = getIdentity();      
  
    if (!userInfo) {
      return null;
    } else {
      return userInfo.access_token;
    }   
};

const getUserId = () => {
    const userInfo = getUserInfo();
  
    if (!userInfo) {
      return null;
    } else {
      return userInfo.uid;
    }   
};

const getUsername = () => {
    const userInfo = getUserInfo();
  
    if (!userInfo) {
      return null;
    } else {
      return userInfo.nick_name;
    }   
};

const getTenant = () => {
    const userInfo = getUserInfo();
  
    if (!userInfo) {
      return null;
    } else {
      return userInfo.tenant;
    }   
};

const getUserType = () => {
    const userInfo = getUserInfo();
  
    if (!userInfo) {
      return null;
    } else {
      return userInfo.user_type;
    }   
};

export { setIdentity, signOut, getIdentity, getUserInfo, isLogin, getToken, getUserId, getUsername, getTenant, getUserType };