import { Link } from 'react-router-dom';
import styles from './nav-item.module.scss';

export interface NavItemProps {
  path: string,
  title: string,
  isCurrentPage: boolean
}

export function NavItem({path, title, isCurrentPage}: NavItemProps) {
  return (
    <li className={`${styles.linkContainer} nav-item me-4`}>
      <Link 
        className={`nav-link ${styles.normalLink} ${isCurrentPage ? styles.currentPage : styles.normalLink}`}
        to={path}
      >
        {title}
      </Link>
    </li>
  )
}

export default NavItem;
