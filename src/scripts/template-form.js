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
import Form, { useForm } from 'rc-field-form';

import FormItem from '@/components/FormItem';

// 自定义控件
import CustomForm from './components/CustomForm';

import './index.less';

interface PropsType {

};

const ${capPirName}Page: React.FC<PropsType> = (props) => {
  const [form] = useForm();

  const myMessages = {
    required: '这个是比必填的',
    whitespace: '$'+'{displayName} 不可以是空的啦',// 因为模版问题所以才吧$'+'{用+号链接
    pattern: {
      mismatch: '$'+'{displayName} 并不符合格式规范',
    },
  };

  const onFinish = (values: { password: string }) => {
    console.log('Finish:', values);
  };

  const onFinishFailed = (errorInfo: any) => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div className="${dirName}_dom">
      <Form
        form={form}
        onFinish={onFinish}
        onFinishFailed={onFinishFailed}
        validateMessages={myMessages}// 是否需要统一配置错误文案
        initialValues={{ remember: true }}
      >
        <FormItem
          label="姓氏"
          name="first_name"
          messageVariables={{
            displayName: '这个可以自定义',
          }}
          rules={[
            { required: true },// 是否必填
            { whitespace: true },// 是否可以只填写空格
            { pattern: /^([0-9A-Za-z\-_\.]+)@([0-9A-Za-z\-_\.]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g },// 正则匹配
          ]}
        >
          <input placeholder="请输入姓氏" />
        </FormItem>

        <FormItem
          label="自定义表单控件"
          name="custom"
          messageVariables={{ displayName: '请选择' }}
          rules={[
            {
              // 自定义验证
              validator: (rule: any, value: any, callback: (error: any) => void, form: any) => new Promise((resolve, reject) => {
                console.log('注意：所有没有设置默认值的字段，如果不填写直接提交就会是undefined', value)
                if (value && value.first && value.two) {
                  resolve('');
                } else {
                  reject('ceshi');
                };
              })
            },
            // {
            //   // 自定义验证
            //   validator: (rule: any, value: any, callback: (error: any) => void, form: any) => {
            //     console.log('rule:', rule)
            //     callback((error: any) => {
            //       return '错误';
            //     });
            //   }
            // }
          ]}
        >
          <CustomForm />
        </FormItem>
      </Form>

      <button type="submit" onClick={() => {
        form
          .validateFields()
          .then(values => {
            console.log(values);
          });
      }}>提交</button>
    </div >
  );
};

export default ${capPirName}Page;
`;

  // 创建css
  const indexCss = `.${dirName}_dom {

  input {
    position: relative;
    z-index: 111;
    width: 100%;
    height: 100%;
    font-size: 12px;
  }
}
`;

  const CustomFormTel = `import React from 'react';
import './index.less';

const CustomFormInputPage: React.FC = ({ value = {}, onChange }: any) => {

  return (
    <div className='CustomFormInput_dom'>
      <div>
        <div>第一列选项：</div>
        <div className={value.first == 1 ? "active" : ""} onClick={() => {
          value.first = 1;
          onChange && onChange(value);
        }}>
          选项1-1
        </div>
        <div className={value.first == 2 ? 'active' : ''} onClick={() => {
          value.first = 2
          onChange && onChange(value);
        }}>
          选项1-2
        </div>
      </div>
      <div>
        <div>第二列选项：</div>
        <div className={value.two == 1 ? 'active' : ''} onClick={() => {
          value.two = 1;
          onChange && onChange(value);
        }}>
          选项2-1
        </div>
        <div className={value.two == 2 ? 'active' : ''} onClick={() => {
          value.two = 2;
          onChange && onChange(value);
        }}>
          选项2-2
        </div>
      </div>
    </div>
  );
};

export default CustomFormInputPage;
`
  const CustomFormCss = `.CustomFormInput_dom {
  position: relative;
  z-index: 10;
  display: flex;
  justify-content: space-between;
  width: 100%;

  &>div {
    flex: 1;
  }

  .active {
    color: red;
  }
}
`

  // 创建文件夹
  fs.mkdirSync(`./${dirName} `); // mkdir $1

  // 主页面
  process.chdir(`./${dirName} `); // cd 到主页面
  fs.writeFileSync('index.tsx', indexTep);
  fs.writeFileSync('index.less', indexCss);

  // 组件
  fs.mkdirSync(`./components`); // mkdir $1
  process.chdir(`./components`);
  fs.mkdirSync(`./CustomForm`);
  process.chdir(`./CustomForm`);
  fs.writeFileSync('index.tsx', CustomFormTel);
  fs.writeFileSync('index.less', CustomFormCss);

  console.log('安装成功！');
  process.exit(0);
};
