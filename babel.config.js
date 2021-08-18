module.exports = {
  presets: [
    [
      'next/babel',
      {
        'preset-env': {
          targets: {
            node: 'current',
          },
        },
      },
    ],
    [
      '@babel/preset-env',
      {
        useBuiltIns: 'entry',
        corejs: '2',
      },
    ],
  ],
  plugins: [
    '@babel/plugin-proposal-do-expressions',
    '@babel/plugin-transform-runtime',
  ],
}
