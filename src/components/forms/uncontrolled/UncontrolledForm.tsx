import AgreementInput from './inputs/agreement/AgreementInput';
import AvatarInput from './inputs/avatar/AvatarInput';
import ConfirmInput from './inputs/confirm/ConfirmInput';
import CountryInput from './inputs/country/CountryInput';
import EmailInput from './inputs/email/EmailInput';
import GenderInput from './inputs/gender/GenderInput';
import NameInput from './inputs/name/NameInput';
import PasswordInput from './inputs/password/PasswordInput';
import styles from '../Form.module.css';

interface UncontrolledFormProps {
  saveHandler: () => void;
}

function UncontrolledForm({ saveHandler }: UncontrolledFormProps) {
  const handleSubmit = (formData: FormData) => {
    const values = formData.entries();
    for (const [key, value] of values) {
      console.log(`${key}:`, value);
    }

    saveHandler();
  };

  return (
    <form action={handleSubmit} className={styles.form}>
      <h1>Uncontrolled Form</h1>
      <div className={styles.content}>
        <div className={styles.section}>
          <NameInput />
          <EmailInput />
          <PasswordInput />
          <ConfirmInput />
          <AgreementInput />
        </div>
        <div className={styles.section}>
          <CountryInput />
          <GenderInput />
          <AvatarInput />
        </div>
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default UncontrolledForm;
