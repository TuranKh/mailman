import log from "./logger.js";

export default function checkUrl(url) {
  if(!url || url.length === 0) {
    log.error("Enter URL as a second parameter");
    return false;
  }
  const validity = /^https?:\/\/(?:[a-zA-Z0-9\-._~%!$&'()*+,;=]+@)?(?:\d{1,3}\.){3}\d{1,3}(?::\d{1,5})?(?:\/[^\s]*)?$|^https?:\/\/(?:[a-zA-Z0-9-]+\.)+[a-zA-Z]{2,}(?::\d{1,5})?(?:\/[^\s]*)?$/; 

  const isValid = validity.test(url);
  
  if(isValid) {
    return true;
  }
  log.error("URL is not valid, please enter valid url");
  return false;

}