const { defineConfig } = require('@meteorjs/rspack');
const { TsCheckerRspackPlugin } = require('ts-checker-rspack-plugin');
const { RsdoctorRspackPlugin } = require('@rsdoctor/rspack-plugin');

/**
 * Rspack configuration for Meteor projects.
 *
 * Provides typed flags on the `Meteor` object, such as:
 * - `Meteor.isClient` / `Meteor.isServer`
 * - `Meteor.isDevelopment` / `Meteor.isProduction`
 * - …and other flags available
 *
 * Use these flags to adjust your build settings based on environment.
 */
module.exports = defineConfig(Meteor => {
  const plugins = [];

  if (Meteor.isProduction) {
    plugins.push(new TsCheckerRspackPlugin());
  }

  // Bundle analyzer: ejecutar con ANALYZE=true meteor build ...
  if (process.env.ANALYZE === 'true') {
    plugins.push(
      new RsdoctorRspackPlugin({
        // Genera reporte interactivo en el navegador
        supports: {
          generateTileGraph: true,
        },
      })
    );
  }

  return {
    plugins,

    // Configuración de módulos
    module: {
      rules: [
        {
          test: /\.(png|jpe?g|gif|svg|webp|ico)$/i,
          type: 'asset',
          parser: {
            dataUrlCondition: {
              maxSize: 8 * 1024, // 8kb
            },
          },
        },
      ],
    },

    // Cache para compilaciones más rápidas
    cache: true,

    // Optimizar solo en producción
    optimization: {
      minimize: Meteor.isProduction,
      ...(Meteor.isDevelopment && {
        removeAvailableModules: false,
        removeEmptyChunks: false,
        splitChunks: false,
      }),
    },
  };
});
