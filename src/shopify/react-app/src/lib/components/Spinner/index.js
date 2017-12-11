import React from 'react';
import spinner from './puff.svg';
//import styles from './index.sass';
import styles from  './AppSpin.css';


const Spinner = props =>
<div className={styles.spinner}>

<img src= {spinner}/>
</div>;

export default Spinner;