import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, ShoppingCart, FileText } from 'lucide-react';
import styles from './Sidebar.module.css';

const Sidebar = () => {
  return (
    <aside className={styles.sidebar}>
      <div className={styles.logo}>
        <h2>SysControl</h2>
      </div>
      <nav className={styles.nav}>
        <ul>
          <li>
            <NavLink 
              to="/" 
              className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
            >
              <LayoutDashboard size={20} />
              <span>Dashboard</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/customers" 
              className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
            >
              <Users size={20} />
              <span>Clientes</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/sales" 
              className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
            >
              <ShoppingCart size={20} />
              <span>Vendas</span>
            </NavLink>
          </li>
          <li>
            <NavLink 
              to="/reports" 
              className={({ isActive }) => isActive ? `${styles.link} ${styles.active}` : styles.link}
            >
              <FileText size={20} />
              <span>Relatórios</span>
            </NavLink>
          </li>
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
