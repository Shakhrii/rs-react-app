import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../../../error/ErrorMessage';

function AgreementInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <div>
      <input {...register('agreement')} type="checkbox" id="agreement" />
      <label htmlFor="agreement">I agree with Terms and Conditions</label>
      {errors.agreement && (
        <ErrorMessage message={errors.agreement.message as string} />
      )}
    </div>
  );
}

export default AgreementInput;
