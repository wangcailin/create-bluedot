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
  const indexTep = `import React, { useEffect, useState } from 'react';
import { connect, GlobalModelState } from 'umi';
import './index.less';

interface PropsType {
  global: GlobalModelState;
  dispatch: any;
}

const ${capPirName}Page: React.FC<PropsType> = (props) => {
  const { global, dispatch } = props;
  const [formValue, setFormValue] = useState({
    name: '改动',
    title: '内容说明',
  });

  useEffect(() => {

    return componentWillUnmount;
  }, []);

  function componentWillUnmount() {
    // 组件销毁时你要执行的代码
    // alert('组件销毁？');
  }

  return (
    <div className="${dirName}_dom">
      <div>
        首页
        <div>测试：{global.name}</div>
        <div
          onClick={() => {
            dispatch({
              type: 'global/query',
            });
          }}
        >
          点击切换名称
        </div>
      </div>
      <div>useState使用：</div>
      <div>formValueName：{formValue.name}</div>
      <div>formValueTitle：{formValue.title}</div>
    </div>
  );
};

// 依赖models写法
export default connect(({ global }: { global: GlobalModelState }) => ({
  global,
}))(${capPirName}Page);
`;

  // 创建css
  const indexCss = `.${dirName}_dom {

  .title {
    font-size: 30px;
    background: rgb(121, 242, 157);
  }
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
