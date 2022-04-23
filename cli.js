#!/usr/bin/env node
const inquirer = require('inquirer');
const bt = require('./src/generate');
const utils = require('./src/utils/checkUpdate');
// 当前系统是Windows还是mac;
const isWin = /^win/.test(process.platform);
let packagePath = '/usr/local/lib/node_modules'; // node_modules全局路径

const run = () => {
  inquirer
    .prompt([
      {
        type: 'input',
        message: '设置文件名称:',
        name: 'name',
        default: 'test', // 默认值
      },
      {
        type: 'list',
        name: 'template',
        message: '请选择模版类型',
        choices: ['template', 'html', 'applet', 'applet-module', 'ant-design-pro'],
      },
      {
        type: 'list',
        name: 'type',
        message: '请选择H5框架',
        choices: ['umi-h5', 'react-pc', 'vue-h5(Bate)'],
        when: function (answers) {
          // 当watch为true的时候才会提问当前问题
          return answers.template == 'html';
        },
      },
      {
        type: 'list',
        name: 'type',
        message: '请选择小程序框架',
        choices: ['uni-app', 'taro-dva'],
        when: function (answers) {
          // 当watch为true的时候才会提问当前问题
          return answers.template == 'applet';
        },
      },
      {
        type: 'list',
        name: 'type',
        message: '请选择h5模版类型',
        choices: ['pure', 'form', 'form-item-component', 'models', 'use-request', 'monitor'],
        when: function (answers) {
          // 当watch为true的时候才会提问当前问题
          return answers.template == 'template';
        },
      },
      {
        type: 'list',
        name: 'type',
        message: '请选择小程序模版',
        choices: ['applet-module-activity'],
        when: function (answers) {
          // 当watch为true的时候才会提问当前问题
          return answers.template == 'applet-module';
        },
      },
    ])
    .then(answers => {
      let type = answers.template;

      if (answers.type) {
        type = answers.type;
      }

      bt.run(answers.name, type);
    });
};

if (isWin) {
  run();
} else {
  utils
    .checkUpdate(`create-bluedot`, {
      packagePath: packagePath,
    })
    .then(() => {
      run();
    })
    .catch(() => {});
}
