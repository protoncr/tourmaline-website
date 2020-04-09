import React from 'react';
import classnames from 'classnames';
import Layout from '@theme/Layout';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import useBaseUrl from '@docusaurus/useBaseUrl';
import styles from './styles.module.css';

const features = [
  {
    title: <>Fast</>,
    imageUrl: 'img/undraw_speed_test.svg',
    description: (
      <>
        Tourmaline was built using Crystal, a fast, statically typed language
        with speed near that of C, but with a much nicer syntax.
      </>
    ),
  },
  {
    title: <>Powerful</>,
    imageUrl: 'img/undraw_super_woman.svg',
    description: (
      <>
        Tourmaline encompasses the full Telegram bot API, and provides several abstractions
        that make creating bots easy.
      </>
    ),
  },
  {
    title: <>Open Source</>,
    imageUrl: 'img/undraw_open_source.svg',
    description: (
      <>
        The Tourmaline source code is hosted on Github, licensed using the MIT license, and
        is freely available for you to view, modify, and use in your own projects.
      </>
    ),
  },
];

function Feature({imageUrl, title, description}) {
  const imgUrl = useBaseUrl(imageUrl);
  return (
    <div className={classnames('col col--4', styles.feature)}>
      {imgUrl && (
        <div className="text--center">
          <img className={styles.featureImage} src={imgUrl} alt={title} />
        </div>
      )}
      <h3>{title}</h3>
      <p>{description}</p>
    </div>
  );
}

function Home() {
  const context = useDocusaurusContext();
  const {siteConfig = {}} = context;
  return (
    <Layout
      title={`Home`}
      description="Tourmaline is a Telegram bot API framework built with the Crystal programming language">
      <header className={classnames('hero', styles.heroBanner, styles.heroDark)}>
        <div className="container">
          <h1 className="hero__title">{siteConfig.title}</h1>
          <p className="hero__subtitle">{siteConfig.tagline}</p>
          <div className={styles.buttons}>
            <Link
              className={classnames(
                'button button--secondary button--lg',
                styles.getStarted,
              )}
              to={useBaseUrl('docs/cookbook/your-first-bot')}>
              Get Started
            </Link>
          </div>
        </div>
      </header>
      <main>
        {features && features.length && (
          <section className={styles.features}>
            <div className="container">
              <div className="row">
                {features.map((props, idx) => (
                  <Feature key={idx} {...props} />
                ))}
              </div>
            </div>
          </section>
        )}
      </main>
    </Layout>
  );
}

export default Home;
