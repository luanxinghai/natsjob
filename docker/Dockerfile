FROM alpine:3.24.1

RUN apk update \
    && apk add tzdata
#    && cp /usr/share/zoneinfo/Asia/Shanghai /etc/localtime \
#    && echo "Asia/Shanghai" > /etc/timezone

WORKDIR app
RUN true
COPY natsjob .
RUN true

CMD ["./natsjob"]

