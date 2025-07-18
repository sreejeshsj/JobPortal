
import * as Sentry from "@sentry/node";

Sentry.init({
  dsn: "https://ae01e3614eb29dfc88eb4959d4f33ec6@o4509682253627392.ingest.us.sentry.io/4509682255396864",
  integrations: [
    Sentry.mongoIntegration() // KEEP this if you're using MongoDB integration
  ],
  //tracesSampleRate: 1.0,
  sendDefaultPii: true,
});
