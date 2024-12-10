module.exports = {
  apps : [{
     name: 'frontend-blue',
      script: 'index.js',
      autorestart: true, 
      watch: false,
      cwd: '/home/ubuntu/frontend-blue/2-hyun-lee-community-fe',
      env: {
        NODE_ENV: 'production',
        PORT: 8000,
      }}],

  deploy : {
    production : {
      user : 'SSH_USERNAME',
      host : 'SSH_HOSTMACHINE',
      ref  : 'origin/master',
      repo : 'GIT_REPOSITORY',
      path : 'DESTINATION_PATH',
      'pre-deploy-local': '',
      'post-deploy' : 'npm install && pm2 reload ecosystem.config.js --env production',
      'pre-setup': ''
    }
  }
};