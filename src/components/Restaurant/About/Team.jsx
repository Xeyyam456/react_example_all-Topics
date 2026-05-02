import styles from "./about.module.css";

const MEMBERS = [
  { name: "Əli Həsənov", role: "Baş Aşpaz", avatar: "👨‍🍳" },
  { name: "Leyla Məmmədova", role: "Pastri Şef", avatar: "👩‍🍳" },
  { name: "Rauf İsmayılov", role: "Restoran Meneceri", avatar: "🧑" },
  { name: "Nigar Quliyeva", role: "Servis Meneceri", avatar: "👩‍💼" },
];

function Team() {
  return (
    <div>
      <h2 className={styles.subTitle}>Komandamız</h2>
      <div className={styles.teamGrid}>
        {MEMBERS.map((member) => (
          <div key={member.name} className={styles.memberCard}>
            <div className={styles.memberAvatar}>{member.avatar}</div>
            <p className={styles.memberName}>{member.name}</p>
            <p className={styles.memberRole}>{member.role}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Team;
