import styles from './Error.module.css';

interface ErrorProps {
  message: string;
}

function ErrorMessage({ message }: ErrorProps) {
  return <div className={styles.message}>{message}</div>;
}

export default ErrorMessage;
