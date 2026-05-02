import styles from "./about.module.css";

function AboutOverview() {
  return (
    <div>
      <h2 className={styles.subTitle}>Biz kimik?</h2>
      <p className={styles.text}>
        Bistro, 2010-cu ildən bəri müştərilərimizə ən yüksək keyfiyyətli kulinariya
        təcrübəsini təqdim etməkdədir. Hər yeməyimiz həvəs, keyfiyyətli inqrediyentlər
        və illər boyu toplanan peşəkarlıqla hazırlanır.
      </p>
      <p className={styles.text}>
        Məqsədimiz sadəcə yemək servis etmək deyil — hər ziyarəti unudulmaz bir xatirəyə
        çevirmək. Komandamız sizi həmişə gülümsəyərək qarşılayır.
      </p>
    </div>
  );
}

export default AboutOverview;
