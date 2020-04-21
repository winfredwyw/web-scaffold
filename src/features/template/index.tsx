/**
 * @module: 参考模板
 * @author: Yawei Wang 
 * @date: 2019-05-24 19:15:53 
 */
import React from 'react';
import { Tag } from 'antd';
import logo from '@src/assets/logo.svg';
import styles from './index.module.less';
import './index.less';

interface IProps {
  a: string
}

const App: React.FC = (props:any) => {
  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <img src={logo} className={styles.AppLogo} alt="logo" />
        <p>
          YZJ 前端脚手架 @Create React App
        </p>
        <div>
          <Tag color="magenta">React</Tag>
          <Tag color="red">Less</Tag>
          <Tag color="volcano">Mobx</Tag>
          <Tag color="gold">TypeScript</Tag>
          <Tag color="geekblue">antd</Tag>
          <Tag color="orange">tsling</Tag>
        </div>
      </header>
    </div>
  );
}

export default App;
