import { Request, Response } from "express";
import Thoughts from "../models/thoughtModel.js";
import User from "../models/userModels.js";

export const getThoughts = async (_req: Request, res: Response) => {
  try {
    const thoughts = await Thoughts.find({}).select("-__v");
    
    if(thoughts.length === 0){
      res.status(404).json({message:"No thoughts found !!"});
      return;
    }
    res.status(200).json(thoughts);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

export const getSingleThought = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thoughts.findById(req.params.thoughtId);

    if (!thoughts) {
      res.status(404).json({ message: "thought not found" });
      return;
    }
    res.status(200).json(thoughts);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

export const createThoughts = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thoughts.create(req.body);
    const user = await User.findByIdAndUpdate(
      req.body.userId,
      { $addToSet: { thoughts: thoughts._id } },
      { new: true }
    );

    if (!user) {
      res.status(404).json({ message: "Anonymous thought created, no user specified" });
      return;
    }

    res.status(200).json(thoughts);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

export const updateThought = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thoughts.findByIdAndUpdate(
      req.params.thoughtId,
      req.body,
      { new: true }
    );

    if(!thoughts){
      res.status(404).json({message:"No thoughts found"});
      return;
    }

    res.status(200).json(thoughts);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

export const deleteThought = async (req: Request, res: Response) => {
  try {
    const thoughts = await Thoughts.findById(req.params.thoughtId);
    if(!thoughts){
        res.status(404).json({message:"Thought not found"});
        return;
    }
    await User.findOneAndUpdate(
        { thoughts: req.params.thoughtId },
        { $pull: { thoughts: req.params.thoughtId } },
        { new:true }
    )
    await Thoughts.findByIdAndDelete( req.params.thoughtId )
    res.status(200).json({message:"Thought Deleted."});
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

export const createReaction = async (req: Request, res: Response) => {
  try {
    const reaction = await Thoughts.findByIdAndUpdate(req.params.thoughtId, {
      $addToSet: { reactions: req.body },
    },{new:true});
    if(!reaction){
      res.status(404).json({message:"No thought found to react to !!"});
      return;
    }
    res.status(200).json(reaction);
    return;
  } catch (err) {
    res.status(500).json(err);
    return;
  }
};

export const deleteReaction = async (req:Request, res:Response) => {
    try {
        const reaction = await Thoughts.findByIdAndUpdate(req.params.thoughtId,{$unset:{reactions:""}});
        if(!reaction){
          res.status(404).json({message:"No Reactions found"});
          return;
        }
        res.status(200).json({message:"Reaction Deleted"});
        return;
    } catch (err) {
        res.status(500).json(err);
        return;
    }
}
