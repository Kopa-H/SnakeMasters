// userModel.mjs

import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  hashedPassword: String,
  refreshToken: String,

  // User Money:
  currentMoney: Number,

  // Max level that the user has reached:
  maxLevel: Number,

  // Total score of the user:
  totalScore: Number,

  // Records of the user in each level:
  records: {
    level_1: {
      maxScore: Number,
      achievementDate: String,
    },

    level_2: {
      maxScore: Number,
      achievementDate: String,
    },

    level_3: {
      maxScore: Number,
      achievementDate: String,
    },

    level_4: {
      maxScore: Number,
      achievementDate: String,
    },

    level_5: {
      maxScore: Number,
      achievementDate: String,
    },

    level_6: {
      maxScore: Number,
      achievementDate: String,
    },
  },

  // Active skin that the user is using:
  activeSkin: String,

  // Skins that the user has bought:
  boughtSkins: [String],
});

const User = mongoose.model('User', userSchema);

export default User;