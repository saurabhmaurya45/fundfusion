import { formatCampaignsData,formatStatistics } from "../../../utils";

export async function getProfileData(contract, address) {
    try {
        const profile = await contract?.call("getProfileByOwner", [address])
        return profile
    }
    catch (e) {
        return e;
    }
}
export async function fetchYourCampaigns(contract, address) {
    try {
        const campaingData = await contract?.call('getCampaignsByOwner', [address])
        const formatedData = formatCampaignsData(campaingData)
        return formatedData
    }
    catch (e) {
        return e
    }
}

export async function fetchYourStatistics(contract, address) {
    try {
        const statisticsData = await contract?.call('getStatisticsByOwner', [address])
        const formatedData = formatStatistics(statisticsData)
        return formatedData
    }
    catch (e) {
        return e
    }
}




