import Provider from "../model/provider.model.js";
import sendEmail from "../config/sendEmail.js";

const getPendingProviders = async (req, res) => {
  try {
    const providers = await Provider.find({ status: "pending" });

    res.json({
      success: true,
      message: providers.length
        ? "Pending providers fetched"
        : "No pending providers",
      data: providers
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      message: "Error fetching providers"
    });
  }
};

const approveProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      { status: "approved" },
      { returnDocument: "after" } 
    );

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found"
      });
    }

    if (provider.email) {
      await sendEmail(
        provider.email,
        "🎉 Your ServiceSync Account is Approved",
        `
        <div style="font-family: Arial; padding:20px;">
          <h2 style="color:#081c3a;">Welcome to ServiceSync 🚀</h2>
          <p>Hello <b>${provider.name}</b>,</p>
          <p>Your account has been <b style="color:green;">APPROVED</b>.</p>
          <a href="https://servicesync-enrn.onrender.com/login"
            style="padding:10px 15px;background:#081c3a;color:white;text-decoration:none;border-radius:5px;">
            Login Now
          </a>
        </div>
        `
      );
    }

    res.json({
      success: true,
      message: "Provider approved successfully",
      data: provider
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

const rejectProvider = async (req, res) => {
  try {
    const provider = await Provider.findByIdAndUpdate(
      req.params.id,
      { status: "rejected" },
      { returnDocument: "after" } 
    );

    if (!provider) {
      return res.status(404).json({
        success: false,
        message: "Provider not found"
      });
    }

    if (provider.email) {
      await sendEmail(
        provider.email,
        "ServiceSync Application Rejected ❌",
        `
        <div style="font-family: Arial; padding:20px;">
          <h2 style="color:#081c3a;">ServiceSync Update</h2>
          <p>Hello <b>${provider.name}</b>,</p>
          <p>Your application has been 
            <b style="color:red;">REJECTED</b>.
          </p>
        </div>
        `
      );
    }

    res.json({
      success: true,
      message: "Provider rejected successfully",
      data: provider
    });

  } catch (err) {
    console.log("ERROR:", err);
    res.status(500).json({
      success: false,
      message: err.message
    });
  }
};

export {
  getPendingProviders,
  approveProvider,
  rejectProvider
};
