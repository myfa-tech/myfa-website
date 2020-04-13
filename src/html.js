import React from "react"
import PropTypes from "prop-types"

export default function HTML(props) {
  return (
    <html {...props.htmlAttributes}>
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="x-ua-compatible" content="ie=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <script async src="https://www.googletagmanager.com/gtag/js?id=AW-704176659"></script>
        {props.headComponents}
      </head>
      <body {...props.bodyAttributes}>
        {props.preBodyComponents}
        <noscript key="noscript" id="gatsby-noscript">
          This app works best with JavaScript enabled.
        </noscript>
        <div
          key={`body`}
          id="___gatsby"
          dangerouslySetInnerHTML={{ __html: props.body }}
        />
        {props.postBodyComponents}
        <div id="root"></div>
        <div id="fb-root"></div>
        <script async dangerouslySetInnerHTML={{
          __html: `
            window.$crisp=[];
            window.CRISP_WEBSITE_ID="f2462632-645d-4f57-b1b7-f7e5ac9c96ae";
            d=document;
            s=d.createElement("script");
            s.src="https://client.crisp.chat/l.js";
            s.async=1;
            d.getElementsByTagName("head")[0].appendChild(s);
          `}}
        />
        <script async dangerouslySetInnerHTML={{
          __html: `
            window._mfq = window._mfq || [];
            (function() {
                var mf = document.createElement("script");
                mf.type = "text/javascript"; mf.defer = true;
                mf.src = "//cdn.mouseflow.com/projects/d242c0c3-eb37-4282-b375-448eeff6e728.js";
                document.getElementsByTagName("head")[0].appendChild(mf);
            })();
          `}}
        />
        <script  async dangerouslySetInnerHTML={{
          __html: `
            window.dataLayer = window.dataLayer || [];
            function gtag(){dataLayer.push(arguments);}
            gtag('js', new Date());
            gtag('config', 'AW-704176659');

            if (window.location.pathname.includes('/orders')) {
              gtag('event', 'conversion', { 'send_to': 'AW-704176659/cam8CMCnjM0BEJPE488C', 'transaction_id': '' });
            }
          `}}
        />
      </body>
    </html>
  )
}

HTML.propTypes = {
  htmlAttributes: PropTypes.object,
  headComponents: PropTypes.array,
  bodyAttributes: PropTypes.object,
  preBodyComponents: PropTypes.array,
  body: PropTypes.string,
  postBodyComponents: PropTypes.array,
}
