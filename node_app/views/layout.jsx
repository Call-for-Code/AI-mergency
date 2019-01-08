import React from 'react';
import PropTypes from 'prop-types';

export default function Layout({ children }) {
  return (
    <html lang="en">
      <head>
        <title>
          AImergency Control Room
        </title>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/images/siren.png" type="image/png" />
        <link rel="stylesheet" href="/fonts/ibm-plex/css/ibm-plex.min.css" />
        <link rel="stylesheet" href="/css/primereact/resources/themes/omega/theme.css" />
        <link rel="stylesheet" href="/css/primereact/resources/primereact.min.css" />
        <link rel="stylesheet" href="/css/primeicons/primeicons.css" />
        <link rel="stylesheet" href="/css/primeicons/primeicons.css" />
        <link rel="stylesheet" href="/css/casa_styles.css" />
        <link rel="stylesheet" type="text/css" charSet="UTF-8" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick.min.css" />
        <link rel="stylesheet" type="text/css" href="https://cdnjs.cloudflare.com/ajax/libs/slick-carousel/1.6.0/slick-theme.min.css" />
        <script type="text/javascript" src="/scripts/CognosApi.js" />
      </head>
      <body>

        <div id="root">
          {children}
        </div>

        <script type="text/javascript" src="scripts/bundle.js" />
      </body>
    </html>
  );
}

Layout.propTypes = {
  children: PropTypes.element.isRequired,
};
