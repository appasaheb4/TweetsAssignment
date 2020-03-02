//Rest Full Api                                               
//const domain = process.env.REACT_APP_API_DOMIN_DEV;
const domain = process.env.REACT_APP_API_DOMIN_PROD;
var apiary = {
    domain: domain,
    webLoginSocietyUser: domain + process.env.REACT_APP_API_WEBLOGINSOCIETYUSER,
};

export { apiary };