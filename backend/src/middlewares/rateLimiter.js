import { RateLimiterMemory } from "rate-limiter-flexible";

const ipLimiter = new RateLimiterMemory({
  points: 5,
  duration: 60,
});

const emailLimiter = new RateLimiterMemory({
  points: 3,
  duration: 60,
});

const rateLimit = async (req, res, next) => {
  try {
    await ipLimiter.consume(req.ip);

    if (req.body.email) {
      await emailLimiter.consume(req.body.email);
    }

    next();
  } catch {
    return res.status(429).json({ message: "Too many requests" });
  }
};

export default rateLimit;