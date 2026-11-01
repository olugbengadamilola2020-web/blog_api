const requiredEnvs = ['MONGODB_URI', 'PORT', 'JWT_SECRET'];
const validateEnv = () => {
    const missing = requiredEnvs.filter(key =>!process.env[key]);
    if (missing.length > 0) {
        throw new Error(`Missing required env: ${missing.join(', ')}`);
    }
};

module.exports = validateEnv;