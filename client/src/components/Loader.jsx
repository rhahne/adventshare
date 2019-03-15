import React from 'react';
import styles from "../styles/loaderStyles.module.css"

const Loader = () => {
    return (
      <div className={styles.loadingScreen}>
        <div className={styles.spinner}> </div>
      </div>
    )
}

export default Loader