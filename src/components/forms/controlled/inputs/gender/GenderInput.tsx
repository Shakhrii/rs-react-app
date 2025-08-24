import { useFormContext } from 'react-hook-form';
import ErrorMessage from '../../../error/ErrorMessage';

function GenderInput() {
  const {
    register,
    formState: { errors },
  } = useFormContext();
  return (
    <fieldset>
      <legend>Gender</legend>
      <div>
        <input {...register('gender')} type="radio" id="male" value="male" />
        <label htmlFor="male">Male</label>
      </div>
      <div>
        <input
          {...register('gender')}
          type="radio"
          id="female"
          value="female"
        />
        <label htmlFor="female">Female</label>
      </div>
      {errors.gender && (
        <ErrorMessage message={errors.gender.message as string} />
      )}
    </fieldset>
  );
}

export default GenderInput;
