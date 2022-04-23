const chalk = require('chalk');
/**
* 从 npmjs 检查依赖版本
* @param {*} name 要检查更新的依赖名称
* @param {object} param1 参数
* @param {string} param1.version 指定版本
* @param {array} param1.packagePath 指定路径
*/
async function checkUpdate(name, { version, packagePath } = {}) {
  function hasFile(filePath) { // 判断文件或目录是否存在
    const fs = require(`fs`)
    return fs.existsSync(filePath)
  };
  function getLocalVersion(name) { // 从本地获取版本号
    packagePath = packagePath || require.main.paths.concat(`${require(`path`).parse(process.execPath).dir}/node_modules`) // 全局安装目录
      .find(path => hasFile(`${path}/${name}/package.json`))
    // console.log(`packagePath`, packagePath);
    if (packagePath) {
      return require(`${packagePath}/${name}/package.json`).version // 从 package 中获取版本
    }
  };
  function getServerVersion(name) { // 从 npmjs 中获取版本号
    return new Promise((resolve, reject) => {
      const https = require('https');
      https.get(`https://registry.npmjs.org/${name}`, res => {
        let data = ''
        res.on('data', chunk => {
          data += chunk
        })
        res.on('end', () => {
          const latest = (JSON.parse(data)[`dist-tags`] || {}).latest // 获取最新版本
          resolve(latest)
        })
      }).on(`error`, (err) => {
        throw new Error(err.message)
      })
    })
  };
  const getLocalVersionRes = getLocalVersion(name);
  const getServerVersionRes = await getServerVersion(name);

  return new Promise((resolve, reject) => {
    if (getLocalVersionRes !== getServerVersionRes) {
      console.log(`${name} 已发布新版本 ${getServerVersionRes}, 你当前版本为 ${getLocalVersionRes}`);
      console.log(`${chalk.red('更新执行：')}npm i -g bluedot-template@${getServerVersionRes}`);
      reject({});
    } else {
      resolve({});
    };
  });
};

exports.checkUpdate = checkUpdate;
