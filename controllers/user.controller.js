// controllers/userController.js
import User from '../models/user.model.js';
import axios from 'axios';

// User Sign-Up Controller
export const signUp = async (req, res) => {
  const { email, classNumber } = req.body;

  try {
    // Check if the user already exists by email
    // const existingUser = await User.findOne({ email });
    // if (existingUser) {
    //   return res.status(400).json({ message: 'User already exists' });
    // }

    // Create a new user
    const newUser = new User({
      email,
      classNumber,
    });

    // Save the user to the database
    await newUser.save();

    checkSeatsAtIntervals(classNumber,email)

    // Respond with the new user (sexcluding any sensitive info)
    res.status(201).json({
      id: newUser._id,
      email: newUser.email,
      classNumber: newUser.classNumber,
      createdAt: newUser.createdAt, message : "User registered successfully!"
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};


// Function to check seats every minute for the user's class number
const checkSeatsAtIntervals = (classnumber, email) => {
    const requestUrl = `https://eadvs-cscc-catalog-api.apps.asu.edu/catalog-microservices/api/v1/search/classes?&refine=Y&campusOrOnlineSelection=A&honors=F&keywords=${classnumber}&promod=F&searchType=all&term=2247`;
  
    const checkClassSeats = async () => {
      try {
        // Perform the axios request to get class info
        const response = await axios.get(requestUrl, {
          headers: {
            "Authorization": "Bearer null"
          }
        });
  
        // Extract seat info from API response
        const classInfo = response.data.classes[0];
        const seatsInfo = classInfo.seatInfo;
  
        const totalSeats = parseInt(seatsInfo.ENRL_CAP); // Total seat capacity
        const enrolledSeats = parseInt(seatsInfo.ENRL_TOT); // Currently enrolled students
        const availableSeats = totalSeats - enrolledSeats; // Available seats
  
        // Check if seats are available
        if (availableSeats > 0) {
          console.log(`User ${email}: There are ${availableSeats} available seats for class number ${classnumber}.`);
          // Here is where you would trigger the notification logic, like sending an email
        } else {
          console.log(`User ${email}: No available seats for class number ${classnumber}.`);
        }
  
      } catch (error) {
        console.error("Err fetching class data:", error.message);
      }
    };
  
    // Call the function every 1 minute (60,000 milliseconds)
    setInterval(checkClassSeats, 60*1000); // Check seats every 1 minute
  };
