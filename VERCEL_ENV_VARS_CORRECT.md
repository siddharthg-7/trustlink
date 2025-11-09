# ✅ Correct Vercel Environment Variables

## How to Add Environment Variables in Vercel

When adding environment variables in Vercel, make sure:

1. **Variable Name** (left field):
   - Only letters, numbers, and underscores
   - Cannot start with a number
   - No spaces, hyphens, or special characters

2. **Variable Value** (right field):
   - Can contain any characters
   - No restrictions

## ✅ Correct Format

### Variable 1: DATABASE_URL

**Name field (exactly as shown):**
```
DATABASE_URL
```

**Value field:**
```
file:./dev.db
```

**Environments:** Select all three ☑ Production ☑ Preview ☑ Development

---

### Variable 2: JWT_SECRET

**Name field (exactly as shown):**
```
JWT_SECRET
```

**Value field:**
```
7abdc3c36e4af02a7e31caf26bafeac958f3cf40c0a55a241487bed1efcba880
```

**Environments:** Select all three ☑ Production ☑ Preview ☑ Development

---

### Variable 3: NEXTAUTH_SECRET

**Name field (exactly as shown):**
```
NEXTAUTH_SECRET
```

**Value field:**
```
8f08518cafdb53ed1670c38035b1d8a7808d9ddff618b60ae4ecc01c4d91180d
```

**Environments:** Select all three ☑ Production ☑ Preview ☑ Development

---

## ⚠️ Common Mistakes to Avoid

1. **Don't add spaces in the name:**
   ❌ `JWT SECRET` (wrong - has space)
   ✅ `JWT_SECRET` (correct)

2. **Don't add hyphens in the name:**
   ❌ `JWT-SECRET` (wrong - has hyphen)
   ✅ `JWT_SECRET` (correct)

3. **Don't start with a number:**
   ❌ `123_SECRET` (wrong - starts with number)
   ✅ `SECRET_123` (correct)

4. **Don't copy the "Name:" label:**
   ❌ `Name: JWT_SECRET` (wrong - includes "Name:")
   ✅ `JWT_SECRET` (correct - just the name)

5. **Make sure you're in the right field:**
   - **Name** = Left field (variable name)
   - **Value** = Right field (variable value)

## 📝 Step-by-Step in Vercel UI

1. Go to your project → **Settings** → **Environment Variables**
2. Click **"Add New"**
3. In the **"Name"** field (left), type exactly: `DATABASE_URL`
4. In the **"Value"** field (right), type: `file:./dev.db`
5. Select all environments: ☑ Production ☑ Preview ☑ Development
6. Click **"Save"**
7. Repeat for the other two variables

## ✅ Verification

After adding, you should see:
- `DATABASE_URL`
- `JWT_SECRET`
- `NEXTAUTH_SECRET`

All three should be listed in your environment variables.

---

**If you still get an error, make sure:**
- You're typing the name exactly as shown (no extra spaces)
- You're not copying from a formatted document that might have hidden characters
- You're using the "Name" field, not the "Value" field for the variable name

