module.exports = function (api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      'expo-router/babel',
      [
        'module-resolver',
        {
          root: ['.'],
          alias: {
            '@': '.',
            '@/lib': './lib',
            '@/components': './components',
            '@/hooks': './hooks',
            '@/constants': './constants'
          }
        }
      ]
    ]
  };
}; 