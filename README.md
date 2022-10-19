## medusa-plugin-ip-lookup-maxmind

![Medusa Hackathon 2022](docs/hackathon-banner.jpeg)

## About

### Participants

#### Steven

- GitHub - @stnguyen90
- Twitter - @stnguyen90
- Discord - BalistarDrake#3823

### Description

Lookup a user's region using [MaxMind](https://www.maxmind.com/en/geoip2-services-and-databases).

### Preview

![Preview](/docs/preview.png)

## Set up this plugin

### Requirements

This plugin is made to work with MedusaJS. You can find the documentation [here](https://medusajs.com/docs/). Here's what you'll need to get started with this plugin:

- [Node.js](https://nodejs.org/en/)
- [Medusa Store](https://docs.medusajs.com/quickstart/quick-start/)

### Install Project

1. Install the plugin:

```bash
npm install medusa-plugin-ip-lookup-maxmind

# or

yarn add medusa-plugin-ip-lookup-maxmind
```

2. Obtain a IP geolocation database file from MaxMind. You can download a GeoLite2 Free Geolocation Data [here](https://dev.maxmind.com/geoip/geolite2-free-geolocation-data).

3. Add the plugin to your `medusa-config.js` file (inside the `plugins` array):

```js
  {
    resolve: `medusa-plugin-ip-lookup-maxmind`,
    options: {
      maxmind_db_path: "<PATH_TO_MAXMIND_DB_FILE>",
    },
  }
```
