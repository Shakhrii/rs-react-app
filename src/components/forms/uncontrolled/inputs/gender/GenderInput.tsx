function GenderInput() {
  return (
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
  );
}

export default GenderInput;
