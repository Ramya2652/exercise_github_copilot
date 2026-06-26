"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Workout = exports.LeaderboardEntry = exports.Activity = exports.Team = exports.User = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const userSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true },
    role: { type: String, default: 'member' },
});
const teamSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    members: [{ type: String }],
    goal: { type: String, default: 'Stay active' },
});
const activitySchema = new mongoose_1.default.Schema({
    type: { type: String, required: true },
    duration: { type: Number, default: 30 },
    date: { type: String, default: new Date().toISOString() },
});
const leaderboardSchema = new mongoose_1.default.Schema({
    name: { type: String, required: true },
    points: { type: Number, default: 0 },
    streak: { type: Number, default: 0 },
});
const workoutSchema = new mongoose_1.default.Schema({
    title: { type: String, required: true },
    difficulty: { type: String, default: 'beginner' },
    duration: { type: Number, default: 20 },
});
exports.User = mongoose_1.default.model('User', userSchema);
exports.Team = mongoose_1.default.model('Team', teamSchema);
exports.Activity = mongoose_1.default.model('Activity', activitySchema);
exports.LeaderboardEntry = mongoose_1.default.model('LeaderboardEntry', leaderboardSchema);
exports.Workout = mongoose_1.default.model('Workout', workoutSchema);
