import React from 'react';
import styles from './StatusUpdate.module.css';

function StatusUpdate() {
  return (
    <div className={styles.statusUpdateContainer}>
      <div className={styles.avatar}>
        <img src='/images/person.svg' alt="Your Avatar" />
      </div>
      <div className={styles.inputContainer}>
        <input
          type="text"
          placeholder="Share your thoughts or green actions with the group!"
          className={styles.statusInput}
        />
      </div>
      <div className={styles.actions}>
        <button className={styles.actionButton}>
          <img src="/images/camera.svg" alt="Camera" />
        </button>
        <button className={styles.actionButton}>
          <img src="/images/pencil-square.svg" alt="Write" />
        </button>
        <button className={styles.actionButton}>
          <img src="/images/gift.svg" alt="Pin" /> {/* Changed from gift to pin for groups */}
        </button>
      </div>
    </div>
  );
}

export default StatusUpdate;