import HealthRecord from "../models/HealthRecord.js";

export const getLeaderBoard = async (req, res) => {
  try {
    const leaderBoard = await HealthRecord.aggregate([
      // 1. Sum per user
      {
        $group: {
          _id: "$userId",
          totalSteps: { $sum: "$steps" },
          totalWater: { $sum: "$water" },
          totalCalories: { $sum: "$calories" }
        }
      },

      // 2. Calculate performance score
      {
        $addFields: {
          performance: {
            $add: [
              {
                $multiply: [
                  { $divide: ["$totalSteps", 10000] },
                  0.5
                ]
              },
              {
                $multiply: [
                  { $divide: ["$totalWater", 10] },
                  0.2
                ]
              },
              {
                $multiply: [
                  { $divide: ["$totalCalories", 2500] },
                  0.3
                ]
              }
            ]
          }
        }
      },

      // 3. Sort by performance
      {
        $sort: { performance: -1 }
      },

      // 4. Join user data
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "user"
        }
      },

      {
        $unwind: "$user"
      },

      // 5. Final shape
      {
        $project: {
          _id: 0,
          name: "$user.name",
          totalSteps: 1,
          totalWater: 1,
          totalCalories: 1,
          performance: { $round: ["$performance", 2] }
        }
      }
    ]);

    return res.status(200).json(leaderBoard);

  } catch (error) {
    return res.status(500).json({
      message: error.message
    });
  }
};