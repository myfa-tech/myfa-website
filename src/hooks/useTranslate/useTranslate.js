import { useTranslation } from 'react-i18next';

const useTranslate = () => {
  const { t, i18n } = useTranslation('common');
  const locale = i18n.language || window.localStorage.i18nextLng;

  const translate = (key) => {
    try {
      return t(key);
    } catch(e) {
      console.log(e);
      return key;
    }
  };

  return [translate, locale];
};

export default useTranslate;
