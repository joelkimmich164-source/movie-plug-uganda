# Movie Plug Uganda owner access

Deploy this server on an HTTPS host with secret environment variables. Set OWNER_EMAIL, a bcrypt OWNER_PASSWORD_HASH, and a long random JWT_SECRET in the host settings. Do not put real values in GitHub.

After deployment, connect the website to the HTTPS API for owner sign-in. Licensed videos must stay in private storage and be served only after server-side checks.
