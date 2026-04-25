import useFetchData from "../../hooks/useFetchData";
import useAddItem from "../../hooks/useAddItem";
import styles from "./recipesManager.module.css";

export default function RecipesManager() {
    const { data: users, loading: usersLoading } = useFetchData("users");
    const { data: photos, loading: photosLoading } = useFetchData("photos");

    const { localItems: localDatas, addItem: addUser } = useAddItem();
    const { localItems: localImgs, addItem: addImg } = useAddItem();

    const loading = usersLoading || photosLoading;

    const first5Users = users.slice(0, 5);
    // For each user at index i, pick the photo at the same index
    const first5Photos = photos.slice(0, 5);

    const isUserAdded = (user) => localDatas.some((u) => u.id === user.id);
    const isPhotoAdded = (photo) => localImgs.some((p) => p.id === photo.id);

    const handleGetPhoto = (index) => {
        const photo = first5Photos[index];
        if (photo) addImg(photo);
    };

    if (loading) {
        return (
            <div className={styles.wrapper}>
                <p className={styles.loading}>Loading...</p>
            </div>
        );
    }

    return (
        <div className={styles.wrapper}>
            <h2 className={styles.title}>Select User and Image</h2>

            {/* Users row */}
            <div className={styles.grid}>
                {first5Users.map((user) => (
                    <div key={user.id} className={styles.card}>
                        <p className={styles.name}>{user.name}</p>
                        <p className={styles.username}>User: {user.username}</p>
                        <button
                            className={isUserAdded(user) ? styles.addedBtn : styles.btn}
                            onClick={() => addUser(user)}
                        >
                            {isUserAdded(user) ? "Added" : "Get User"}
                        </button>
                    </div>
                ))}
            </div>

            {/* Photos row */}
            <div className={styles.grid}>
                {first5Photos.map((photo, index) => (
                    <div key={photo.id} className={styles.card}>
                        <img
                            src={photo.thumbnailUrl}
                            alt={photo.title}
                            className={styles.thumb}
                        />
                        <button
                            className={isPhotoAdded(photo) ? styles.addedBtn : styles.btn}
                            onClick={() => handleGetPhoto(index)}
                        >
                            {isPhotoAdded(photo) ? "Added" : "Get Photo"}
                        </button>
                    </div>
                ))}
            </div>

            {/* Selected items */}
            <div className={styles.selectedBox}>
                <div className={styles.selectedCol}>
                    <h3 className={styles.selectedTitle}>Selected User</h3>
                    {localDatas.map((user) => (
                        <p key={user.id} className={styles.selectedItem}>{user.name}</p>
                    ))}
                </div>
                <div className={styles.selectedCol}>
                    <h3 className={styles.selectedTitle}>Selected Image</h3>
                    {localImgs.map((photo) => (
                        <img
                            key={photo.id}
                            src={photo.thumbnailUrl}
                            alt={photo.title}
                            className={styles.selectedThumb}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
}
