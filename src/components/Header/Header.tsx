import { Timeline } from '../Timeline/Timeline';
import styles from './Header.module.scss';

export const Header = () => {
  return (
    <div className={styles.sidebar}>
      <div className={styles.logo}>
        <h1 className={styles.title}>EYEBOOK</h1>
      </div>
      <Timeline />
    </div>
  );
};
