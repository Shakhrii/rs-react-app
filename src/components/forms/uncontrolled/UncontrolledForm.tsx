import AgreementInput from './inputs/agreement/AgreementInput';
import AvatarInput from './inputs/avatar/AvatarInput';
import ConfirmInput from './inputs/confirm/ConfirmInput';
import CountryInput from './inputs/country/CountryInput';
import EmailInput from './inputs/email/EmailInput';
import GenderInput from './inputs/gender/GenderInput';
import NameInput from './inputs/name/NameInput';
import PasswordInput from './inputs/password/PasswordInput';
import styles from '../Form.module.css';
import { FormSchema } from '../../../types/types';
import z from 'zod';
import { useState } from 'react';
import ErrorMessage from '../error/ErrorMessage';

interface UncontrolledFormProps {
  saveHandler: () => void;
}

function UncontrolledForm({ saveHandler }: UncontrolledFormProps) {
  const [error, setError] = useState<{
    fieldErrors: Record<string, string[]>;
    formErrors: string[];
  }>({ fieldErrors: {}, formErrors: [] });

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const formData = Object.fromEntries(form.entries());
    const convertData = {
      ...formData,
      agreement: formData.agreement === 'on',
      avatar: form.get('avatar') as File | null,
    };

    const result = FormSchema.safeParse(convertData);
    if (result.success) {
      saveHandler();
    } else {
      const flattened = z.flattenError(result.error);
      setError(flattened);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <h1>Uncontrolled Form</h1>
      <div className={styles.content}>
        <div className={styles.section}>
          <NameInput />
          {error?.fieldErrors.name && (
            <ErrorMessage message={error.fieldErrors.name[0]} />
          )}
          <EmailInput />
          {error?.fieldErrors.email && (
            <ErrorMessage message={error.fieldErrors.email[0]} />
          )}
          <PasswordInput />
          {error?.fieldErrors.password && (
            <ErrorMessage message={error.fieldErrors.password[0]} />
          )}
          <ConfirmInput />
          {error?.fieldErrors.confirm && (
            <ErrorMessage message={error.fieldErrors.confirm[0]} />
          )}
          <AgreementInput />
        </div>
        <div className={styles.section}>
          <CountryInput />
          {error?.fieldErrors.country && (
            <ErrorMessage message={error.fieldErrors.country[0]} />
          )}
          <GenderInput />
          <AvatarInput />
          {error?.fieldErrors.avatar && (
            <ErrorMessage message={error.fieldErrors.avatar[0]} />
          )}
        </div>
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default UncontrolledForm;
