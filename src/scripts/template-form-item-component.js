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
  const indexTep = `import * as React from 'react';
import Form from 'rc-field-form';

import './index.less';

const { Field } = Form;

const Error = ({ children }: any) => (
  children.map((error: React.ReactNode, index: number) => (
    index == 0 ? <div key={index} className="same_err">{error}</div> : ""
  ))
);

// 填写成功提示
const FieldState = ({ touched, validating }: { touched: boolean; validating: boolean }) => (
  <div
    style={{
      color: 'green',
      position: 'absolute',
      marginTop: -35,
      left: 300,
    }}
  >
    {touched ? <span>Touched!</span> : null}
    {validating ? <span>Validating!</span> : null}
  </div>
);

const FormItem: React.FunctionComponent<any> = ({
  name,
  label,
  children,
  ...restProps
}) => (
  <Field name={name} {...restProps}>
    {(control, meta, form) => {
      const childNode =
        typeof children === 'function'
          ? children(control, meta, form)
          : React.cloneElement(children as React.ReactElement, {
            ...control,
          });

      return <div className="Input_dom">
        <div className="same">
          <div className="same_title">{label || name}</div>
          <div className="same_ipt">
            {childNode}
          </div>

          {/* 填写成功提示 */}
          {/* <FieldState {...meta} /> */}

          <Error>{meta.errors}</Error>
        </div>
      </div>
    }}
  </Field>
);

export default FormItem;
`;

  // 创建css
  const indexCss = `.form_item_component {

  .form_item_same {
    position: relative;
    width: 99.5%;
    padding-top: 22px;

    .form_item_same_err {
      position: absolute;
      right: 0;
      top: 26px;
      font-size: 28px;
      line-height: 42px;
      color: #da0000;
    }

    .form_item_ame_title {
      margin-bottom: 16px;
      width: 100%;
      font-size: 32px;
      line-height: 48px;
      color: #999999;
      text-align: left;
    }

    .form_item_same_ipt {
      position: relative;
      width: 100%;
      min-height: 88px;
      padding: 20px 30px;
      border: 1PX solid #d3d1d1;
      display: flex;
      align-items: center;
    }
  }
}
`;

  // 创建文件夹
  fs.mkdirSync(`./FormItem`); // mkdir $1

  // 主页面
  process.chdir(`./FormItem`); // cd 到主页面
  fs.writeFileSync('index.tsx', indexTep);
  fs.writeFileSync('index.less', indexCss);
  console.log('安装成功！');
  process.exit(0);
};
