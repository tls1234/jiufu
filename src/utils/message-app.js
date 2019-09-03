/**
 * Created by fighter on 2017/3/20.
 */
/* eslint-disable */

import UserAge from './ua-parser';

window.JFClient_H5CallBack_O = {};

window.JFClient_H5_CallBack = (res) => {
  if (res === null) {
    console.log('callBack null', res);
    return;
  }
  if (res.data instanceof Object) {
    res.data = JSON.stringify(res.data);
  }
  return new Promise(() => {
    const [funcName, msg] = res.msg.split(':');
    if (msg.toLowerCase() === 'ok') {
      typeof window.JFClient_H5CallBack_O[`${funcName}_Success`] === 'function' &&
      window.JFClient_H5CallBack_O[`${funcName}_Success`](res, msg);
    } else {
      typeof window.JFClient_H5CallBack_O[`${funcName}_Fail`] === 'function' &&
      window.JFClient_H5CallBack_O[`${funcName}_Fail`](res, msg);
    }
    return funcName;
  }).then((funcName) => {
    typeof window.JFClient_H5CallBack_O[`${funcName}_Complete`] === 'function' &&
    window.JFClient_H5CallBack_O[`${funcName}_Complete`](res);
  });
};

class JsBridge {
  static setupWebViewJavascriptBridge(callback) {
    if (window.WebViewJavascriptBridge) {
      return callback(window.WebViewJavascriptBridge);
    }
    if (window.WVJBCallbacks) {
      return window.WVJBCallbacks.push(callback);
    }
    window.WVJBCallbacks = [callback];
    const WVJBIframe = document.createElement('iframe');
    WVJBIframe.style.display = 'none';
    WVJBIframe.src = 'https://__bridge_loaded__';
    document.documentElement.appendChild(WVJBIframe);
    setTimeout(() => document.documentElement.removeChild(WVJBIframe), 0);
    return null;
  }

  static setCallBack(funcName, { success, fail, complete }) {
    if (success && typeof success === 'function') {
      window.JFClient_H5CallBack_O[`${funcName}_Success`] = success;
    }
    if (fail && typeof fail === 'function') {
      window.JFClient_H5CallBack_O[`${funcName}_Fail`] = fail;
    }
    if (complete && typeof complete === 'function') {
      window.JFClient_H5CallBack_O[`${funcName}_Complete`] = complete;
    }
  }

  static toAndroid(funcName, params) {
    if (typeof window.JFNewClient === 'object' && typeof window.JFNewClient[funcName] === 'function') {
      window.JFNewClient[funcName](JSON.stringify(params));
    } else {
      // alert(`JFNewClient.${funcName} not find!`)
    }
  }

  static toIOS(funcName, params) {
    JsBridge.setupWebViewJavascriptBridge((bridge) => {
      bridge.callHandler('JFNewClient', { function: funcName, data: params }, (res) => {
        console.log(`[ callHandler ${funcName} success ]`, res);
        window.JFClient_H5_CallBack(res);
      });
      bridge.registerHandler('JFNewClient_Back', (data, responseCallback) => {
        console.log(`back ios ${funcName}`);
        window.JFClient_H5_CallBack(data);
      });
    });
  }

  static toIOSNew(funcName, params) {
    JsBridge.setupWebViewJavascriptBridge((bridge) => {
      bridge.callHandler(funcName, { function: funcName, data: params }, (res) => {
        console.log(`callHandler ${funcName} success`, res);
      });
      bridge.registerHandler(funcName, (data, responseCallback) => {
        console.log(`back ios new ${funcName}`);
        window.JFClient_H5_CallBack(data);
      });
    });
  }

  static toApp(funcName, { success, fail, complete, ...params }, ieNew) {
    if (!funcName) {
      return false;
    }

    JsBridge.setCallBack(funcName, { success, fail, complete });

    if (!UserAge.isIOS()) {
      JsBridge.toAndroid(funcName, params);
    } else if (ieNew) {
      JsBridge.toIOSNew(funcName, params);
    } else {
      JsBridge.toIOS(funcName, params);
    }

    return true;
  }
}

const JsToNative = (funcName, res = {}, ieNew) => {
  JsBridge.toApp(funcName, res, ieNew);
};

export default JsToNative;
