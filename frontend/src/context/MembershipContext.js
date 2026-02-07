import { createContext, useState, useCallback } from "react";
import config from '../config'

const MembershipContext = createContext()

const MembershipProvider = ({children})=>{
    const [isSubscribedMember, setIsSubscribedMember] = useState(false)
    const [membershipDetail, setMembershipDetail] = useState(null)
    const [availablePlans, setAvailablePlans] = useState([]);

    const checkMembershipStatus = useCallback(async (accessToken) => {
        try {
            const payload = {
                method: "GET",
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Token ${accessToken}`
                }
            };
            const response = await fetch(`${config.apiBaseUrl}/api/membership-status/`, payload);
            const data = await response.json();
            setMembershipDetail(data);
            setIsSubscribedMember(data.has_membership || false);
            console.log("Membership Status:", data);
        } catch (error) {
            console.error("Something went wrong", error);
        }
    }, []);

    const fetchAvailablePlans = useCallback(async () => {
        try {
            const response = await fetch(`${config.apiBaseUrl}/api/membership-plans/`, {
                method: "GET"
            });
            const data = await response.json();
            setAvailablePlans(data);
            console.log("Available Plans:", data);
        } catch (error) {
            console.error("Error fetching plans:", error);
        }
    }, []);

    return (
        <MembershipContext.Provider value={{
            isSubscribedMember,
            membershipDetail,
            availablePlans,
            checkMembershipStatus,
            fetchAvailablePlans
            }}>
            {children}
        </MembershipContext.Provider>
    )
}

export {MembershipProvider, MembershipContext}