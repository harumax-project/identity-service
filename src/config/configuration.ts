export default () => ({
  port: parseInt(process.env.PORT) || 3000,
  gcloudProject: process.env.GCLOUD_PROJECT,
})
