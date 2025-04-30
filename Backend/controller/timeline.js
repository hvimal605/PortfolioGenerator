const Portfolio = require("../models/Portfolio");
const Timeline = require("../models/timeline")


exports.createTimeline = async (req, res) => {
    try {
        const { title, description, from, to, portfolioId } = req.body;
    //  console.log("yha ky seen h ",title, description, from, to, portfolioId )

        if (!title || !description || !from || !to || !portfolioId) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details",
            });
        }

        const newTimeline = await Timeline.create({
            title,
            description,
            timeline: { from, to },
        });


        const portfolio = await Portfolio.findByIdAndUpdate(
            portfolioId,
            { $push: { timeline: newTimeline._id } },
            { new: true }
        );

        res.status(200).json({
            success: true,
            message: "Timeline Added!",
            newTimeline,
            portfolio,
        });
    } catch (error) {
        console.log(error);

        return res.status(500).json({
            success: false,
            message: "Something went wrong while adding the timeline",
        });
    }
};


exports.deleteTimeline = async (req, res) => {
    try {
        const { Timelineid, portfolioId } = req.body;

        if (!Timelineid || !portfolioId) {
            return res.status(400).json({
                success: false,
                message: "Timeline ID and Portfolio ID are required.",
            });
        }

        // Find and delete the timeline entry
        const timeline = await Timeline.findById(Timelineid);
        if (!timeline) {
            return res.status(404).json({
                success: false,
                message: "Timeline not found.",
            });
        }

        await timeline.deleteOne();

        const portfolio = await Portfolio.findByIdAndUpdate(
            portfolioId,
            { $pull: { timeline: Timelineid } },
            { new: true }
        );

        if (!portfolio) {
            return res.status(404).json({
                success: false,
                message: "Portfolio not found.",
            });
        }

        res.status(200).json({
            success: true,
            message: "Timeline deleted and removed from portfolio!",
            portfolio,
        });
    } catch (error) {
        console.error("Error deleting timeline:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the timeline.",
        });
    }
};


exports.getAllTimeline = async (req, res) => {
    try {
        const timelines = await Timeline.find();
        res.status(200).json({
            success: true,
            timelines,
        });

    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something Went wrong while getAll the timeline '
        })
    }
}

exports.updateTimeline = async (req, res) => {
    try {
      
      const { timelineId, title, description, from, to } = req.body;
  
      // Check for required fields
      if (!title || !description || !from || !to) {
        return res.status(400).json({
          success: false,
          message: "Please fill all the details",
        });
      }
  
      // Find and update the timeline
      const updatedTimeline = await Timeline.findByIdAndUpdate(
        timelineId,
        {
          title,
          description,
          timeline: { from, to },
        },
        { new: true } // Return updated document
      );
  
      // If timeline not found
      if (!updatedTimeline) {
        return res.status(404).json({
          success: false,
          message: "Timeline not found",
        });
      }
  
      res.status(200).json({
        success: true,
        message: "Timeline updated successfully",
        updatedTimeline,
      });
    } catch (error) {
      console.error("Error updating timeline:", error);
      return res.status(500).json({
        success: false,
        message: "Something went wrong while updating the timeline",
      });
    }
  };
  