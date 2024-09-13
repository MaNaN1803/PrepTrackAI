/** @type { import("drizzle-kit").Config } */
export default {
    schema: "./utils/schema.js",
    dialect: 'postgresql',
    dbCredentials: {
      url: "postgresql://preptrackaidb_owner:OkQ6Lswn4BYD@ep-long-moon-a11i2mpf.ap-southeast-1.aws.neon.tech/preptrackaidb?sslmode=require",
    }
  };