import React, { useEffect } from 'react';
import { Tag } from 'antd';
// import logo from './logo.svg';
import logo from '@src/logo.svg'
import Postmate from 'postmate'
import styles from './App.module.less';
import './App.less';

interface IProps {
  a: string
}

const App: React.FC = (props:any) => {

  useEffect(() => {
    const handshake = new Postmate({
      container: document.getElementById('js-iframe'), // Element to inject frame into
      url: 'http://192.168.0.104:4000/account/storage', // Page to load, must have postmate.js. This will also be the origin used for communication.
      classListArray: ["myClass"] //Classes to add to the iframe via classList, useful for styling.
    });

    // When parent <-> child handshake is complete, data may be requested from the child
    handshake.then(child => {
    
      // Fetch the height property in child.html and set it to the iFrames height
      child.get('height')
        .then(height => {
          alert(height)
          child.frame.style.height = `${+height + 320}px`
        });
    
      // Listen to a particular event from the child
      child.on('some-event', data => console.log(data)); // Logs "Hello, World!"
    });
  })

  return (
    <div className={styles.App}>
      <header className={styles.AppHeader}>
        <div id="js-iframe" style={{ width: 1000 }}></div>
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
