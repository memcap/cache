const { series, parallel, src, dest, watch } = require('gulp');
const axios = require('axios').default;
const del = require('del');
const fs = require('fs');

function clean() {
  return del('/dist');
}

function fetchSchedule( /*cb*/ ) {
  return axios.post('https://the-practice.space/getSchedule/', {}).then((response) => {
    fs.writeFileSync('./dist/schedule.json', JSON.stringify(response.data, null, 2));
  });
}

function getPrices( /*cb*/ ) {
  return axios.post('https://the-practice.space/stripeGetPrices', {"pk":"pk_live_jXvD1q3hkunFnVNQzCVDqeq9"}).then((response) => {
    fs.writeFileSync('./dist/prices.json', JSON.stringify(response.data, null, 2));
  });
}

exports.default = series(clean, fetchSchedule, getPrices);
