import { useFormContext } from 'react-hook-form';

function AgreementInput() {
  const { register } = useFormContext();
  return (
    <div>
      <input {...register('agreement')} type="checkbox" id="agreement" />
      <label htmlFor="agreement">I agree with Terms and Conditions</label>
    </div>
  );
}

export default AgreementInput;
