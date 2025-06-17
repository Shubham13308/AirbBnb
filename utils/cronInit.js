import cron from "node-cron"
import { expireOldBookings } from "@/app/cron/expireBookings"

export function startCronJobs() {
  cron.schedule("* * * * *", async () => {
    console.log("Running cron to expire bookings...");
    await expireOldBookings();
  });
}