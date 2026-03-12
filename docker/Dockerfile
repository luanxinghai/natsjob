FROM alpine:3.23.3

RUN apk update \
    && apk add tzdata
#    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
#    && echo "Asia/Shanghai" > /etc/timezone

WORKDIR app
RUN true
COPY natsjob .
RUN true

CMD ["./natsjob"]

