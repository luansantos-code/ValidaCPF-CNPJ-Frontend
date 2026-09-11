import styles from './Footer.module.css'

function Footer() {
    const currentYear = new Date().getFullYear();

    return(
        <footer className={styles.footer}>
            <div>
            <p className={styles.text}>© {currentYear} Luan Santos - Todos os direitos reservados.</p>
            </div>
        </footer>
    );
}

export default Footer;