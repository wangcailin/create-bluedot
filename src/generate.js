const fs = require('fs-extra');

const reactPc = require('./scripts/react-pc');
const umiH5 = require('./scripts/umi-h5');
const vueH5 = require('./scripts/vue-h5');
const uniApp = require('./scripts/uni-app');
const taroDva = require('./scripts/taro-dva');
const antDesignPro = require('./scripts/ant-design-pro');

const templatePure = require('./scripts/template-pure');
const templateMonitor = require('./scripts/template-monitor');
const templateModels = require('./scripts/template-models');
const templateUseRequest = require('./scripts/template-use-request');
const templateForm = require('./scripts/template-form');
const templateFormItemComponent = require('./scripts/template-form-item-component');

const moduleActivity = require('./scripts/module-activity');

exports.run = function (name, type) {
  switch (type) {
    case 'react-pc':
      reactPc.run(name);
      break;
    case 'umi-h5':
      umiH5.run(name);
      break;
    case 'uni-app':
      uniApp.run(name);
      break;
    case 'taro-dva':
      taroDva.run(name);
      break;
    case 'ant-design-pro':
      antDesignPro.run(name);
      break;
    case 'pure':
      templatePure.run(name);
      break;
    case 'monitor':
      templateMonitor.run(name);
      break;
    case 'models':
      templateModels.run(name);
      break;
    case 'use-request':
      templateUseRequest.run(name);
      break;
    case 'form':
      templateForm.run(name);
      break;
    case 'form-item-component':
      templateFormItemComponent.run(name);
      break;
    case 'applet-module-activity':
      moduleActivity.run(name);
      break;
    case 'vue-h5(Bate)':
      vueH5.run(name);
      break;
  }
};
