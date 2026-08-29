import { User } from "../models/User.js";
import { Project } from "../models/Projects.js";
import { generateOtp, saveOtp, sendOtpEmail, verifyOtp } from "../utils/service.js";
import { signToken } from "../middlewares/auth.js";

//to send otp with email

// Issues and send.
async function issueAndSend(email, name, status, res, code = 201) {
  const otp = generateOtp();
  saveOtp(email, otp);
  const delivery = await sendOtpEmail({
    to: email,
    name,
    code: otp,
    purpose: status,
  });
  return res.status(code).json({
    ok: true,
    email,
    delivery: delivery.sent ? "email" : "console-fallback",
  });
}

// Supports register.
export async function register(req, res, next) {
  try {
    const name = (req.body?.name || "").trim();
    const email = (req.body?.email || "").trim().toLowerCase();
    const password = req.body?.password || "";

    if (!name || !email || !password) {
      return res.json({
        message: "All Fields are required",
      });
    }

    if (name.length < 2) {
      return res.json({
        message: "Name must be atleast of 2 characters",
      });
    }

    if (password.length < 6) {
      return res.json({
        message: "Password must be atleast of 6 characters",
      });
    }

    const existing = await User.findOne({ email });

    if (existing) {
      if (existing.emailVerified) {
        return res.json({
          error: "Email already in use",
        });
      }

      return issueAndSend(email, existing.name, "signup", res, 200);
    }

    const user = await User.create({
      name,
      email,
      passwordHash: await User.hashPassword(password),
      emailVerified: false,
    });

    return issueAndSend(user.email, user.name, "signup", res, 201);
  } catch (error) {
    next(error);
  }
}

//verify otp and email
export const verifyRegister = async (req, res, next) => {
  try {
    const email = (req.body?.email || "").trim().toLowerCase();
    const code = (req.body?.code || "").trim();

    if (!email || !code) {
      return res.json({
        error: "Email and code are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({
        error: "No Account Found with that email",
      });
    }
    if (user.emailVerified) {
      return res.json({
        ok: true,
        alreadyVerified: true,
      });
    }

    const result = verifyOtp(email, code);

    if (!result.ok)
      return res.json({
        error: result.reason,
      });

    user.emailVerified = true;
    await user.save();
    res.json({
      ok: true,
    });
  } catch (error) {
    next(error);
  }
};

//to resend the otp or if user registers but fotgots to verify
//we can reverify them
export async function resendRegister(req, res, next) {
  try {
    const email = (req.body?.email || "").trim().toLowerCase();
    if (!email) {
      return res.json({
        error: "Email is required",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        error: " No Account found with that email",
      });
    }

    if (user.emailVerified) {
      return res.json({
        error: "This email is already verified - just sign in",
      });
    }
    return issueAndSend(user.email, user.name, "signup", res, 200);
  } catch (error) {
    next(error);
  }
}

//login 
export async function Login(req, res, next) {
  try {
    const email = (req.body?.email || "").trim().toLowerCase();
    const password = req.body?.password || "";
    if (!email || !password) {
      return res.json({
        error: "Email and Password are Required",
      });
    }
    const user = await User.findOne({ email });

    if (!user) {
      return res.json({
        error: " Invalid credentials",
      });
    }
    const ok = await user.verifyPassword(password);
    if (!ok)
      return res.json({
        error: "Invalid credentials",
      });
    if (!user.emailVerified) {
      return res.json({
        error: "Please verify Your email first. Check Yopur inbox for 6 digit code",
      });
    }

    //to generate token
    const token = signToken(user._id.toString());
    res.json({ token, user: user.toClient() });
  } catch (error) {
    next(error);
  }
}

// to get logged in user profile
export async function me(req, res, next) {
  try {
    res.json({ user: req.user.toClient() });
  } catch (error) {
    next(error);
  }
}

// Supports contribution.
export async function contribution(req, res, next) {
  try {
    const oneYearAgo = new Date();
    oneYearAgo.setUTCHours(0, 0, 0, 0);
    oneYearAgo.setUTCDate(oneYearAgo.getUTCDate() - 364);

    const projects = await Project.find({
      user: req.user._id,
      "messages.createdAt": { $gte: oneYearAgo },
    }).select("messages");

    const counts = {};
    // Supports key.
    const key = (d) => new Date(d).toISOString().slice(0, 10);
    for (const p of projects) {
      for (const m of p.messages || []) {
        if (m.role === "user" && m.createdAt && m.createdAt >= oneYearAgo) {
          const k = key(m.createdAt);
          counts[k] = (counts[k] || 0) + 1;
        }
      }
    }

    const days = Object.entries(counts)
      .map(([date, count]) => ({ date, count }))
      .sort((a, b) => a.date.localeCompare(b.date));

    const total = days.reduce((s, d) => s + d.count, 0);
    res.json({ days, total, from: key(oneYearAgo), to: key(new Date()) });
  } catch (error) {
    next(error);
  }
}

// to update user profile
export async function updateProfile(req, res, next) {
  try {
    const name = req.body?.name !== undefined ? String(req.body.name).trim() : undefined;
    if (name === undefined) {
      return res.status(400).json({
        error: "Nothing to update",
      });
    }
    // if name has less then 2 characters 
    if (name.length < 2) {
      return res.json({
        error: "Name must be atleast of 2 characters",
      });
    }
    // to update the name 
    req.user.name = name;
    await req.user.save();
    res.json({ user: req.user.toClient() });
  } catch (error) {
    next(error);
  }
}

// to change user password 
export const changePassword = async (req, res, next) => {
  try {
    const { current, nextPw } = req.body;

    if (!current || !nextPw || nextPw.length < 6) {
      return res.json({
        error: "New Password must be atleast 6 Letters",
      });
    }
    const ok = await req.user.verifyPassword(current);
    if (!ok) {
      return res.status(400).json({
        error: "Current Password is incorrect",
      });
    }

    req.user.passwordHash = await User.hashPassword(nextPw);
    await req.user.save();
    res.json({
      ok: true,
    });
  } catch (error) {
    next(error);
  }
};

// to remove/delete account 
export async function deleteAccount(req, res, next) {
  try {
    await Project.deleteMany({
      user: req.user._id,
    });
    await User.deleteOne({
      _id: req.user._id,
    });
    res.json({ ok: true });
  } catch (error) {
    next(error);
  }
}
