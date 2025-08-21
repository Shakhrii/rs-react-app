import { getCounrtiesByQuery } from '../../../data/utils';
import CompletedList from '../../completed-list/CompletedList';
import styles from './Uncontrolled.module.css';
import { useRef, useState } from 'react';

interface UncontrolledFormProps {
  saveHandler: () => void;
}

function UncontrolledForm({ saveHandler }: UncontrolledFormProps) {
  const nameRef = useRef<HTMLInputElement>(null);
  const emailRef = useRef<HTMLInputElement>(null);
  const passwordRef = useRef<HTMLInputElement>(null);
  const confirmPasswordRef = useRef<HTMLInputElement>(null);
  const avatarRef = useRef<HTMLImageElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const countryRef = useRef<HTMLInputElement>(null);

  const [completedList, setCompletedList] = useState<string[]>([]);
  const [isShowCompletedList, setShowCompletedList] = useState(false);

  const handleSubmit = (formData: FormData) => {
    const values = formData.entries();
    for (const [key, value] of values) {
      console.log(`${key}:`, value);
    }

    saveHandler();
  };

  const handleUploadPhoto = () => {
    if (fileRef.current && fileRef.current.files && fileRef.current.files[0]) {
      const file = fileRef.current.files[0];
      const objectUrl = URL.createObjectURL(file);

      if (avatarRef.current && avatarRef.current.src) {
        avatarRef.current.src = objectUrl;
      }
    }
  };

  const handleCountryChange = () => {
    const country = countryRef.current?.value;
    if (country && country != '') {
      const completedCountries = getCounrtiesByQuery(country);
      setCompletedList(completedCountries);
      setShowCompletedList(true);
    }
  };

  const handleClickCompletedListItem = (country: string) => {
    if (countryRef.current) {
      countryRef.current.value = country;
      setShowCompletedList(false);
    }
  };

  return (
    <form action={handleSubmit} className={styles.form}>
      <div className={styles.content}>
        <div className={styles.section}>
          <div className={styles.item}>
            <label htmlFor="name">Name</label>
            <input
              type="text"
              name="name"
              id="name"
              placeholder="Your name"
              ref={nameRef}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="email">Email</label>
            <input
              type="text"
              name="email"
              id="email"
              placeholder="your@email.com"
              ref={emailRef}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="password">Password</label>
            <input
              type="text"
              name="password"
              id="password"
              placeholder="Your password"
              ref={passwordRef}
            />
          </div>
          <div className={styles.item}>
            <label htmlFor="confirm">Confirm password</label>
            <input
              type="text"
              name="confirm"
              id="confirm"
              placeholder="Your password"
              ref={confirmPasswordRef}
            />
          </div>
        </div>
        <div className={styles.section}>
          <div className={styles.country}>
            <label htmlFor="country">Country</label>
            <input
              type="text"
              name="country"
              id="country"
              placeholder="Russia"
              ref={countryRef}
              onChange={() => handleCountryChange()}
            />
            {isShowCompletedList && completedList.length > 0 && (
              <CompletedList
                countries={completedList}
                handleClick={handleClickCompletedListItem}
              />
            )}
          </div>
          <div>
            <fieldset>
              <legend>Gender</legend>
              <div>
                <input type="radio" id="male" name="gender" value="male" />
                <label htmlFor="male">Male</label>
              </div>
              <div>
                <input type="radio" id="female" name="gender" value="female" />
                <label htmlFor="female">Female</label>
              </div>
            </fieldset>
          </div>
          <div className={styles.file}>
            <img src="user.png" alt="avatar" ref={avatarRef} />
            <label htmlFor="avatar">Upload photo</label>
            <input
              type="file"
              name="avatar"
              id="avatar"
              accept="image/jpeg, image/png"
              ref={fileRef}
              onChange={() => handleUploadPhoto()}
            />
          </div>
          <div>
            <input type="checkbox" name="agreement" id="agreement" />
            <label htmlFor="agreement">I agree with Terms and Conditions</label>
          </div>
        </div>
      </div>
      <button type="submit">Save</button>
    </form>
  );
}

export default UncontrolledForm;
