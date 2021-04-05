const db = require("../models");

module.exports = (app) => {
  // getLastWorkout
  app.get("/api/workouts", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
        },
      },
    ])
      .then((getWorkouts) => {
        res.json(getWorkouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // addExercise()
  app.put("/api/workouts/:id", (req, res) => {
    db.Workout.findOneAndUpdate(
      { _id: req.params.id },
      { $push: { exercises: req.body } },
      { new: true }
    )
      .then((updateWorkout) => {
        res.json(updateWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // createWorkout()
  app.post("/api/workouts", ({ body }, res) => {
    db.Workout.create(body)
      .then((createWorkout) => {
        res.json(createWorkout);
      })
      .catch((err) => {
        res.json(err);
      });
  });

  // getWorkoutsInRange()
  app.get("/api/workouts/range", (req, res) => {
    db.Workout.aggregate([
      {
        $addFields: {
          totalDuration: { $sum: "$exercises.duration" },
        },
      },
    ])
      .limit(7)
      .then((rangeWorkouts) => {
        console.log("Workout Range: ", rangeWorkouts);
        res.json(rangeWorkouts);
      })
      .catch((err) => {
        res.json(err);
      });
  });
};
