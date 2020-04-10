import React, {useEffect} from 'react';

import Image from '@theme/IdealImage';
import Layout from '@theme/Layout';

import classnames from 'classnames';
import styles from './styles.module.css';
import users from '../../data/users';

const TITLE = 'Showcase';
const DESCRIPTION =
  'See the awesome bots people are building with Tourmaline';

function Showcase() {
  return (
    <Layout title={TITLE} description={DESCRIPTION}>
      <div className="container margin-vert--lg">
        <div className="text--center margin-bottom--xl">
          <h1>{TITLE}</h1>
          <p>{DESCRIPTION}</p>
        </div>
        <div className="row">
          {users.map((user) => (
            <div key={user.title} className="col col--4 margin-bottom--lg">
              <div className={classnames('card', styles.showcaseUser)}>
                <div className="card__image">
                  <Image img={user.preview} alt={user.title} />
                </div>
                <div className="card__body">
                  <div className="avatar">
                    <div className="avatar__intro margin-left--none">
                      <h4 className="avatar__name">{user.title}</h4>
                      <small className="avatar__subtitle">
                        {user.description}
                      </small>
                    </div>
                  </div>
                </div>
                {(user.link || user.source) && (
                  <div className="card__footer">
                    <div className="button-group button-group--block">
                      {user.link && (
                        <a
                          className="button button--small button--secondary button--block"
                          href={user.link}
                          target="_blank"
                          rel="noreferrer noopener">
                          Link
                        </a>
                      )}
                      {user.source && (
                        <a
                          className="button button--small button--secondary button--block"
                          href={user.source}
                          target="_blank"
                          rel="noreferrer noopener">
                          Source
                        </a>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </Layout>
  );
}

export default Showcase;
