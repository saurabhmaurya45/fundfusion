import parse from 'html-react-parser';
import { ethers } from 'ethers';
import { toast, Bounce } from "react-toastify";


export const daysLeft = (deadline) => {
    const difference = new Date(deadline).getTime() - Date.now();
    const remainingDays = difference / (1000 * 3600 * 24);

    return remainingDays < 0 ? 0 : Math.ceil(remainingDays);
};

export const calculateBarPercentage = (goal, raisedAmount) => {
    const percentage = Math.round((raisedAmount * 100) / goal);

    return percentage;
};


export const checkIfImage = (url) => {
    return new Promise((resolve) => {
        const img = new Image();

        img.onload = () => {
            resolve(true);
        };

        img.onerror = () => {
            resolve(false);
        };

        img.src = url;

        // For cached images, if the browser has cached the image, it will call onload immediately
        if (img.complete) {
            resolve(true);
        }
    });
};

export const dateToTime = (dateString) => {
    const date = new Date(dateString);
    const timestampInSeconds = Math.floor(date.getTime() / 1000); // Convert milliseconds to seconds
    return timestampInSeconds;
}

export const formatToHtml = (description) => {
    const formattedDescription = description.replace(/(?:\r\n|\r|\n)/g, '<br/>');
    return parse(formattedDescription);
}

export const getDonations = async (pId, contract) => {
    const donations = await contract?.call('getDonators', [pId]);
    const numberOfDonations = donations[0].length;

    const parseDonations = [];

    for (let i = 0; i < numberOfDonations; i++) {
        parseDonations.push({
            donator: donations[0][i],
            donation: ethers.utils.formatEther(donations[1][i].toString())
        });
    }

    return parseDonations;
}

// const donate = async (pId, amount, contract) => {
//     const data = await contract?.call('donateToCampaign', [pId], {
//         value: ethers.utils.parseEther(amount)
//     });
//     return data;
// }


export function showError(message) {
    toast.error(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce
    })
}
export function showSuccess(message) {
    toast.success(message, {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        transition: Bounce
    })
}
export function isValidEmail(email) {
    // Improved regular expression for email validation
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(email);
}

export function isPasswordValid(password) {
    const minLength = 6;
    const maxLength = 16;
    const lengthCheck = password.length >= minLength && password.length <= maxLength;
    const upperCaseCheck = /[A-Z]/.test(password);
    const lowerCaseCheck = /[a-z]/.test(password);
    const numberCheck = /[0-9]/.test(password);

    if (!lengthCheck) {
        if (password.length < minLength) {
            return {
                status: false,
                message: "Password is too short. Minimum length is 8 characters."
            };
        }
        if (password.length > maxLength) {
            return {
                status: false,
                message: "Password is too long. Maximum length is 16 characters."
            };
        }
    }

    let missingCriteria = [];
    if (!upperCaseCheck) {
        missingCriteria.push("one uppercase letter");
    }
    if (!lowerCaseCheck) {
        missingCriteria.push("one lowercase letter");
    }
    if (!numberCheck) {
        missingCriteria.push("one number");
    }

    if (missingCriteria.length > 0) {
        return {
            status: false,
            message: `Password must contain at least ${missingCriteria.join(", ")}.`
        };
    }

    return {
        status: true,
        message: "Password is valid."
    };
}

export function formatProfileData(profile) {
    return {
        owner: profile.owner,
        profileType: profile.profileType,
        personalInfo: {
            name: profile.personalInfo.name,
            email: profile.personalInfo.email,
            contactNo: profile.personalInfo.contactNo,
            alternativeNumber: profile.personalInfo.alternativeNumber,
            profilePicture: profile.personalInfo.profilePicture,
            profileBanner: profile.personalInfo.profileBanner,
            city: profile.personalInfo.city,
            state: profile.personalInfo.state,
            country: profile.personalInfo.country,
            occupation: profile.personalInfo.occupation,
            aboutUs: profile.personalInfo.aboutUs,
        },
        companyInfo: {
            companyName: profile.companyInfo.companyName,
            industry: profile.companyInfo.industry,
            companySize: profile.companyInfo.companySize,
            companyWebsite: profile.companyInfo.companyWebsite,
            foundedDate: new Date(profile.companyInfo.foundedDate).toLocaleDateString(),
            gstNo: profile.companyInfo.gstNo,
            panNo: profile.companyInfo.panNo,
        },
        executiveTeam: profile.executiveTeam.map(executive => ({
            name: executive.name,
            designation: executive.designation,
            email: executive.email,
        })),
        uploadDocuments: profile.uploadDocuments.map(document => ({
            title: document.title,
            url: document.documentUrl,
        })),
        profileStatus: profile.profileStatus ? 'Active' : 'Inactive',
        profileCreationTime: new Date(profile.profileCreationTime * 1000).toLocaleString(),
    };
}

export function calculateDaysLeft(deadline) {
    const now = Date.now(); // Current timestamp in milliseconds
    const timeLeft = deadline - now; // Time left in milliseconds

    if (timeLeft <= 0) {
        return 0; // Deadline has passed or is now
    }

    const daysLeft = Math.ceil(timeLeft / (1000 * 60 * 60 * 24)); // Convert milliseconds to days
    return daysLeft;
}

export function formatCampaignData(data) {
    const campaign = typeof(data[0])==='string'?data:data[0]
    const donators  = campaign?.donators
    const donations = campaign?.donations

    return {
        owner: campaign?.owner,
        name: campaign?.name,
        title: campaign?.title,
        description: campaign?.description,
        target: ethers.utils.formatEther(campaign?.target?.toString() ?? 0),
        deadline: new Date(campaign?.deadline * 1000).toLocaleString(), // Convert to readable date format
        daysLeft: calculateDaysLeft(campaign?.deadline * 1000),
        amountCollected: ethers.utils.formatEther(campaign?.amountCollected?.toString()),
        image: campaign?.image,
        isActive: campaign?.isActive,
        category: { id: campaign?.category?.categoryId.toString(), name: campaign?.category?.name },
        typeOfContract: campaign?.typeOfContract,
        termsAndCondition: campaign?.termsAndCondition,
        timeOfCreation: new Date(campaign?.timeOfCreation * 1000).toLocaleString(),
        // donators: campaign.donators,
        // donations: campaign.donations.map(donation => donation.toString()), // Convert BigNumber to string
        donations: donators?.map((item, index) => ({ donator: item, amount: ethers.utils.formatEther(donations[index]?.toString()) }))
        
    };
}

export function formatCampaignsData(campaigns) {
    return campaigns?.map((campaign,index) => {
        return {...formatCampaignData(campaign),pId:index}
    });
}

export const formatStatistics = (statistics) => {
    const { totalCampaigns, onGoingCampaigns, completedCampaigns } = statistics;
    
    return {
        totalCampaigns: Number(totalCampaigns),
        onGoingCampaigns: Number(onGoingCampaigns),
        completedCampaigns: Number(completedCampaigns),
    };
};