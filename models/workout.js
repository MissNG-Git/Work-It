const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// const opts = { toJSON: { virtuals: true } };

const workoutSchema = new Schema(
  {
    day: {
      type: Date,
      default: Date.now
    },
    exercises: [
      {
        type: {
          type: String,
          trim: true,
          required: "Enter an exercise type"
        },
        name: {
          type: String,
          trim: true,
          required: "Enter an exercise name"
        },
        distance: {
          type: Number,
          default: 0
        },
        duration: {
          type: Number,
          default: 0,
          required: "Enter an exercise duration (in mins.)"
        },
        reps: {
          type: Number,
          default: 0
        },
        sets: {
          type: Number,
          default: 0
        },
        weight: {
          type: Number,
          default: 0
        }
      }
    ]
  },
  // // Include Mongoose virtuals 
  // opts
);

// // Create virtual property "totalDuration" from exercises
// workoutSchema.virtual("totalDuration").get(() => {
//     // "reduce" exercises array to sum of durations
//     return this.exercises.reduce((total, exercise) => {
//         return total + exercise.duration;
//     }, 0);
// });

const Workout = mongoose.model("Workout", workoutSchema);

module.exports = Workout;
