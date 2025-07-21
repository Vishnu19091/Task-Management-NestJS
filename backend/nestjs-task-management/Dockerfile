# ---------- STAGE 1: Builder ----------
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# ---------- STAGE 2: Production with Alpine ----------
FROM node:20-alpine AS production

WORKDIR /app

COPY package*.json ./

RUN npm ci --omit=dev && npm cache clean --force

COPY --from=builder /app/dist ./dist

# Optional: remove test/docs
RUN find node_modules -type d \( -name "test" -o -name "tests" -o -name "__tests__" -o -name "docs" \) -prune -exec rm -rf '{}' +

# ---------- STAGE 3: Distroless Final Image ----------
FROM gcr.io/distroless/nodejs20-debian12

WORKDIR /app

COPY --from=production /app/dist ./dist
COPY --from=production /app/node_modules ./node_modules
COPY --from=production /app/package.json ./

# No shell, no root, no bash, only node and app
CMD ["dist/main.js"]
