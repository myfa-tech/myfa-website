import { useIntl } from 'gatsby-plugin-intl';

const useTranslate = () => {
  const intl = useIntl();
  const locale = intl.locale;

  const translate = (key) => intl.formatMessage({ id: key });

  return [translate, locale];
};

export default useTranslate;
