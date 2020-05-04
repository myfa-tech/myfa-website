import { useIntl } from 'gatsby-plugin-intl';

const useTranslate = () => {
  const intl = useIntl();
  const locale = intl.locale;

  const translate = (key) => {
    try {
      return intl.formatMessage({ id: key });
    } catch(e) {
      console.log(e);
      return key;
    }
  };

  return [translate, locale];
};

export default useTranslate;
