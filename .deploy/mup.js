module.exports = {
  servers: {
    dyndoq: {
      // TODO: set host address, username, and authentication method
      host: '54.236.27.246',
      username: 'ubuntu',
      pem: '/Users/yamadamasaki/.ssh/kcedevkey.pem'
      // password: 'server-password'
      // or neither for authenticate from ssh-agent
    }
  },

  meteor: {
    // TODO: change app name and path
    name: 'dyndoq',
    path: '../../dyndoq',

    servers: {
      dyndoq: {},
    },

    buildOptions: {
      serverOnly: true,
    },

    env: {
      // TODO: Change to your app's url
      // If you are using ssl, it needs to start with https://
      ROOT_URL: 'http://54.236.27.246/',
      //MONGO_URL: 'mongodb://localhost/meteor',
      MONGO_URL: "mongodb://yamadamasaki:DkZ968dnYRBc9y95@cluster0-shard-00-00-hb9rw.mongodb.net:27017,cluster0-shard-00-01-hb9rw.mongodb.net:27017,cluster0-shard-00-02-hb9rw.mongodb.net:27017/documents?ssl=true&replicaSet=Cluster0-shard-0&authSource=admin",
    },

    docker: {
      // change to 'kadirahq/meteord' if your app is not using Meteor 1.4
      image: 'guillim/meteord:node6.9.1V3',
      // imagePort: 80, // (default: 80, some images EXPOSE different ports)
    },

    // This is the maximum time in seconds it will wait
    // for your app to start
    // Add 30 seconds if the server has 512mb of ram
    // And 30 more if you have binary npm dependencies.
    deployCheckWaitTime: 60,

    // Show progress bar while uploading bundle to server
    // You might need to disable it on CI servers
    enableUploadProgressBar: false
  },

  mongo: {
    port: 27017,
    version: '3.4.1',
    servers: {
      dyndoq: {}
    }
  }
};
