# restaurant-square-website
Start the react app along with the electron in frontend folder:
```bash
npm run dev
``` 
Run the server, in backend folder
```bash
npm start
``` 
In order to make ImageMagick works, please install the ImageMagick from https://www.imagemagick.org/script/download.php
when you installed the ImageMagick, remember to check the "Install legacy utilities", then set the environment variable by adding the uri of ImageMagick : C:\Program Files\ImageMagick-7.0.7-Q16 to the path.

Redis cache clear instruction:
run terminal/command prompt, cd into your redis folder. e.g. C:\Program Files\Redis, run
```bash
redis-cli -h 127.0.0.1 -p 6379
flushall
```

To create a admin account:
```
cd backend\db
node dbInit.js
```
You are all set! Try to use the following info to login!
username: admin
password: admin123
