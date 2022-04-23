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
import request from '@/utils/request';
import { history } from 'umi';
import './index.less';

interface PropsType {

}

const ${capPirName}Page: React.FC<PropsType> = (props) => {
  // 自动触发
  const { data: usersRes, error, loading } = request('/api/users');

  // 手动触发
  const usersData = request({
    url: '/api/mock3',
    method: 'post'
  }, {
    manual: true,// 是否需要手动触发
  });

  return (
    <div className="${dirName}_dom">
      <div>
        接口：/api/users <br />
        接口状态：{loading ? '请求中...' : "请求完成"} <br />
        数据：{JSON.stringify(usersRes)}
      </div>
      <br />
      <br />
      <div>
        <button onClick={() => {
          if (usersData.loading) {
            console.log('重复点击了')
            return;
          };

          usersData.run({
            data: {
              test: 'xxx'
            }
          });
        }}>点击开始请求</button> <br />
        接口：/api/mock3 <br />
        接口状态：{usersData.loading ? '请求中...' : "请求完成"}<br />
        数据：{JSON.stringify(usersData.data)}
      </div>
      <br />
      <br />
      登陆页面1
      < div
        onClick={() => {
          history.push('/home?sen1=123');
        }}
      >
        跳转页面1。home页获取的 location.search 是有 ? 拼接的
      </div>
      <div
        onClick={() => {
          history.push({
            pathname: '/home',
            query: {
              sen2: '123',
            },
          });
        }}
      >
        跳转页面2。home页获取的 location.search 无 ? 拼接的
      </div>
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
