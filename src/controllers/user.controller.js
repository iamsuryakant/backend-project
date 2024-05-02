import { asyncHandler } from '../utils/asyncHandler.js';
import { ApiError } from '../utils/ApiError.js';
import { User } from '../models/user.models.js';
import { uploadOnCloudinary } from '../utils/cloudinary.js';
import { ApiResponse } from '../utils/ApiResponse.js';

const registerUser = asyncHandler(async (req, res) => {
    // Get user details
    // validations -- Not empty
    // check if user already exists: username, email
    // check of images, check for avatar
    // upload them to server (cloudinary)
    // create user object -- create entry in db
    // remove password and refresh token field from response
    // check for user creation
    // return response

    const { fullName, email, username, password } = req.body;

    if ([fullName, email, username, password].some((field) => field?.trim() == "")) {
        throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({
        $or: [{ username }, { email }]
    })

    if (existedUser) {
        throw new ApiError(409, "User already exists");
    }

    // console.log(req.files?.avatar[0]?.path);

    const avatarLocalPath = req.files?.avatar[0]?.path;
    const coverImageLocalPath = req.files?.coverImage[0]?.path;

    if (!avatarLocalPath) {
        throw new ApiError(400, "Avatar is required");
    }

    const avatar = await uploadOnCloudinary(avatarLocalPath);
    const coverImage = await uploadOnCloudinary(coverImageLocalPath);

    if (!avatar) {
        throw new ApiError(400, "Avatar upload failed");
    }


    const user  = await User.create({
        fullName,
        avatar: avatar.url,
        coverImage: coverImage?.url || "",
        email,
        username: username.toLowerCase(),
        password
    })

    const createdUser = await User.findById(user._id).select(
      "-password -refreshToken"
    );

    if (!createdUser) {
        throw new ApiError(500, "User creation failed");
    }

    return res.status(201).json(
        new ApiResponse(200, createdUser, "User created successfully")
    )
})


export { registerUser };