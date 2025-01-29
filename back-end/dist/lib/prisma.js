"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const client_1 = require("@prisma/client");
// Cria uma instância do Prisma Client
const prisma = new client_1.PrismaClient();
exports.prisma = prisma;
