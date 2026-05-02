import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { Spinner } from "react-bootstrap";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserService from "../../services/UserService";
import styles from "./userDetail.module.css";

function getRoleClass(role) {
  if (role === "admin") return styles.roleAdmin;
  if (role === "moderator") return styles.roleModerator;
  return styles.roleUser;
}

async function GetDatas(id, setData, setLoading) {
  try {
    const user = await UserService.getUserById(id);
    setData(user);
  } catch (err) {
    toast.error("Xəta: " + err.message);
  } finally {
    setLoading(false);
  }
}

function UserDetail() {
  const { id } = useParams();
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    GetDatas(id, setData, setLoading);
  }, [id]);

  if (loading) {
    return (
      <div className={styles.loadingBox}>
        <Spinner animation="border" variant="primary" />
        <p className={styles.loadingText}>Yüklənir...</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className={styles.loadingBox}>
        <p>İstifadəçi tapılmadı.</p>
        <Link to="/" className={styles.backLink}>← Geri qayıt</Link>
      </div>
    );
  }

  return (
    <div className={styles.wrapper}>
      <ToastContainer position="top-right" autoClose={3000} />
      <Link to="/" className={styles.backLink}>← Geri qayıt</Link>

      <div className={styles.card}>
        <img
          src={data.image}
          alt={`${data.firstName} ${data.lastName}`}
          className={styles.avatar}
        />
        <h2 className={styles.name}>
          {data.firstName} {data.lastName}
        </h2>
        <p className={`${styles.role} ${getRoleClass(data.role)}`}>
          {data.role}
        </p>

        <div className={styles.grid}>
          <div className={styles.field}>
            <span className={styles.label}>Email</span>
            <span>{data.email}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Telefon</span>
            <span>{data.phone}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Yaş</span>
            <span>{data.age}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Doğum tarixi</span>
            <span>{data.birthDate}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Cins</span>
            <span>{data.gender}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Qan qrupu</span>
            <span>{data.bloodGroup}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Boy / Çəki</span>
            <span>{data.height} sm / {data.weight} kq</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Universitet</span>
            <span>{data.university}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Şöbə</span>
            <span>{data.company?.department}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Şirkət</span>
            <span>{data.company?.name}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Ünvan</span>
            <span>
              {data.address?.address}, {data.address?.city},{" "}
              {data.address?.country}
            </span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Kart nömrəsi</span>
            <span>{data.bank?.cardNumber}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>Kart növü</span>
            <span>{data.bank?.cardType}</span>
          </div>
          <div className={styles.field}>
            <span className={styles.label}>İstifadəçi adı</span>
            <span>{data.username}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserDetail;
