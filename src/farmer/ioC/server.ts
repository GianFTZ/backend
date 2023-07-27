import { prisma } from "../../lib/common/prisma";
import { setupApp } from "./config/app";

export const main = async () => {
  const app = await setupApp()
  app.listen(process.env.PORT || 4040, () => {
    console.log(`server is ready on port ${process.env.PORT || 4040}`)
  })
  process.on('SIGTERM', () => {
    console.error('SIGTERM signal received.');
    console.warn('Closing http server.');
    app.on("", (async () => {
      console.warn('Http server closed.');
      await prisma.$disconnect()
      console.warn("Prisma has disconnected from db")
      process.exit(0)
    }))
  });
}

main()