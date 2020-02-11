
const getQueryParam = (param) => {
  if (typeof window !== 'undefined') {
    const url = window.location.search;
    const paramValueParts = url.split(`${param}=`);

    if (paramValueParts && paramValueParts[1]) {
      const paramValueSubParts = paramValueParts[1].split('&');

      if (paramValueSubParts && paramValueSubParts[0]) {
        return paramValueSubParts[0];
      }
    }
  }

  return '';
}

export default getQueryParam;
