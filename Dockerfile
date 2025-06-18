# Use Node.js as the base image
FROM node:18

# Install full LaTeX suite
RUN apt-get update && \
    apt-get install -y texlive-latex-base texlive-latex-recommended texlive-fonts-recommended \
    texlive-latex-extra && \
    apt-get clean && rm -rf /var/lib/apt/lists/*
# Set the working directory
WORKDIR /app

# Copy all files
COPY . .

# Install Node.js dependencies
RUN npm install

# Expose app port
EXPOSE 5000

# Start your Node app (index.js is your main file)
CMD ["node", "index.js"]
