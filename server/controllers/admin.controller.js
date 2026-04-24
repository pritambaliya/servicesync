import Provider from "../model/provider.model.js";

const getPendingProviders = async (req, res) => {
  try {
    const providers = await Provider.find({ status: "pending" });

    if (!providers.length) {
      req.flash("info", "No pending providers found");
      return res.json({
        message: req.flash("info")[0],
        data: []
      });
    }

    res.json({
      message: "Pending providers fetched",
      data: providers
    });

  } catch (err) {
    req.flash("error", "Error fetching providers");
    res.status(500).json({
      message: req.flash("error")[0]
    });
  }
};


const approveProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const provider = await Provider.findByIdAndUpdate(
      id,
      { status: "approved" },
      { new: true }
    );

    if (!provider) {
      req.flash("error", "Provider not found");
      return res.status(404).json({
        message: req.flash("error")[0]
      });
    }

    req.flash("success", "Provider approved successfully");

    res.json({
      message: req.flash("success")[0],
      data: provider
    });

  } catch (err) {
    req.flash("error", "Error approving provider");
    res.status(500).json({
      message: req.flash("error")[0]
    });
  }
};


const rejectProvider = async (req, res) => {
  try {
    const { id } = req.params;

    const provider = await Provider.findByIdAndUpdate(
      id,
      { status: "rejected" },
      { new: true }
    );

    if (!provider) {
      req.flash("error", "Provider not found");
      return res.status(404).json({
        message: req.flash("error")[0]
      });
    }

    req.flash("success", "Provider rejected successfully");

    res.json({
      message: req.flash("success")[0],
      data: provider
    });

  } catch (err) {
    req.flash("error", "Error rejecting provider");
    res.status(500).json({
      message: req.flash("error")[0]
    });
  }
};


export {getPendingProviders, approveProvider, rejectProvider};