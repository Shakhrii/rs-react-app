import { useRef } from 'react';
import styles from '../../../Avatar.module.css';

function AvatarInput() {
  const avatarRef = useRef<HTMLImageElement>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const handleUploadPhoto = () => {
    if (fileRef.current && fileRef.current.files && fileRef.current.files[0]) {
      const file = fileRef.current.files[0];
      const objectUrl = URL.createObjectURL(file);

      if (avatarRef.current && avatarRef.current.src) {
        avatarRef.current.src = objectUrl;
      }
    }
  };
  return (
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
  );
}

export default AvatarInput;
