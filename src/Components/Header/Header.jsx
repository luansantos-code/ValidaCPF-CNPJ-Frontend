import { Link } from 'react-router-dom' 
import styles from './Header.module.css'

function Header() {
    return(
        <header className={styles.header}>
            <Link to="/">
                <h1 href="/" className={styles.h1}>Info Validate - CPF/CNPJ</h1>
            </Link>

            <nav className={styles.nav}>
                <a href="/" className={styles.home}>Home</a>
                <a href="/contato" className={styles.contato}>Contato</a>
            </nav>

            <div className={styles.spacer}></div>
        </header>
    );
}

export default Header;