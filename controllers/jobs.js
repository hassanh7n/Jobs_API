const Job = require('../models/Job');
const JobSchema = require('../models/Job');
const {StatusCodes} = require('http-status-codes')
const { BadRequestError, NotFoundError } = require('../errors');
const { findByIdAndRemove } = require('../models/Job');



// Get All Job
const GetAllJObs = async(req, res) => {
    const Jobs = await Job.find({createBy : req.user.userId}).sort("createdAt");

    res.status(200).json({
        success : true,
        data : Jobs,
        count : Jobs.length
    })
}

//Get Single Job
const GetSingleJob = async(req, res) => {
    const {
      user : {userId}, 
      params : {id:jobId}
    } = req;

    const job = await Job.find({
      _id:jobId,
      createBy : userId
    });
    
    if(!job){
      throw new NotFoundError("No job found with this id")
    }
    res.status(200).json({
        success : true,
        data : job
    })
}



// Create Job
// const CreateJob = async(req, res) => {
//     req.body.createdBy = req.user.userId
//     const job = await Job.create(req.body)
//     res.status(StatusCodes.CREATED).json({ job })
// }
const CreateJob = async (req, res) => {
    //createdBy: req.user.userId
    req.body.createBy = req.user.userId
    // console.log(req.user.user)
    const job = await Job.create(req.body)
    res.status(StatusCodes.CREATED).json({ job })
}
//Update Job
// const UpdateJob = async (req, res) => {
//     const {
//       body: { company, position },
//       user: { userId },
//       params: { id: jobId },
//     } = req
  
//     if (company === '' || position === '') {
//       throw new BadRequestError('Company or Position fields cannot be empty')
//     }
//     const job = await Job.findByIdAndUpdate(
//       { _id: jobId, createdBy: userId },
//       req.body,
//       { new: true, runValidators: true }
//     )
//     if (!job) {
//       throw new NotFoundError(`No job with id ${jobId}`)
//     }
//     res.status(StatusCodes.OK).json({ job })
//   }
const UpdateJob = async(req, res) => {
    const {
      body : {
        company, postion
      },
      user : {userId},
      params : {id : jobId}
    } = req

    if(company === "" || postion === ""){
      throw new BadRequestError("Company or Postion's fields cannot be empty")
    }

    const job = await Job.findByIdAndUpdate({
      _id:jobId,
      createBy : userId,
    },
    req.body,
    {
      new : true,
      runValidators : true
    }
    )
    if(!job){
      throw new NotFoundError("No job found with this id")
    }

    res.status(StatusCodes.CREATED).json({job})
}

// const deleteJob = async (req, res) => {
//     const {
//       user: { userId },
//       params: { id: jobId },
//     } = req
  
//     const job = await Job.findByIdAndRemove({
//       _id: jobId,
//       createdBy: userId,
//     })
//     if (!job) {
//       throw new NotFoundError(`No job with id ${jobId}`)
//     }
//     res.status(StatusCodes.OK).send('Job deleted successfuly')
//   }
const deleteJob = async(req, res) => {
  const {
    user : {userId},
    params : {id : jobId}
  } = req;

  const job = await Job.findByIdAndRemove({
    _id:jobId,
    createBy:userId
  })
  if(!job){
    throw new NotFoundError("No job found with this id")
  }

  res.status(StatusCodes.CREATED).json("Remove Job successfuly")
}


module.exports = {
    CreateJob,
    GetAllJObs,
    GetSingleJob,
    UpdateJob,
    deleteJob
}