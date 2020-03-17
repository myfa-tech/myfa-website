import { useIntl } from 'gatsby-plugin-intl';

const useTranslate = () => {
  const intl = useIntl();

  const translate = (key) => intl.formatMessage({ id: key });

  return [translate];
};

export default useTranslate;
