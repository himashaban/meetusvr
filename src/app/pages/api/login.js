'use client'
export default async function handler(req, res) {
  if (req.method === "POST") {
    const { email, password } = req.body;

    // Perform input validation
    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const response = await fetch(
      "https://api-yeshtery.dev.meetusvr.com/v1/yeshtery/token",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email,
          password,
          isEmployee: true,
        }),
      }
    );

    if (!response.ok) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    const data = await response.json();
    const token = data.token;

    // Store token as an HTTP-Only Cookie
    res.setHeader("Set-Cookie", `token=${token}; HttpOnly; Path=/;`);

    return res.status(200).json({ token });
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
