FROM ubuntu:latest
RUN apt-get update && \
        DEBIAN_FRONTEND=noninteractive apt-get install --no-install-recommends -y python3.9 python3-pip python3.9-dev
ADD test.py /
CMD ["python3", "test.py"]
