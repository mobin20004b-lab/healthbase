module.exports = {
  apps: [
    {
      name: "topmedica",
      cwd: "/opt/healthbase",
      script: "bun",
      args: "start",
      interpreter: "none",
      env_file: "/opt/healthbase/.env",
      instances: 1,
      autorestart: true,
      max_restarts: 10,
      restart_delay: 1000,
      merge_logs: true,
      time: true,
    },
  ],
};
