FROM node:18-slim

# Install TeXLive and required tools
RUN apt-get update && \
    apt-get install -y texlive-latex-base texlive-latex-recommended texlive-fonts-recommended \
    texlive-latex-extra curl && \
    apt-get clean && rm -rf /var/lib/apt/lists/*

# Create app directory
WORKDIR /app

# Copy and install
COPY . .
RUN npm install

EXPOSE 5000
CMD ["node", "server.js"]
