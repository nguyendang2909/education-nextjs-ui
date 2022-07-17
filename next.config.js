// const {
//   PHASE_DEVELOPMENT_SERVER,
//   PHASE_PRODUCTION_BUILD,
// } = require('next/constants');

const path = require('path');

module.exports = phase => {
  // // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  // const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // // when `next build` or `npm run build` is used
  // const isProd =
  //   phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== '1';
  // // when `next build` or `npm run build` is used
  // const isStaging =
  //   phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === '1';

  // if (isDev) {
  //   process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
  // }

  // const env = {
  //   FACEBOOK_APP_ID: '502296178086513',
  //   API_URL: (() => {
  //     // if (isDev) return 'https://localhost:4000';
  //     // if (isProd) return 'https://lesleiapi.mttn.vn';
  //     // if (isStaging) return 'https://localhost:4000';
  //   })(),
  //   LOCAL_API_URL: (() => {
  //     // if (isDev) return 'https://localhost:4000';
  //     // if (isProd) return 'http://localhost:4000';
  //     // if (isStaging) return 'http://localhost:4000';
  //   })(),
  // };

  return {
    devIndicators: {
      buildActivityPosition: 'bottom-right',
    },
    i18n: {
      locales: ['vi'],
      defaultLocale: 'vi',
    },
    sassOptions: {
      includePaths: [path.join(__dirname, 'styles')],
    },
    // typescript: {},
    // env,
    // compress: false,
    // async rewrites() {
    //   return [
    //     {
    //       source: '/api/:path*',
    //       destination: 'https://localhost:4000/:path*', // Proxy to Backend
    //     },
    //   ];
    // },
  };
};
