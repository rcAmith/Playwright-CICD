FROM mcr.microsoft.com/playwright:v1.63.0-noble

WORKDIR /app

# 1. Install system dependencies (Java for Allure)
RUN apt-get update && apt-get install -y default-jre && rm -rf /var/lib/apt/lists/*

# 2. Copy package definitions and install Node dependencies
COPY package*.json ./
RUN npm ci

# 3. Copy the rest of the project source code
COPY . .

# 4. Ensure report directories exist with full read/write permissions for container execution
RUN mkdir -p reports/playwright-report reports/junit reports/allure-results reports/allure-report test-results \
    && chmod -R 777 reports test-results

CMD ["npm", "test"]