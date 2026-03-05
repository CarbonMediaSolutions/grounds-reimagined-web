

## Create Admin User

### Steps

1. **Sign up the user** via the admin login page using email `info@grounds.co.za` and password `Admin123!`. Since there's no signup form, we need to temporarily add signup functionality or create the user programmatically.

2. **Approach**: Add a quick signup call in the AdminLogin page (temporary), or use the backend to create the user. The simplest approach:
   - Add a one-time signup flow to AdminLogin.tsx that creates the account
   - After signup, insert the admin role into `user_roles` using a database insert

3. **Database insert**: Once the user is created and we have their `user_id`, insert into `user_roles`:
   ```sql
   INSERT INTO user_roles (user_id, role) VALUES ('<user_id>', 'admin');
   ```

4. **Email confirmation**: Since auto-confirm may not be enabled, we should temporarily enable it for this signup, then disable it again. Alternatively, we can use the configure-auth tool.

### Implementation
- Temporarily enable auto-confirm for email signups
- Add a signup button/flow to AdminLogin.tsx to create the account
- After successful signup, use a backend function or direct insert to assign the admin role
- Since RLS on `user_roles` doesn't allow INSERT from client, we'll need to use a migration/insert tool with service role to add the admin role

### Simpler Alternative
- Use the Supabase auth API to sign up the user (via code change in AdminLogin)
- Use the database insert tool to add the admin role directly
- This avoids needing edge functions just for one-time admin setup

