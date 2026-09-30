FROM mcr.microsoft.com/playwright:v1.59.1-noble

WORKDIR /app


COPY package*.json ./

RUN npm ci

COPY . .

RUN mkdir -p reports test-results allure-results && chmod -R 777 reports test-results allure-results

CMD ["npm", "test"]