import { useEffect, useState } from "react";
// import { getLoggedinUser } from "../../helpers/api_helper";
import { getIdentity, getToken, isLogin } from "../../Components/Hooks/IdentityHooks";

const useProfile = () => {
  //const userProfileSession = getLoggedinUser();
  const userProfileSession = getIdentity();
  var token = getToken();

  //console.log(userProfileSession.data.access_token);

  const [loading, setLoading] = useState(userProfileSession ? false : true);
  const [userProfile, setUserProfile] = useState(userProfileSession ? userProfileSession : null);

  useEffect(() => {
    const userProfileSession = getIdentity();
    
    //var token = userProfileSession && userProfileSession["token"];

    var token = getToken();

    setUserProfile(userProfileSession ? userProfileSession : null);
    setLoading(token ? false : true);
  }, []);


  return { userProfile, loading,token };
};

const useProfile_bak = () => {
  const userProfileSession = getLoggedinUser();  

  //var token = userProfileSession && userProfileSession["token"];
  var token = userProfileSession && userProfileSession.data.access_token;

  //console.log(userProfileSession.data.access_token);

  const [loading, setLoading] = useState(userProfileSession ? false : true);
  const [userProfile, setUserProfile] = useState(userProfileSession ? userProfileSession : null);

  useEffect(() => {
    const userProfileSession = getLoggedinUser();
    
    //var token = userProfileSession && userProfileSession["token"];

    var token = userProfileSession && userProfileSession.data.access_token;

    setUserProfile(userProfileSession ? userProfileSession : null);
    setLoading(token ? false : true);
  }, []);


  return { userProfile, loading,token };
};

export { useProfile };