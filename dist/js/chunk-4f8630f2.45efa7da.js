(window.webpackJsonp=window.webpackJsonp||[]).push([["chunk-4f8630f2"],{3133:function(t,e,s){"use strict";s("34a3"),s("d4d5");var i=s("4b90"),o=function(t){return/^1[3-9]\d{9}$/.test(t)},n=s("5d2d"),r="password",c="86",a="获取验证码",u={props:{registerType:{type:Number,default:1},submitText:{type:String,default:"立即注册"},placeholder:{type:String,default:"请设置密码（6-16位字符）"}},data:function(){return{passwordType:r,countryCode:c,captchaTips:a,showCountryList:!1,isSendCode:!1,timer:null,timeout:60,loginForm:{certCode:"",pwd:"",captcha:"",eventId:0},loginRules:{certCode:{tips:""},pwd:{tips:""},captcha:{tips:""}}}},computed:{query:function(){return this.$route.query},isCanSend:function(){return 1<this.loginForm.certCode.length},isDisabled:function(){var t=this.loginForm,e=t.certCode,s=t.pwd,i=t.captcha;return(e.length&&s.length&&i.length)<1},itemCodeClass:function(){return{"item-code":!0,active:this.isCanSend}},iconEyeClass:function(){var t=this.passwordType===r;return{"icon-eye":!0,"icon-eye-close":t,"icon-eye-open":!t}}},methods:{handleShowCountryList:function(){this.showCountryList=!0},selectItem:function(t){var e=t.value;this.countryCode=e,this.showCountryList=!1},handleSendCode:function(){if(this.isSendCode||!this.isCanSend)return!1;var t=this.countryCode,e=this.loginForm.certCode;if(t===c&&!o(e))return!(this.loginRules.certCode.tips="请输入正确的手机号码");if(this.loginRules.certCode.tips="",!e)return!(this.loginRules.certCode.tips="手机号码不能为空");this.loginRules.certCode.tips="",this.isSendCode=!0;var s={phoneNum:t===c?e:"".concat(t,"-").concat(e)};switch(this.registerType){case 1:this.fetchRegister(s);break;case 2:this.fetchPasswordRest(s);break;default:this.fetchRegister(s)}},fetchRegister:function(t){var e=this;this.$store.dispatch("checkMobile",t).then(function(s){if("Y"===s.result.isReg)return e.$createToast({type:"error",txt:"手机号已被其他用户注册",onTimeout:function(){e.isSendCode=!1}}).show(),!1;e.fetchPasswordRest(t)})},fetchPasswordRest:function(t){var e=this,s=Object.assign({},{certType:0},t);this.$store.dispatch("sendCode",s).then(function(t){var s=t.result.eventId;e.loginForm.eventId=s,e.timer=setInterval(function(){return e.timeClock()},1e3)})},timeClock:function(){this.timeout--,this.captchaTips=this.timeout+"s",this.timeout<0&&(clearTimeout(this.timer),this.isSendCode=!1,this.captchaTips=a)},handleTogglePassword:function(){this.passwordType===r?this.passwordType="text":this.passwordType=r},handleSubmit:function(){if(this.chechFormRules())switch(this.registerType){case 1:this.submitRegister();break;case 2:this.submitPasswordReset();break;case 3:this.submitPhoneBind();break;default:this.submitRegister()}},submitPhoneBind:function(){var t=this,e=this.countryCode,s=this.loginForm.certCode,i=e===c?s:"".concat(e,"-").concat(s),o=Object.assign({},this.loginForm,{phoneNum:i});this.$store.dispatch("updateMobile",o).then(function(){t.$createToast({type:"correct",txt:"绑定成功",onTimeout:function(){t.handleLoginSuccess()}}).show()})},submitPasswordReset:function(){var t=this,e=this.countryCode,s=this.loginForm.pwd,i=this.loginForm.certCode,o=e===c?i:"".concat(e,"-").concat(i),n=Object.assign({},this.loginForm,{phoneNum:o,newPwd:s});this.$store.dispatch("resetPassword",n).then(function(){t.$createToast({type:"correct",txt:"操作成功，请返回重新登录",time:3e3,onTimeout:function(){t.handlePasswordSuccess()}}).show()})},submitRegister:function(){var t=this,e=Object(i.a)(),s=e.channelId,o=void 0===s?1:s,r=e.invUserId,a=void 0===r?1:r,u=e.utm_source,l=void 0===u?"Web":u,d=e.utm_medium,h=void 0===d?"mobile-pc":d,p=e.sourceCode,m=void 0===p?"":p,g=this.countryCode,f=this.loginForm.certCode,v=g===c?f:"".concat(g,"-").concat(f),C=Object.assign({},this.loginForm,{certCode:v,certType:0,invUserId:a,sourceCode:m,userSourceChannelId:o,regSourceType:l,regSource:h});this.$store.dispatch("register",C).then(function(e){0===e.code&&t.$createToast({type:"correct",txt:"注册成功",onTimeout:function(){n.c("user",e),t.handleLoginSuccess()}}).show()})},getUserType:function(t){var e=this;this.$store.dispatch("getUserType").then(function(s){s&&2===s.type&&(e.$store.dispatch("logout"),location.href="https://sns.9fstock.com/webstatic/downApp/download_stock.html"),t&&t()})},handlePasswordSuccess:function(){var t=this;this.$store.dispatch("logout",{}).then(function(){t.$router.replace({name:"login",query:t.query})})},handleLoginSuccess:function(){this.$router.push({path:"/finish",query:{register:"register"}})},chechFormRules:function(){var t=this.loginForm,e=t.certCode,s=t.pwd,i=t.eventId,o=t.captcha;return e?(this.loginRules.certCode.tips="",0===i?!(this.loginRules.captcha.tips="请先获取验证码"):(this.loginRules.captcha.tips="",o?(this.loginRules.captcha.tips="",!s||s.length<6||16<s.length?!(this.loginRules.pwd.tips="密码必须为6-16位字符"):!(this.loginRules.pwd.tips="")):!(this.loginRules.captcha.tips="请输入验证码"))):!(this.loginRules.certCode.tips="请输入正确的手机号码")}}},l=s("6691"),d=Object(l.a)(u,function(){var t=this,e=t.$createElement,s=t._self._c||e;return s("section",{staticClass:"login"},[s("div",{staticClass:"login-form"},[s("div",{staticClass:"form-item"},[s("div",{staticClass:"item-input"},[s("span",{staticClass:"item-country",on:{click:t.handleShowCountryList}},[t._v("\n          +"+t._s(t.countryCode)+"\n        ")]),s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.loginForm.certCode,expression:"loginForm.certCode",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"请输入手机号码"},domProps:{value:t.loginForm.certCode},on:{input:function(e){e.target.composing||t.$set(t.loginForm,"certCode",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),s("div",{staticClass:"item-tips error-msg"},[t._v(t._s(t.loginRules.certCode.tips))])]),s("div",{staticClass:"form-item"},[s("div",{staticClass:"item-input"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.loginForm.captcha,expression:"loginForm.captcha",modifiers:{trim:!0}}],attrs:{type:"text",placeholder:"请输入短信验证码"},domProps:{value:t.loginForm.captcha},on:{input:function(e){e.target.composing||t.$set(t.loginForm,"captcha",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),s("span",{class:t.itemCodeClass,on:{click:t.handleSendCode}},[t._v("\n          "+t._s(t.captchaTips)+"\n        ")])]),s("div",{staticClass:"item-tips error-msg"},[t._v(t._s(t.loginRules.captcha.tips))])]),s("div",{staticClass:"form-item"},[s("div",{staticClass:"item-input"},[s("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.loginForm.pwd,expression:"loginForm.pwd",modifiers:{trim:!0}}],attrs:{type:t.passwordType,placeholder:t.placeholder},domProps:{value:t.loginForm.pwd},on:{input:function(e){e.target.composing||t.$set(t.loginForm,"pwd",e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}}),s("span",{staticClass:"item-icon",on:{click:t.handleTogglePassword}},[s("i",{class:t.iconEyeClass})])]),s("div",{staticClass:"item-tips error-msg"},[t._v(t._s(t.loginRules.pwd.tips))])]),s("div",{staticClass:"form-item form-btn"},[s("cube-button",{attrs:{disabled:t.isDisabled},on:{click:t.handleSubmit}},[t._v(t._s(t.submitText))])],1)]),t.showCountryList?[s("country-list",{on:{selectItem:t.selectItem}})]:t._e()],2)},[],!1,null,"5c475c09",null);e.a=d.exports},"4b90":function(t,e,s){"use strict";function i(){var t=0<arguments.length&&void 0!==arguments[0]?arguments[0]:location.search.substr(1);return t?JSON.parse('{"'+decodeURIComponent(t).replace(/"/g,'\\"').replace(/&/g,'","').replace(/=/g,'":"')+'"}'):{}}function o(){var t=(0<arguments.length&&void 0!==arguments[0]?arguments[0]:location.href).split("#"),e={};return t.forEach(function(t){var s=t,i=s.indexOf("?");if(s=s.substr(i+1),-1<i)for(var o=s.split("&"),n=0;n<o.length;n+=1){var r=o[n].indexOf("=");if(0<r){var c=o[n].substring(0,r),a=o[n].substr(r+1);e[c]=decodeURIComponent(a)}else{var u=o[n];""!==u&&(e[u]=!0)}}}),e}s.d(e,"b",function(){return i}),s.d(e,"a",function(){return o}),s("f763"),s("7bc1"),s("55a0"),s("9090"),s("34a3"),s("3c6b")},"55a0":function(t,e,s){"use strict";var i=s("a013"),o=s("4b0a"),n=s("35dd");s("629c")("search",1,function(t,e,s,r){return[function(s){var i=t(this),o=null==s?void 0:s[e];return void 0!==o?o.call(s,i):new RegExp(s)[e](String(i))},function(t){var e=r(s,t,this);if(e.done)return e.value;var c=i(t),a=String(this),u=c.lastIndex;o(u,0)||(c.lastIndex=0);var l=n(c,a);return o(c.lastIndex,u)||(c.lastIndex=u),null===l?-1:l.index}]})},f5c1:function(t,e,s){"use strict";s.r(e);var i={name:"password-reset",data:function(){return{type:2,text:"找回密码",placeholder:"请输入犇犇新密码（6-16位字符串）"}},components:{registerForm:s("3133").a}},o=s("6691"),n=Object(o.a)(i,function(){var t=this,e=t.$createElement;return(t._self._c||e)("register-form",{attrs:{"register-type":t.type,placeholder:t.placeholder,"submit-text":t.text}})},[],!1,null,null,null);e.default=n.exports}}]);