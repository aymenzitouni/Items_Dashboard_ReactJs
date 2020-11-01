//import * as Sentry from "@sentry/browser";

function init() {
  // Sentry.init({
  //   dsn: "https://9666f9f834304f6686413f6737f901da@sentry.io/1531397"
  // });
}

function log(error) {
  console.error(error);
  //Sentry.captureException(error);
}

export default {
  init,
  log
};
