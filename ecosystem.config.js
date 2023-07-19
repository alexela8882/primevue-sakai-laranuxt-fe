module.exports = {
  apps: [
    {
      name: 'New Escophotos',
      exec_mode: 'cluster',
      instances: '1', // Or a number of instances
      script: './.output/server/index.mjs',
      args: 'start',
      port: 3000
    }
  ]
}