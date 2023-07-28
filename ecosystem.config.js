module.exports = {
  apps: [
    {
      name: 'Reddot CRM V2',
      exec_mode: 'cluster',
      instances: '1', // Or a number of instances
      script: './.output/server/index.mjs',
      args: 'start',
      port: 3000
    }
  ]
}