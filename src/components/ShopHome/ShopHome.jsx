import {useState, useEffect} from 'react';
import {useNavigate, useParams, Link} from 'react-router-dom';
import useShopProducts from './hooks/useShopProducts';
import styles from './shopHome.module.css';
import ChipsPage from './Chips/ChipsPage';
import Button from '../Button/Button';
import {
  FEATURED,
  LEFT_MENU,
  ABOUT_COMPANY_TEXT,
  ABOUT_US_TEXT,
  BLOG_TEXT,
  AUTHORS_TEXT,
  PARTNERS_TEXT,
  SARDINES_TEXT,
} from './shopContent';

function ShopHome() {
  const navigate = useNavigate();
  const {section} = useParams();

  const { productList, loading, checked, setChecked, load } = useShopProducts();

  const [blogSub, setBlogSub]   = useState(null);
  const [aboutSub, setAboutSub] = useState(null);

  useEffect(() => {
    setBlogSub(null);
    setAboutSub(null);
 }, [section]);



  if (section === 'chips') {
    return <ChipsPage onBack={() => navigate('/shop')} />;
  }

  if (section === 'soda') {
    return (
      <div className={styles.sodaPage}>
        <div className={styles.sodaContent}>
          <h1 className={styles.sodaTitle}>Coca-Cola</h1>
          <Button variant="secondary" onClick={() => navigate('/shop')}>Go Home</Button>
        </div>
      </div>
    );
 }

  if (section === 'sardines') {
    return (
      <div className={styles.sardinesPage}>
        <div className={styles.sardinesBox}>
          <h1 className={styles.sardinesTitle}>Fresh Sardines</h1>
          <div className={styles.sardinesInfo}>
            <p className={styles.sardinesText}>{SARDINES_TEXT}</p>
          </div>
          <Button variant="secondary" onClick={() => navigate('/shop')}>Go Home</Button>
        </div>
      </div>
    );
  }

  if (section === undefined || section === null) {
    return (
      <div className={styles.heroPage}>
        <div className={styles.heroContent}>
          <div className={styles.heroBox}>
            {LEFT_MENU.map(({key, label}) => (
              <Button key={key} variant="ghost" onClick={() => navigate('/shop/' + key)}>
                {label}
              </Button>
            ))}
          </div>
          <div className={styles.heroBox}>
            {FEATURED.map((name) => {
              const featuredPath =
                name === 'Soda' ? '/shop/soda' :
                name === 'Chips' ? '/shop/chips' :
                name === 'Fresh Sardines' ? '/shop/sardines' : null;
              return (
                <p
                  key={name}
                  className={styles.heroFeaturedItem}
                  onClick={featuredPath ? () => navigate(featuredPath) : undefined}
                  style={featuredPath ? {cursor: 'pointer'} : {}}
                >{name}</p>
              );
           })}
          </div>
        </div>
      </div>
    );
 }

  if (section === 'about') {
    return (
      <div className={styles.blogPage}>
        <h1 className={styles.blogTitle}>About</h1>
        <nav className={styles.blogNav}>
          <Button variant={aboutSub === 'company' ? 'primary' : 'ghost'} onClick={() => setAboutSub(aboutSub === 'company' ? null : 'company')}>About Company</Button>
          <Button variant={aboutSub === 'us' ? 'primary' : 'ghost'} onClick={() => setAboutSub(aboutSub === 'us' ? null : 'us')}>About Us</Button>
          <Button variant="secondary" onClick={() => navigate('/shop')}>Go Back</Button>
        </nav>
        <div className={styles.blogBody}>
          <p className={styles.blogText}>{BLOG_TEXT}</p>
          {aboutSub === 'company' && (
            <div className={styles.blogSubSection}>
              <h2 className={styles.blogSubTitle}>About Company</h2>
              <p className={styles.blogText}>{ABOUT_COMPANY_TEXT}</p>
            </div>
          )}
          {aboutSub === 'us' && (
            <div className={styles.blogSubSection}>
              <h2 className={styles.blogSubTitle}>About Us</h2>
              <p className={styles.blogText}>{ABOUT_US_TEXT}</p>
            </div>
          )}
        </div>
      </div>
    );
 }

  if (section === 'blog') {
    return (
      <div className={styles.blogPage}>
        <h1 className={styles.blogTitle}>Blog Page</h1>
        <nav className={styles.blogNav}>
          <Button variant={blogSub === 'authors' ? 'primary' : 'ghost'} onClick={() => setBlogSub(blogSub === 'authors' ? null : 'authors')}>Authors</Button>
          <Button variant={blogSub === 'partners' ? 'primary' : 'ghost'} onClick={() => setBlogSub(blogSub === 'partners' ? null : 'partners')}>Partners</Button>
          <Button variant="secondary" onClick={() => navigate('/shop')}>Go Back</Button>
        </nav>
        <div className={styles.blogBody}>
          <p className={styles.blogText}>{BLOG_TEXT}</p>
          {blogSub === 'authors' && (
            <div className={styles.blogSubSection}>
              <h2 className={styles.blogSubTitle}>Authors</h2>
              <p className={styles.blogText}>{AUTHORS_TEXT}</p>
            </div>
          )}
          {blogSub === 'partners' && (
            <div className={styles.blogSubSection}>
              <h2 className={styles.blogSubTitle}>Partners</h2>
              <p className={styles.blogText}>{PARTNERS_TEXT}</p>
            </div>
          )}
        </div>
      </div>
    );
 }

  if (section === 'products' && checked === false) {
    return (
      <div className={styles.productsHero}>
        <div className={styles.productsBtnGroup}>
          <Button variant="secondary" onClick={() => navigate('/shop')}>Go Back</Button>
          <Button variant="primary" onClick={load} disabled={loading}>
            {loading ? 'Loading...' : 'Check Products'}
          </Button>
        </div>
      </div>
    );
 }

  return (
    <div className={styles.innerPage}>
      <div className={styles.actionBar}>
        <div className={styles.actionCenter}>
          <Button variant="secondary" onClick={() => setChecked(false)}>Go Back</Button>
        </div>
      </div>
      <div className={styles.productGrid}>
        {productList.map((p) => (
          <div key={p.id} className={styles.productCard}>
            <img src={p.thumbnail} alt={p.title} className={styles.productImg} />
            <div className={styles.productBody}>
              <span className={styles.productCategory}>{p.category}</span>
              <h3 className={styles.productName}>{p.title}</h3>
              <p className={styles.productPrice}>${p.price}</p>
              <Link to={'/shop/products/detail/' + p.id} className={styles.detailBtn}>Go Detail</Link>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShopHome;
