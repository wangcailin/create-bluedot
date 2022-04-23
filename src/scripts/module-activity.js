var readline = require('readline');//读取文件每一行的模块
var fs = require('fs');//文件模块
var os = require('os');//一些基本的系统操作函数
var path = require('path');
const chalk = require('chalk');

const download = require("download-git-repo");

const { deleteFolder } = require('../utils/deleteFolder');
const { makeDir } = require('../utils/makeDir');


var gitPath = './node_component';// clone的git文件存放位置


exports.run = async function (name) {

  console.log(chalk.yellow('准备写入页面路由'));
  await writerRouter();

  console.log(chalk.yellow('准备下载页面'));
  await gitDownload();

  nextStep();
};

function gitDownload() {

  return new Promise((resolve, reject) => {
    if (fs.existsSync(gitPath)) {
      console.log(`路径已存在！正在读取${gitPath}下的文件`)
      // nextStep();
      resolve();
    } else {
      download(
        "direct:https://gitee.com/blue-dot-cn/uni-app-activity-module",
        gitPath,
        { clone: true, },
        function (err) {
          console.log(
            err ? "失败！" : "下载成功！"
          );
          // nextStep();
          resolve();
        }
      );
    };
  });
}

function writerRouter() {
  var homeJson = true;
  var subPackagesJson = true;
  var fReadName = './pages.json';// 读取的文件
  var fWriteName = './pages.json';// 导出文件（可以不新建 没有该文件  系统会帮忙新建）
  var fRead = fs.createReadStream(fReadName);//创建文件读入流
  var jsJson = '';
  var objReadline = readline.createInterface({
    input: fRead,//input 为可读流 output为可写流
    terminal: true
  });

  return new Promise((resolve, reject) => {

    objReadline.on('line', (line) => {
      jsJson += line + os.EOL;
      const currentLine = line.replace(/\s+/g, "");
      // 首页
      if (currentLine.includes('"pages":[') && homeJson) {
        homeJson = false;
        jsJson += `    // 活动使用
    {
      "path": "pages/platform/platform",
      "style": {
        "navigationBarTitleText": "活动"
      }
    },
`;
      };
      // 其他页面链接
      if (currentLine.includes('"subPackages":[') && subPackagesJson) {
        subPackagesJson = false;
        jsJson += routerSubPackagesJson();
      };
    });
    objReadline.on('close', () => {
      console.log('pages.json写入中')
      var fWrite = fs.createWriteStream(fWriteName);//创建文件写入流
      fWrite.write(jsJson);
      console.log('pages.json写入成功！');
      resolve();
    });
  });
};
function routerSubPackagesJson() {
  return `    // 活动模块
    {
      "root": "subcontract/platform",
      "pages": [
        {
          "path": "search/search",
          "style": {
            "navigationBarTitleText": "搜索",
            "backgroundColorTop": "#ffffff",
            "backgroundColorBottom": "#ffffff"
          }
        },
        {
          "path": "details/details",
          "style": {
            "navigationBarTitleText": "活动详情",
            "backgroundColorTop": "#ffffff",
            "backgroundColorBottom": "#ffffff"
          }
        },
        {
          "path": "poster/online",
          "style": {
            "navigationBarTitleText": "活动海报",
            "backgroundColorTop": "#ffffff",
            "backgroundColorBottom": "#ffffff"
          }
        },
        {
          "path": "signUp/signUp",
          "style": {
            "navigationBarTitleText": "活动报名",
            "backgroundColorTop": "#ffffff",
            "backgroundColorBottom": "#ffffff"
          }
        },
        {
          "path": "auditStatus/auditStatus",
          "style": {
            "navigationBarTitleText": "活动报名",
            "backgroundColorTop": "#ffffff",
            "backgroundColorBottom": "#ffffff"
          }
        },
        {
          "path": "review/review",
          "style": {
            "navigationBarTitleText": "活动回顾",
            "backgroundColorTop": "#ffffff",
            "backgroundColorBottom": "#ffffff"
          }
        }
      ]
    },
`
}


function nextStep() {
  console.log('迁移文件');
  fileDisplay(gitPath);
  console.log('迁移文件完毕！');

  console.log('删除文件夹');
  deleteFolder(gitPath);
  console.log('删除完毕！');

  console.log(chalk.yellow('模块添加完成！'));
  console.log(chalk.red('图片和云开发请自行查看platformstatic。自行迁移到static下'));
};

// 移动文件到根目录（因为git下载地址必须填写文件夹名称）
function fileDisplay(filePath) {
  //根据文件路径读取文件，返回文件列表
  try {
    const files = fs.readdirSync(filePath);
    files.forEach(function (filename) {
      //获取当前文件的路径
      var filedir = path.join(filePath, filename);
      //根据文件路径获取文件信息，返回一个fs.Stats对象
      const stats = fs.statSync(filedir);
      try {
        var isFile = stats.isFile();//是文件
        var isDir = stats.isDirectory();//是文件夹
        if (isFile) {
          const destPath = `./${filedir}`.replace(gitPath, '.');
          const makeDirPath = `./${filePath}`.replace(gitPath, '.');
          makeDir(makeDirPath);
          // 通过重命名移动文件到根目录
          console.log('当前迁移文件：', destPath);
          try {
            fs.renameSync(filedir, destPath);
          } catch (error) {
            console.log(chalk.red(`迁移失败，文件路径：${destPath}`));
            console.log(error);
          };
        };
        if (isDir) {
          fileDisplay(filedir);//递归，如果是文件夹，就继续遍历该文件夹下面的文件
        };
      } catch (error) {
        console.log(chalk.red(`获取文件stats失败，文件路径：${filedir}`));
        console.log(error);
      };
    });
  } catch (error) {
    console.log(chalk.red(`读取文件失败，文件路径：${filePath}`));
    console.log(error);
  };
};
