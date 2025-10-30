import styles from './SignIn.module.scss'
import { signIn } from '~/apis/authAPI/authAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const SignIn = () => {

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    await signIn(username, password)
      .then((data) => {
        toast.success(data.introduce);
        localStorage.setItem('accessToken', data.accessToken);
        setTimeout(() => {
          navigate('/admin')
        }, 1000)
      })
      .catch((error) => {
        toast.error(error.response?.data?.message || 'Sign in failed');
      });
  }

  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <div className={styles.header}></div>
        <h1 className={styles.title}>Sign In</h1>
        <h1 className={styles.subtitle}> Admin page </h1>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGroup}>
            <input className={styles.input} type="text" id="username" name="username" placeholder='USERNAME' required />
            <input className={styles.input} type="password" id="password" name="password" placeholder='PASSWORD' required />
          </div>
          <div className={styles.functionsDiv}>
            <div className={styles.rememberMe}>
              <input type="checkbox" id="rememberMe" name="rememberMe" />
              <label htmlFor="rememberMe"> Remember me</label>
            </div>
            <a href="#" className={styles.forgotPassword}>Forgot password?</a>
          </div>
          <button className={styles.button} type="submit">SIGN IN</button>
        </form>
        <div className={styles.footer}>
          <p>@Burger Queen - 2025</p>
        </div>
      </div>
    </div>
  )
}

export default SignIn
