import Item from "../models/Item.js";
import Review from "../models/Review.js";

export const createReview = async (req, res) => {
  try {
    const { itemId, rating, comment = "" } = req.body;

    if (!itemId || !rating) {
      return res
        .status(400)
        .json({ message: "itemId en rating zijn verplicht" });
    }

    const parsedRating = Number(rating);
    if (Number.isNaN(parsedRating) || parsedRating < 1 || parsedRating > 5) {
      return res.status(400).json({ message: "Rating moet tussen 1 en 5 zijn" });
    }

    const item = await Item.findById(itemId);
    if (!item) {
      return res.status(404).json({ message: "Item niet gevonden" });
    }

    if (item.status !== "verkocht") {
      return res
        .status(400)
        .json({ message: "Je kunt alleen een verkocht item reviewen" });
    }

    if (!item.buyer || item.buyer.toString() !== req.user.id) {
      return res.status(403).json({ message: "Alleen de koper kan reviewen" });
    }

    if (item.seller.toString() === req.user.id) {
      return res.status(400).json({ message: "Je kunt jezelf niet reviewen" });
    }

    const exists = await Review.findOne({ item: itemId, reviewer: req.user.id });
    if (exists) {
      return res
        .status(400)
        .json({ message: "Je hebt al een review geplaatst voor deze aankoop" });
    }

    const review = await Review.create({
      item: itemId,
      reviewer: req.user.id,
      reviewee: item.seller,
      rating: parsedRating,
      comment,
    });

    const populated = await review.populate([
      { path: "reviewer", select: "username" },
      { path: "item", select: "title" },
    ]);

    return res.status(201).json(populated);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getReviewsForUser = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewee: req.params.userId })
      .populate("reviewer", "username")
      .populate("item", "title")
      .sort({ createdAt: -1 });

    const averageRating =
      reviews.length > 0
        ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
        : 0;

    return res.json({
      averageRating: Number(averageRating.toFixed(1)),
      totalReviews: reviews.length,
      reviews,
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

export const getMyReviewItemIds = async (req, res) => {
  try {
    const reviews = await Review.find({ reviewer: req.user.id }).select("item");
    return res.json(reviews.map((review) => review.item));
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};