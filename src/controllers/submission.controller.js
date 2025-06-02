export const getAllSubmission = async(req, res)=>{
    try {
        const userId = req.user.id;

        const submissions = await db.submission.findMany({
            where:{
                userId:userId
            }
        })

        res.status(200).json({
            success:true,
            message:"Submissions fetched successfully",
            submissions
        })
    } catch (error) {
        console.error("Fetch submissions error: ", error);
        res.status(500).json({
            success:false,
            error:"Failed to fetch submissions",
        })
    }
}

export const getSubmissionsForProblem = async(req, res)=>{

}

export const getAllTheSubmissionsForProblem = async(req, res)=>{

}