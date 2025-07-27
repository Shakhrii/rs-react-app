import photo from '../../assets/images/photo.jpeg';

export function About() {
  const link = 'https://rs.school/courses/reactjs';

  return (
    <div className="flex items-center justify-center gap-10 py-10">
      <div className="flex items-center justify-end flex-1/2">
        <img
          className="rounded-full w-100 h-100 object-cover"
          src={photo}
          alt="author photo"
        />
      </div>
      <div className="flex flex-col gap-5 flex-1/2">
        <h1 className="text-xl self-start">Hello! I am Shakhri</h1>
        <p className="text-sm w-100 text-neutral-500 wrap-break-word">
          I graduated from DSU with a degree in System Programming. Long ago, I
          worked as an Android mobile developer, followed by a long break from
          coding—but now I’m back! This time, I’ve fallen in love with web
          development. I’ve completed RS School’s curriculum (Stage 0, Stage 1,
          and Stage 2) and am excited to dive into React. Wishing all of us
          great success in this course!
        </p>
        <a href={link} target="blank" className="self-start mt-5">
          <div className="bg-amber-300 text-neutral-800 text-2xl inline p-2 rounded-sm hover:bg-amber-200 active:bg-amber-400">
            <span>RS School React Course</span>
          </div>
        </a>
      </div>
    </div>
  );
}
