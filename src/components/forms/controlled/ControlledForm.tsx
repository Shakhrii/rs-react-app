import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import styles from '../Form.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema } from '../../../types/types';
import { z } from 'zod';
import NameInput from './inputs/name/NameInput';
import EmailInput from './inputs/email/EmailInput';
import PasswordInput from './inputs/password/PasswordInput';
import ConfirmInput from './inputs/confirm/ConfirmInput';
import AgreementInput from './inputs/agreement/AgreementInput';
import CountryInput from './inputs/country/CountryInput';
import GenderInput from './inputs/gender/GenderInput';
import AvatarInput from './inputs/avatar/AvatarInput';

type FormType = z.infer<typeof FormSchema>;

interface ControlledFormProps {
  saveHandler: () => void;
}

function ControlledForm({ saveHandler }: ControlledFormProps) {
  const methods = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  const submitHandler: SubmitHandler<FormType> = (data) => {
    console.log(data);
    saveHandler();
  };

  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(submitHandler)} className={styles.form}>
        <h1>Controlled Form</h1>
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
        <button disabled={!isDirty || !isValid} type="submit">
          Save
        </button>
      </form>
    </FormProvider>
  );
}

export default ControlledForm;
