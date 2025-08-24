import { FormProvider, useForm, type SubmitHandler } from 'react-hook-form';
import styles from '../Form.module.css';
import { zodResolver } from '@hookform/resolvers/zod';
import { FormSchema, type FormDataItem } from '../../../types/types';
import { z } from 'zod';
import NameInput from './inputs/name/NameInput';
import EmailInput from './inputs/email/EmailInput';
import PasswordInput from './inputs/password/PasswordInput';
import ConfirmInput from './inputs/confirm/ConfirmInput';
import AgreementInput from './inputs/agreement/AgreementInput';
import CountryInput from './inputs/country/CountryInput';
import GenderInput from './inputs/gender/GenderInput';
import AvatarInput from './inputs/avatar/AvatarInput';
import { useAppDispatch } from '../../../store/store';
import { add } from '../../../store/slices/formDataItems.slice';
import { convertFileToBase64 } from '../../../utils/base64';

type FormType = z.infer<typeof FormSchema>;

interface ControlledFormProps {
  saveHandler: () => void;
}

function ControlledForm({ saveHandler }: ControlledFormProps) {
  const dispatch = useAppDispatch();

  const addFormDataItem = (item: FormDataItem) => {
    dispatch(add(item));
  };
  const methods = useForm<FormType>({
    resolver: zodResolver(FormSchema),
    mode: 'onChange',
  });

  const {
    handleSubmit,
    formState: { isDirty, isValid },
  } = methods;

  const submitHandler: SubmitHandler<FormType> = async (data) => {
    console.log(data);

    saveHandler();
    const convertData = { ...data } as unknown as FormDataItem;
    await convertFileToBase64(data.avatar as File).then(
      (base64) => (convertData.avatar = base64)
    );
    addFormDataItem(convertData);
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
