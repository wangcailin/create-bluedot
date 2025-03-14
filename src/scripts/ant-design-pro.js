const download = require('download-git-repo');

exports.run = function (name) {
  download(
    'direct:https://github.com/wangcailin/bluedot-antd-pro.git',
    name,
    { clone: true },
    function (err) {
      console.log(err ? '下载失败！请查看当前文件夹是否有同名文件！' : '下载成功！');
    }
  );
};
