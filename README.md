## Deploying to GitHub Pages at garrettcoates.com

1. **Set up your custom domain in your repository:**
   - Go to your repo settings on GitHub.
   - Under "Pages", set the source to the `gh-pages` branch (or `/root` if using Actions).
   - Add `garrettcoates.com` as your custom domain.

2. **Add a CNAME file:**
   - Create a file named `CNAME` in the `public/` folder with this content:
     ```
     garrettcoates.com
     ```

3. **Build your site:**
   ```sh
   npm run build
   ```

4. **Deploy to GitHub Pages:**
   - Install the deploy tool:
     ```sh
     npm install --save-dev gh-pages
     ```
   - Add these scripts to your `package.json` (inside the top-level object):
     ```json
     {
       // ...existing package.json fields...
       "scripts": {
         "dev": "vite",
         "build": "vite build",
         "preview": "vite preview",
         "predeploy": "npm run build",
         "deploy": "gh-pages -d dist"
       }
       // ...other fields...
     }
     ```
   - Deploy:
     ```sh
     npm run deploy
     ```

5. **DNS:**
   - Make sure your domain's DNS points to GitHub Pages. (See GitHub Pages docs for A/ALIAS/CNAME records.)

After deployment, your site will be live at https://garrettcoates.com
