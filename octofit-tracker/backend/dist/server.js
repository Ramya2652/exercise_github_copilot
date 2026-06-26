"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const mongoose_1 = __importDefault(require("mongoose"));
const models_1 = require("./models");
const modelMap = {
    users: models_1.User,
    teams: models_1.Team,
    activities: models_1.Activity,
    leaderboard: models_1.LeaderboardEntry,
    workouts: models_1.Workout,
};
const app = (0, express_1.default)();
const port = process.env.PORT ? Number(process.env.PORT) : 8000;
const codespaceName = process.env.CODESPACE_NAME;
const baseUrl = codespaceName
    ? `https://${codespaceName}-8000.app.github.dev`
    : 'http://localhost:8000';
app.use(express_1.default.json());
app.get('/api/health', (_req, res) => {
    res.json({
        status: 'ok',
        message: 'OctoFit Tracker API is running',
        baseUrl,
    });
});
const createRouter = (resource) => {
    const router = express_1.default.Router();
    const Model = modelMap[resource];
    router.get('/', async (_req, res) => {
        try {
            const items = await Model.find({});
            res.json(items);
        }
        catch (error) {
            res.status(500).json({ error: 'Unable to fetch items' });
        }
    });
    router.post('/', async (req, res) => {
        try {
            const item = await Model.create(req.body);
            res.status(201).json(item);
        }
        catch (error) {
            res.status(400).json({ error: 'Unable to create item' });
        }
    });
    return router;
};
app.use('/api/users', createRouter('users'));
app.use('/api/teams', createRouter('teams'));
app.use('/api/activities', createRouter('activities'));
app.use('/api/leaderboard', createRouter('leaderboard'));
app.use('/api/workouts', createRouter('workouts'));
const startServer = async () => {
    try {
        await mongoose_1.default.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/octofit_db');
        console.log('Connected to MongoDB');
    }
    catch (error) {
        console.error('MongoDB connection failed:', error);
    }
    app.listen(port, () => {
        console.log(`Backend listening on port ${port}`);
        console.log(`API base URL: ${baseUrl}`);
    });
};
startServer();
