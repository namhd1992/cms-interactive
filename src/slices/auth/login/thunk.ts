//Include Both Helper File with needed methods
import { getFirebaseBackend } from "../../../helpers/firebase_helper";
import {
  postFakeLogin,
  postJwtLogin,
} from "../../../helpers/fakebackend_helper";

import config from "../../../config";

import { loginSuccess, logoutUserSuccess, apiError, reset_login_flag } from './reducer';

import { APIClient, setHeader } from "../../../helpers/api_helper";
import * as apiUrlEnpoint from "../../../helpers/url_helper";
const api = new APIClient();
const sessionStorageKey = "authUser";

import { setIdentity,signOut } from "../../../Components/Hooks/IdentityHooks";

export const loginUser = (user : any, history : any) => async (dispatch : any) => {
  try {
    let response;
    //if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
    //  let fireBaseBackend : any = getFirebaseBackend();
    //  response = fireBaseBackend.loginUser(
    //    user.email,
    //    user.password
    //  );
    //} else 
    if (import.meta.env.VITE_APP_DEFAULTAUTH === "oauth2") 
    {
      var dataRequest = {
          "client_id": config.vtcMobile.CLIENT_ID,
          "client_secret": config.vtcMobile.CLIENT_SECRET,
          "grant_type": "web:integration:auth_code",
          "scope": "profile games.catalog",
          "code": "w-222-123-123-123-222",
          "code_verifier": "",
          "site_id": 36
      };

      try {
        setHeader("appId", "36");
        response = api.create(apiUrlEnpoint.ACCOUNT_TOKEN, dataRequest);          
        console.log(response);

      } catch (error) {
          return error;
      }        
    } 
    else if (import.meta.env.VITE_APP_DEFAULTAUTH === "jwt") 
    {        
       response = postJwtLogin({
         email: user.email,
         password: user.password
       });
      }
    else if (import.meta.env.VITE_APP_DEFAULTAUTH) {
      response = postFakeLogin({
        email: user.email,
        password: user.password,
      });
    }

      // response = {
      //     "status": "success",
      //     "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYyOWYxNWM3NzBhNDcwYTIzMGNjNWQ1YSIsImlhdCI6MTcyNjYzMTc5MSwiZXhwIjoxNzM0NDA3NzkxfQ.9hKpq-7EtybRpY7K0nTGgYDmRvvdTXYBHsUMv-Xlcic",
      //     "data": {
      //         "_id": "629f15c770a470a230cc5d5a",
      //         "first_name": "User",
      //         "email": "admin@themesbrand.com",
      //         "password": "$2a$12$tOmV5oSs.Itd7KZ6IEV3L.kDnDZz9N2TadTrrnu0M/9ktxplL/lzC",
      //         "confirm_password": "123456",
      //         "changePasswordAt": "2022-06-07T09:06:27.077Z",
      //         "skills": [],
      //         "__v": 1,
      //         "passwordtoken": "f13946e79a11a976408622eda85c422f97fa8c8d52ec25204b6b279c8f2ffe32",
      //         "passwordtokenexp": "2024-09-14T17:00:23.996Z",
      //         "exp_year": [],
      //         "portfolio": []
      //     }
      // };

    var data = await response;

    if (data) {
      
      //sessionStorage.setItem(sessionStorageKey, JSON.stringify(data));

      if (import.meta.env.VITE_APP_DEFAULTAUTH === "oauth2") {
        var finallogin : any = JSON.stringify(data);
        finallogin = JSON.parse(finallogin)
        data = finallogin.data;

        if (finallogin.code > 0) {
          setIdentity(data);

          dispatch(loginSuccess(data));
          history('/dashboard')
        } 
        else {
          dispatch(apiError(finallogin));
        }
      }
      else{
        dispatch(loginSuccess(data));
      }      
    }   

    // if (data) {
    //     console.log(data);

    //     var finallogin: any = JSON.stringify(data);
    //     finallogin = JSON.parse(finallogin)
    //     data = finallogin.data;
    //     if (finallogin.status === "success") {
    //         console.log('success');

    //         dispatch(loginSuccess(data));
    //         history('/dashboard')
    //     }
    //     else {
    //         console.log('failse');

    //         dispatch(apiError(finallogin));
    //     }
    // }

  //   if (data) {
  //    sessionStorage.setItem("authUser", JSON.stringify(data));
  //    if (import.meta.env.VITE_APP_DEFAULTAUTH === "fake") {
  //      var finallogin : any = JSON.stringify(data);
  //      finallogin = JSON.parse(finallogin)
  //      data = finallogin.data;
  //      if (finallogin.status === "success") {
  //        dispatch(loginSuccess(data));
  //        history('/dashboard')
  //      } 
  //      else {
  //        dispatch(apiError(finallogin));
  //      }
  //    } else {
  //      dispatch(loginSuccess(data));
  //      history('/dashboard')
  //    }
  //   }
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const logoutUser = () => async (dispatch : any) => {
  try {
     signOut();
      //sessionStorage.removeItem(sessionStorageKey);

    //let fireBaseBackend : any = getFirebaseBackend();
    //if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
    //  const response = fireBaseBackend.logout;
    //  dispatch(logoutUserSuccess(response));
    //} else {
    //  dispatch(logoutUserSuccess(true));
    //}

      dispatch(logoutUserSuccess(true));
  } catch (error) {
    dispatch(apiError(error));
  }
};

export const socialLogin = (type : any, history : any) => async (dispatch : any) => {
  try {
    let response;

    if (import.meta.env.VITE_APP_DEFAULTAUTH === "firebase") {
      const fireBaseBackend : any = getFirebaseBackend();
      response = fireBaseBackend.socialLoginUser(type);
    }
    //  else {
      //   response = postSocialLogin(data);
      // }
      
      const socialdata = await response;
    if (socialdata) {
      sessionStorage.setItem(sessionStorageKey, JSON.stringify(response));
      dispatch(loginSuccess(response));
      history('/dashboard')
    }

  } catch (error) {
    dispatch(apiError(error));
  }
};

export const resetLoginFlag = () => async (dispatch : any) => {
  try {
    const response = dispatch(reset_login_flag());
    return response;
  } catch (error) {
    dispatch(apiError(error));
  }
};