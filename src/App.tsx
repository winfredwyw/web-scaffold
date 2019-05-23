import React from 'react';
import { Tag } from 'antd';
// import logo from './logo.svg';
import logo from '@src/logo.svg'
import styles from './App.module.less';
import './App.less';

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
