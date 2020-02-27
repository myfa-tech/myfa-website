import { confirmEmail } from '../services/users';


const confirmEmailPage = () => {
  if (typeof window !== 'undefined') {
    let infos = window.location.search.split('&');

    if (!infos || !infos.length || infos.length !== 2) {
      window.location.assign('/404');
      return;
    }

    let email = infos[0].substr(1);
    let hash = infos[1];

    confirmEmail(email, hash);
  }

  return null;
};

export default confirmEmailPage;
