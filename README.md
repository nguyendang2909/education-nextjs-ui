<!-- Deploy in localhost -->
mkcert -install
mkcert localhost

Install pm2

pm2 start yarn --interpreter bash --name ui -- prod
