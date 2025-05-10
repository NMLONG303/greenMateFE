import React from 'react';
import styles from './Post.module.css';

function Post({ post }) {
  return (
    <div className={styles.postContainer}>
      <div className={styles.userInfo}>
        <div className={styles.avatar}>
          <img src='/images/person.svg' alt={`${post.userName}'s Avatar`} />
        </div>
        <div className={styles.userDetails}>
          <p className={styles.userName}>{post.userName}</p>
          <p className={styles.userMeta}>
            Level {post.level} - {post.rank}
          </p>
          <p className={styles.timestamp}>{post.timestamp}</p>
        </div>
      </div>
      <div className={styles.postContent}>
        {post.content.type === 'image' && (
          <img src={post.content.src} alt={post.content.alt} className={styles.postImage} />
        )}
        {post.content.type === 'text' && (
          <p className={styles.postText}>{post.content.text}</p>
        )}
      </div>
      <div className={styles.postActions}>
        <button className={styles.actionButton}>
          <img src='/images/heart-fill.svg' alt="Like" /> {post.likes}
        </button>
        <button className={styles.actionButton}>
          <img src='/images/chat.svg' alt="Comment" /> {post.comments}
        </button>
        <button className={styles.actionButton}>
          <img src='/images/Share.svg' alt="Share" />
        </button>
      </div>
    </div>
  );
}

export default Post;