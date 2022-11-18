import Link from 'next/link';
import styles from './styles.module.scss';

export default function Login() {
    return (
        <div className={styles.login_form}>
            <div>
                <form>
                    <div>
                        <label>Username </label>
                        <input type="text" name="uname" required />
                        {/* {renderErrorMessage("uname")} */}
                    </div>
                    <div>
                        <label>Password </label>
                        <input type="password" name="pass" required />
                        {/* {renderErrorMessage("pass")} */}
                    </div>
                    <div>
                        <input type="submit" />
                    </div>
                </form>
                <Link href='/register' legacyBehavior><a className={styles.register_btn}>Devino Investitor Profesional</a></Link>
            </div>
        </div>
    )
}