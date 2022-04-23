const fs = require('fs');

exports.run = function (name) {
  const dirName = name;

  // 首字母大写
  const capPirName =
    dirName.substring(0, 1).toUpperCase() + dirName.substring(1);

  if (fs.existsSync(`./${dirName}`)) {
    console.log('安装失败！该路径已存在');
    process.exit(0);
  }

  // 创建页面模版
  const indexTep = `import React from 'react';
import './index.less';

interface PropsType {

}

const ${capPirName}Page: React.FC<PropsType> = (props) => {

  return (
    <div className="${dirName}_dom">
      测试文案
    </div>
  );
};

export default ${capPirName}Page;
`;

  // 创建css
  const indexCss = `.${dirName}_dom {

}
`;

  // 创建文件夹
  fs.mkdirSync(`./${dirName}`); // mkdir $1

  // 主页面
  process.chdir(`./${dirName}`); // cd 到主页面
  fs.writeFileSync('index.tsx', indexTep);
  fs.writeFileSync('index.less', indexCss);
  console.log('安装成功！');
  process.exit(0);
};
