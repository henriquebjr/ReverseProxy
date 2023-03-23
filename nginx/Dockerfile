FROM nginx:1.15.0-alpine

RUN rm /etc/nginx/conf.d/default.conf

COPY nginx.conf /etc/nginx/conf.d

RUN mkdir /var/www/public -p && touch /var/www/public/index.js

# ENTRYPOINT [ "/docker-entrypoint.sh" ]
# CMD ["nginx", "-g", "daemon off;"]