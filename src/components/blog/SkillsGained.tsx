type Props = {
  skills: string[];
};

export default function SkillsGained({skills}: Props) {
  return (
    <div className="blogSection blogSection--skills">
      <div className="blogSection__title">Skills desenvolvidas</div>
      <ul className="skillsGained__list">
        {skills.map((s) => (
          <li key={s}>✓ {s}</li>
        ))}
      </ul>
    </div>
  );
}
