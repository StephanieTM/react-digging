module.exports = (api) => {
  const isProd = api.env('production');

  const presets = [
    ['@babel/preset-env', { modules: false, useBuiltIns: 'usage', corejs: '3.9' }],
    '@babel/preset-react',
    '@babel/preset-typescript',
  ];

  const plugins = [
    ['import', { libraryName: 'antd', style: true }, 'antd'],
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-runtime',
    '@babel/plugin-proposal-class-properties',
    isProd ? null : 'react-hot-loader/babel'
  ].filter(Boolean);

  return {
    presets,
    plugins,
    env: {
      test: {
        presets: [
          ['@babel/preset-env', { modules: 'commonjs' }]
        ],
        plugins: ['@babel/plugin-transform-modules-commonjs'],
      },
    },
  };
};
