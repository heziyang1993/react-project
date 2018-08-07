#！/bin/bash
npm run build
read -n1 -p "按任意键开始部署到vmware..."
scp -r ./build/* root@192.168.216.128:/usr/local/nginx/html
