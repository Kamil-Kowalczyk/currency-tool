import { Link } from 'react-router-dom';
import styles from './nav-item.module.scss';

export interface NavItemProps {
  path: string,
  title: string,
}

export function NavItem({path, title}: NavItemProps) {
  return (
    <li className='nav-item active me-2'>
      <Link className={`nav-link ${styles.navLink}`} to={path}>{title}</Link>
    </li>
  )
}

export default NavItem;
